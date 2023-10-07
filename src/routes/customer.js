'use strict';

const express = require('express');
const { customerCollection } = require('../models');

const router = express.Router();

// Route to retrieve all customers
router.get('/customers', async (req, res, next) => {
    const customers = await customerCollection.read();
    res.status(200).send(customers);
});

// Route to retrieve a specific customer by ID
router.get('/customers/:id', async (req, res, next) => {
    const singleCustomerItem = await customerCollection.read(req.params.id);
    res.status(200).send(singleCustomerItem);
});

// Route to create a new customer
router.post('/customers', async (req, res, next) => {
    try {
        console.log('this is the body', req.body);
        const newCustomer = await customerCollection.create(req.body);
        res.status(200).send(newCustomer);
    } catch (e) {
        next(e);
    }
});

// Route to update details of an existing customer by ID
router.put('/customers/:id', async (req, res, next) => {
    try {
        const updatedCustomer = await customerCollection.update(req.params.id, req.body);
        if (updatedCustomer) {
            res.status(200).send(updatedCustomer);
        } else {
            res.status(404).send({ message: "Customer not found" });
        }
    } catch (e) {
        next(e);
    }
});

// Route to delete a specific customer by ID
router.delete('/customers/:id', async (req, res, next) => {
    try {
        const result = await customerCollection.delete(req.params.id);
        if (result.message === 'Record deleted successfully') {
            res.status(200).send(result);
        } else {
            res.status(404).send({ message: "Customer not found or not deleted" });
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;
