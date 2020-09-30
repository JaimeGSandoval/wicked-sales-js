require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {

  const sql = `
    select "productId",
           "name",
           "price",
           "image",
           "shortDescription"
      from "products"
  `;

  db.query(sql)
    .then(result => {
      const products = result.rows;
      res.json(products);
    })
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const productId = parseInt(req.params.productId, 10);

  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
      error: '"productId" must be a positive integer'
    });
  }

  const sql = 'SELECT * FROM "products" WHERE "productId" = $1';
  const params = [productId];

  db.query(sql, params)
    .then(result => {
      const product = result.rows[0];
      if (!product) {
        return next(new ClientError(`Cannot find product with id of ${productId}`, 404));
      } else {
        res.json(product);
      }
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {

  const sql = `
    select *
      from "carts"
  `;

  db.query(sql)
    .then(result => {
      const cart = result.rows;
      res.json(cart);
    })
    .catch(err => next(err));
});

app.post('/api/cart', (req, res, next) => {

  const productId = Number(req.body.productId);
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
      error: '"productId" must be a positive integer'
    });
  }

  const sql = 'SELECT "price" FROM "products" WHERE "productId" = $1';
  const params = [productId];

  db.query(sql, params)

    .then(priceResult => {
      if (priceResult.rows.length === 0) {
        throw new ClientError('There are no rows of recorded data yet', 400);
      }
      const insertCartSql = 'INSERT INTO "carts" ("cartId", "createdAt") VALUES (default, default) returning "cartId"';
      return db.query(insertCartSql)
        .then(cartResult => {
          const cartObj = {
            cartId: cartResult.rows[0].cartId,
            price: priceResult.rows[0].price
          };
          return cartObj;
        });
    })
    .then(data => {
      return data;
    })
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
