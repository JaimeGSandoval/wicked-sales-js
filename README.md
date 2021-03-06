# bonsai-depot
A full stack mobile responsive React.js and Node.js shopping cart application focused on bonsai trees and tools.

## Technologies Used
- React.js
- JavaScript ES6
- Node.js
- Express.js
- PostgreSQL
- SQL
- CSS3
- Bootstrap 4
- HTML5
- AWS EC2
- Webpack
- Babel
- npm

## Live Demo
Try the application live at https://bonsaidepot.jaimesandoval.net/

## Features
- User can view bonsai trees and tools for sale
- User can read details of each product
- User can add products to their cart
- User can view their cart summary
- User can fill out a form to purchase products
- User can navigate to product catalog from any page

## Strecth Features
- User can delete items from their cart
- User can delete all items from their cart at once

## Mobile Preview 
![wicked-sales-js](/server/public/images/bonsai-mobile.gif)

## Desktop Preview
![wicked-sales-js](/server/public/images/bonsai-desktop.gif)

## Getting Started

### System Requirements
- npm 6 or higher
- PostgreSQL 10 or higher

1. Clone the repository.
```shell
git clone https://github.com/JaimeGSandoval/wicked-sales-js
cd wicked-sales-js
```
2. Install all dependencies with npm.
```
npm install
```
3. Create Environment Variables
- Copy the ```.env.example``` file
- Name the copied file to `.env`
- Change the `.env` to your own credentials

4. While in the root directory, import the example database
```
npm run db:import
```
5. Start the Project. Once started you can view the application by opening http://localhost:3000 in your browser.
```
npm run dev
```

