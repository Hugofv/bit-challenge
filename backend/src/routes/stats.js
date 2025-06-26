const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();
const DATA_PATH = path.join(__dirname, '../../../data/items.json');

async function readData() {
  try {
    const raw = await fs.readFile(DATA_PATH);
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading data:', err);
    throw err; // Re-throw to be handled by the error handler
  }
}

let cachedResults = null;

/* * This function initializes the cache with statistics from the data file.
 * It calculates the total number of items and the average price.
 */
async function makeCache() {
  try {
    const data = await readData();
    cachedResults = {
      total: data.length,
      averagePrice: data.reduce((acc, cur) => acc + cur.price, 0) / data.length,
    };
  } catch (err) {
    console.error('Error creating cache:', err);
    cachedResults = null; // Reset cache on error
  }
}

// Watch for changes in the data file and update the cache
fs.watch(DATA_PATH, async () => {
  console.log('Data file changed, updating cache...');
  await makeCache();
});

// Initialize cache on startup
(async () => {
  await makeCache();
})();

// GET /api/stats
router.get('/', (req, res, next) => {
  if (!cachedResults) {
    const err = new Error('Cache not available');
    err.status = 503; // Service Unavailable
    return next(err);
  }
  res.json(cachedResults);
});

module.exports = router;
