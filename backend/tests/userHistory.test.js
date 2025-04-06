const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server-core");
const app = require("../server");
const Flight = require("../models/Flight");

let mongoServer;
let token;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  await request(app).post("/api/auth/register").send({
    username: "flightuser",
    email: "flight@example.com",
    password: "password123",
  });


  const res = await request(app).post("/api/auth/login").send({
    username: "flightuser",
    password: "password123",
  });

  token = res.body.token;

  await Flight.create({
    flightNumber: "RO123",
    origin: "Bucharest",
    destination: "Cluj",
    departureDate: new Date(Date.now() + 86400000), 
    arrivedDate: new Date(Date.now() + 90000000), 
    durationMinutes: 120,
    status: "on-time",
    totalSeats: 100,
    availableSeats: 100,
    price: 150,
  });

 
  await request(app)
    .post("/api/reservation")
    .set("Authorization", `Bearer ${token}`)
    .send({
      flightNumber: "RO123",
      seatsReserved: 2,
      totalPrice: 300,
    });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("User history", () => {
  it("should return the authenticated user's reservations", async () => {
    const res = await request(app)
      .get("/api/reservation/mine")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toHaveProperty("flightNumber", "RO123");
    expect(res.body[0]).toHaveProperty("seatsReserved", 2);
    expect(res.body[0]).toHaveProperty("totalPrice", 300);
  });

  it("should return 401 if no token is provided", async () => {
    const res = await request(app).get("/api/reservation/mine");

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("message", "No token provided");
  });
});
