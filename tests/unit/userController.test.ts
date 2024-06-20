import request from 'supertest';
import app from '../../src/app';
import db from '../../src/database';

describe('UserController', () => {
  beforeAll(async () => {
    await db.migrate.latest();
  });

  afterAll(async () => {
    await db.migrate.rollback();
    await db.destroy();
  });

  it('should create a user', async () => {
    const response = await request(app).post('/api/users').send({
      name: 'Babalola Mustapha',
      email: '0zspgifzbo.ga',
      password: 'password123',
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('userId');
  });

  it('should fund a user account', async () => {
    const response = await request(app).post('/api/users/fund').send({
      userId: 1,
      amount: 100,
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('balance', 100);
  });

  it('should transfer funds between users', async () => {
    const response = await request(app).post('/api/users/transfer').send({
      userId: 4,
      recipientId: 2,
      amount: 50,
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('amount', 50);
  });

  it('should withdraw funds from a user account', async () => {
    const response = await request(app).post('/api/users/withdraw').send({
      userId: 4,
      amount: 25,
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('amount', 25);
  });
});
