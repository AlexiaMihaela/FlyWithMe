process.env.NODE_ENV = 'test'; // ✅ pentru ca serverul să nu se conecteze automat
jest.setTimeout(60000);

const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server-core');
const app = require('../server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri); 
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    await new Promise(resolve => setTimeout(resolve, 100));
  });

describe('Auth routes', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.username).toBe('testuser');
  });

  it('should log in the registered user', async () => {
    const res = await request(app).post('/api/auth/login').send({
      username: 'testuser',
      password: 'password123',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
