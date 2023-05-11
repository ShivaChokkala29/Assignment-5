const express = require('express');
const data = require('./customers.json');

const app = express();
 
const port = 8080;

// Add middleware to include the Access-Control-Allow-Origin header in all responses
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Add your routes here
app.get('/', function(req, res) {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


// Route to display collection of customers
app.get('/customers', (req, res) => {
  res.send(data.customers);
});

// Route to display single customer record
app.get('/customers/:id', (req, res) => {
  const customerId = parseInt(req.params.id);
  const customer = data.customers.find(c => c.id === customerId);

  if (!customer) {
    res.status(404).send('Customer not found');
  } else {
    res.send(customer);
  }
});

// Route to display collection of orders for a customer
app.get('/customers/:id/orders', (req, res) => {
  const customerId = parseInt(req.params.id);
  const customer = data.customers.find(c => c.id === customerId);

  if (!customer) {
    res.status(404).send('Customer not found');
  } else {
    res.send(customer.orders);
  }
});

// Route to display single order record for a customer
app.get('/customers/:id/orders/:orderId', (req, res) => {
  const customerId = parseInt(req.params.id);
  const customer = data.customers.find(c => c.id === customerId);

  if (!customer) {
    res.status(404).send('Customer not found');
  } else {
    const orderId = parseInt(req.params.orderId);
    const order = customer.orders.find(o => o.id === orderId);

    if (!order) {
      res.status(404).send('Order not found');
    } else {
      res.send(order);
    }
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
