const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server-core");
const app = require("../server");
const Flight = require("../models/Flight");
const User = require("../models/User");
let mongoServer;
let adminToken;

const makeUserAdmin = async (username) => {
    await User.findOneAndUpdate(
      { username },
      { isAdmin: true }
    );
  };

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  await request(app).post("/api/auth/register").send({
    username: "adminuser",
    email: "admin@example.com",
    password: "password123",
  });
  await makeUserAdmin("adminuser");

  const res = await request(app).post("/api/auth/login").send({
    username: "adminuser",
    password: "password123",
  });

  adminToken = res.body.token;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Flight Creation", () => {
  const newFlight = {
    flightNumber: "TEST123",
    origin: "Paris",
    destination: "London",
    departureDate: new Date(Date.now() + 86400000), 
    arrivedDate: new Date(Date.now() + 90000000), 
    durationMinutes: 60,
    status: "on-time",
    totalSeats: 200,
    availableSeats: 200,
    price: 150,
  };

  it("should create a new flight successfully", async () => {
    const res = await request(app)
      .post("/api/admin/flights")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(newFlight);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("flightNumber", newFlight.flightNumber);
    expect(res.body).toHaveProperty("origin", newFlight.origin);
    expect(res.body).toHaveProperty("destination", newFlight.destination);
    expect(res.body).toHaveProperty("totalSeats", newFlight.totalSeats);
    expect(res.body).toHaveProperty("price", newFlight.price);
  });

  it("should not create a flight with duplicate flight number", async () => {
    const res = await request(app)
      .post("/api/admin/flights")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(newFlight);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "Flight with this number already exists");
  });

  it("should not create a flight without required fields", async () => {
    const incompleteFlight = {
      flightNumber: "TEST456",
      origin: "Berlin",
    };

    const res = await request(app)
      .post("/api/admin/flights")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(incompleteFlight);

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("message", "Error creating flight");
  });

  it("should not allow flight creation without admin token", async () => {
    const res = await request(app)
      .post("/api/admin/flights")
      .send(newFlight);

    expect(res.statusCode).toBe(401);
  });
}); 