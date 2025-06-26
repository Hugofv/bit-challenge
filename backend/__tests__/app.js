const express = require('express');
const path = require('path');
const morgan = require('morgan');
const itemsRouter = require('../src/routes/items');
const statsRouter = require('../src/routes/stats');
const cors = require('cors');
const { notFound } = require('../src/middleware/errorHandler');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/items', itemsRouter);
app.use('/api/stats', statsRouter);

app.use('*', notFound);

module.exports = app; 