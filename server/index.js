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
  if (!req.session.cartId) {
    res.json([]);
    return;
  }

  const sql = `
            select "c"."cartItemId",
         "c"."price",
         "p"."productId",
         "p"."image",
         "p"."name",
         "p"."shortDescription"
    from "cartItems" as "c"
    join "products" as "p" using ("productId")
   where "c"."cartId" = $1
    `;

  const params = [req.session.cartId];
  db.query(sql, params)
    .then(result => {
      const cart = result.rows;
      res.json(cart);
    })
    .catch(err => next(err));
}
);

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
      if (req.session.cartId) {
        const cartIdAndPrice = {
          cartId: req.session.cartId,
          price: priceResult.rows[0].price
        };
        return cartIdAndPrice;
      }
      const insertCartSql = 'INSERT INTO "carts" ("cartId", "createdAt") VALUES (default, default) returning "cartId"';
      return db.query(insertCartSql)
        .then(cartResult => {
          const cartIdAndPrice = {
            cartId: cartResult.rows[0].cartId,
            price: priceResult.rows[0].price
          };
          return cartIdAndPrice;
        });
    })
    .then(data => {
      req.session.cartId = data.cartId;
      const insertRow = 'INSERT INTO "cartItems" ("cartId", "productId", "price") VALUES($1, $2, $3) RETURNING "cartItemId"';
      const params = [data.cartId, productId, data.price];
      return db.query(insertRow, params)
        .then(insertResult => {
          return insertResult.rows[0].cartItemId;
        });
    })
    .then(cartItemIdResult => {
      const cartItem =
        `select "c"."cartItemId",
      "c"."price",
      "p"."productId",
      "p"."image",
      "p"."name",
      "p"."shortDescription"
      from "cartItems" as "c"
      join "products" as "p" using("productId")
      where "c"."cartItemId" = $1`;
      const params = [cartItemIdResult];
      db.query(cartItem, params)
        .then(data => {
          res.status(201).json(data.rows[0]);
        });
    })
    .catch(err => next(err));
});

app.post('/api/orders', (req, res, next) => {
  if (!req.session.cartId) {
    throw (new ClientError('CartId is not valid', 400));
  }

  if (!req.body.name || !req.body.creditCard || !req.body.shippingAddress) {
    throw (new ClientError('Name, Credit Card and Shipping Address are required', 400));
  }

  const sql = `
               insert into "orders"("cartId", "name", "creditCard", "shippingAddress")
               values($1, $2, $3, $4)
               returning "orderId", "createdAt", "name", "creditCard", "shippingAddress";
               `;
  const params = [req.session.cartId, req.body.name, req.body.creditCard, req.body.shippingAddress];

  db.query(sql, params)
    .then(result => {
      if (result) {
        delete req.session.cartId;
      }
      return res.status(201).json(result.rows[0]);
    });
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    return res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => { });
