# Test App for an OData Service

First, clone the demo app:

```bash
git clone https://github.com/ridon-IT-GmbH/demo-odata-nodejs
```

Then, you can start it:

```bash
docker-composer up -d 
```

You can now access the service at http://localhost:3000/products and see sample products that were added when the application started.

- GET /products - Lists all products.
- POST /products - Adds a new product.
- GET /products/{id} - Retrieves a product by ID.
- PUT /products/{id} - Updates a product.
- DELETE /products/{id} - Deletes a product.

## Examples

### GET request

```bash
curl -X GET http://localhost:3000/products
```

### POST request

```bash
curl -X POST http://localhost:3000/products -H "Content-Type: application/json" -d '{"name":"Product 4", "price":40.0}'
```
