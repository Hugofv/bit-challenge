const request = require('supertest');
const path = require('path');
const fs = require('fs');
const app = require('../app'); // Adjust the path to your app

const DATA_PATH = path.join(__dirname, '../../../data/items.json');

describe('Items API', () => {
  let originalData;

  beforeAll(() => {
    // Backup the original data
    originalData = fs.readFileSync(DATA_PATH, 'utf-8');
  });

  afterAll(() => {
    // Restore the original data
    fs.writeFileSync(DATA_PATH, originalData);
  });

  describe('GET /api/items', () => {
    it('should return all items with meta', async () => {
      const res = await request(app).get('/api/items');
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body.meta).toHaveProperty('total');
    });

    it('should support pagination', async () => {
      const res = await request(app).get('/api/items?limit=5&skip=2');
      expect(res.statusCode).toBe(200);
      expect(res.body.data.length).toBe(5);
      expect(res.body.meta.skip).toBe(2);
      expect(res.body.meta.limit).toBe(5);
    });

    it('should support search by name', async () => {
      const res = await request(app).get('/api/items?q=desk');
      expect(res.statusCode).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.body.data.some(item => item.name.toLowerCase().includes('desk'))).toBe(true);
    });
  });

  describe('GET /api/items/:id', () => {
    it('should return a single item by id', async () => {
      const res = await request(app).get('/api/items/1');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', 1);
    });

    it('should return 404 for non-existent item', async () => {
      const res = await request(app).get('/api/items/99999');
      expect(res.status).toBe(404);
    });
  });
});
