<br/>

# Cake API Documentation

| CRUD   | Response              | Explain                 | Method | Send in Body | URL                  | Query Params    |
|--------|-----------------------|------------------------|--------|--------------|----------------------|------------------|
| Create | New Cake object       | Add a new cake to the system | POST   | JSON Object (see below) | /api/cakes           | N/A              |
| Read   | List of Cakes         | Retrieve a list of all cakes | GET    | N/A          | /api/cakes           | Optional: `page`, `perPage`, `search` |
| Read   | Single Cake by ID     | Retrieve details of a specific cake | GET    | N/A          | /api/cakes/:id       | N/A              |
| Update | Updated Cake object   | Update an existing cake | PUT    | JSON Object (see below) | /api/cakes/:id       | N/A              |
| Delete | Deleted Cake object   | Delete a cake from the system | DELETE | N/A          | /api/cakes/:id       | N/A              |
<br/>

## Functions

### 1. `getAllCakes`
Retrieve a list of cakes.

### 2. `getCakeById`
Retrieve details of a specific cake by ID.

### 3. `addCakes`
Add a new cake to the system.

### 4. `updateCake`
Update an existing cake.

### 5. `deleteCakeById`
Delete a cake from the system.
<br/>

## Request and Response Examples

### Create (POST /api/cakes)
```json
{
  "cakeName": "Chocolate Cake",
  "allergens": "Milk, Eggs, Nuts",
  "price": 45,
  "imgUrl": "https://example.com/chocolate-cake.jpg",
  "description": "Delicious chocolate cake",
  "heatOrCoolInstructions": "Store in a cool place",
  "madeInDate": "2023-02-04"
}
```
### Update Cake (PUT /api/cakes/:id)

```json
{
  "allergens": "Milk, Eggs, Nuts",
  "price": 50
}
```
<br/>

# User API Documentation

| CRUD   | Response                          | Explain                                     | Method | Send in Body                          | URL              | Query Params    |
|--------|-----------------------------------|---------------------------------------------|--------|----------------------------------------|------------------|------------------|
| Create | Token and User Info               | Add a new user to the system                | POST   | JSON Object (see below)                | /api/users       | N/A              |
| Login  | Token and User Info               | Authenticate and get a token for the user  | POST   | JSON Object (see below)                | /api/users/login | N/A              |
| Read   | List of Users (Excluding Password)| Retrieve a list of all users                | GET    | N/A                                    | /api/users       | N/A              |

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
  "userName": "JohnDoe",
  "password": "Abcd1234",
  "email": "john@example.com",
  "role": "user"
}
```

### Login (POST /api/users/login)
```json
{
  "userName": "JohnDoe",
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
| Read   | List of All Orders        | Retrieve a list of all orders                 | GET    | N/A                                    | /api/orders               | N/A              |
| Read   | Orders by User            | Retrieve orders for a specific user            | GET    | N/A                                    | /api/orders/byUser        | N/A              |
| Create | New Order                 | Add a new order to the system                  | POST   | JSON Object (see below)                | /api/orders               | N/A              |
| Update | Update Order Status       | Update the status of an existing order         | PUT    | N/A                                    | /api/orders/:id           | N/A              |
| Delete | Deleted Order              | Delete an order from the system                | DELETE | N/A                                    | /api/orders/:id           | N/A              |
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
