<br/>

# Product API Documentation

| CRUD   | Response              | Explain                 | Method | Send in Body | URL                  | Query Params    |
|--------|-----------------------|------------------------|--------|--------------|----------------------|------------------|
| Create | New Product object       | Add a new product to the system | POST   | JSON Object (see below) | /api/products           | -----             |
| Read   | List of Products         | Retrieve a list of all products | GET    | -----         | /api/products           | Optional: `page`, `perPage`, `search` |
| Read   | Single Product by ID     | Retrieve details of a specific product | GET    | -----         | /api/products/:id       | -----             |
| Update | Updated Product object   | Update an existing product | PUT    | JSON Object (see below) | /api/products/:id       | -----             |
| Delete | Deleted Product object   | Delete a product from the system | DELETE | -----         | /api/products/:id       | -----             |
| Read  | Number of Products       | Retrieve the number of products in the system | GET  | -----         | /api/products/countProduct | -----             |

<br/>

## Functions

### 1. `getAllProducts`
Retrieve a list of products.

### 2. `getProductById`
Retrieve details of a specific product by ID.

### 3. `addProducts`
Add a new product to the system.

### 4. `updateProduct`
Update an existing product.

### 5. `deleteProductById`
Delete a product from the system.

### 6. `checkNumOfProduct`
Retrieve the number of products in the system.

<br/>

## Request and Response Examples

### Create (POST /api/products)
```json
{
  "productName": "Chocolate cake",
  "allergens": "Milk, Eggs, Nuts",
  "price": 45,
  "imgUrl": "https://example.com/chocolate-cake.jpg",
  "description": "Delicious chocolate cake",
  "heatOrCoolInstructions": "Store in a cool place",
  "madeInDate": "2023-02-04",
  "category":"cakes"
}
```
### Update Product (PUT /api/products/:id)

```json
{
  "allergens": "Milk, Eggs, Nuts",
  "price": 50
}
```
<br/>

## Additional Notes
In order to define a category for the product, choose one of the following options:
<br/>
cakes, desserts or sweets
<br/>
<br/>


# User API Documentation

| CRUD   | Response                          | Explain                                     | Method | Send in Body                          | URL              | Query Params    |
|--------|-----------------------------------|---------------------------------------------|--------|----------------------------------------|------------------|------------------|
| Create | Token and User Info               | Add a new user to the system                | POST   | JSON Object (see below)                | /api/users       | -----             |
| Create  | Token and User Info               | Authenticate and get a token for the user  | POST   | JSON Object (see below)                | /api/users/login | -----             |
| Read   | List of Users (Excluding Password)| Retrieve a list of all users                | GET    | -----                                   | /api/users       | -----             |

<br/>

## Functions

### 1. `addUser`
Add a new user to the system.

### 2. `login`
Authenticate and get a token for the user.

### 3. `getAllUsers`
Retrieve a list of all users.
<br/>

## Request and Response Examples

### Create User (POST /api/users)
```json
{
  "userName": "sara",
  "password": "Abcd1234",
  "email": "sara@example.com"
}
```

### Login (POST /api/users/login)
```json
{
  "userName": "sara",
  "password": "Abcd1234"
}

```
<br/>

## Additional Notes
For user-related operations, ensure you have the authentication token included in the request headers for protected routes.
Passwords should follow a pattern of at least 8 characters, including at least one uppercase letter, one lowercase letter, and one digit.
<br/>

# Order API Documentation

| CRUD   | Response                  | Explain                                       | Method | Send in Body                          | URL                       | Query Params    |
|--------|---------------------------|-----------------------------------------------|--------|----------------------------------------|---------------------------|------------------|
| Read   | List of All Orders        | Retrieve a list of all orders                 | GET    | -----                                   | /api/orders               | -----             |
| Read   | Orders by User            | Retrieve orders for a specific user            | GET    | -----                                   | /api/orders/byUser        | -----             |
| Create | New Order                 | Add a new order to the system                  | POST   | JSON Object (see below)                | /api/orders               | -----             |
| Update | Update Order Status       | Update the status of an existing order         | PUT    | -----                                   | /api/orders/:id           | -----             |
| Delete | Deleted Order              | Delete an order from the system                | DELETE | -----                                   | /api/orders/:id           | -----             |
<br/>

## Functions

### 1. `getAllOrders`
Retrieve a list of all orders.

### 2. `getAllOrdersOfUser`
Retrieve orders for a specific user.

### 3. `addOrder`
Add a new order to the system.

### 4. `updateOrderStatus`
Update the status of an existing order.

### 5. `deleteOrder`
Delete an order from the system.
<br/>

## Request and Response Examples

### Create Order (POST /api/orders)
```json
{
  "deliveryDate": "2023-02-10",
  "address": {
    "city": "Jerusalem",
    "street": "Main Street",
    "streetNum": 123,
    "zip": 12345,
    "apartmentNum": 4,
    "floorNum": 2
  },
  "products": [
    {
      "productId": "65b7d51bf8c152df112d360c",
      "amount": 2
    },
    {
      "productId": "65b8b12ae121812d221bfd7a",
      "amount": 1
    }
  ]
}
```
### Update Order Status (PUT /api/orders/:id)
```json
{
  "isInWay": true
}
```


## Usage

1. Install dependencies:
   ```bash
    npm install 
    ```

2. Run the server:
   ```bash
    npm start
