const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const Flight = require("../models/Flight");

const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { dbName: "test" });
});
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop(); 
});

describe("Confirm reservation", () => {
    let reservationId;
  
    beforeAll(async () => {

      await request(app).post("/api/auth/register").send({
        username: "testconfirm",
        email: "testconfirm@example.com",
        password: "test123",
      });
  
      const loginRes = await request(app).post("/api/auth/login").send({
        username: "testconfirm",
        password: "test123",
      });
  
      token = loginRes.body.token;
  
      await Flight.create({
        flightNumber: "CONF123",
        origin: "Paris",
        destination: "Berlin",
        departureDate: new Date(Date.now() + 86400000),
        arrivedDate: new Date(Date.now() + 90000000),
        durationMinutes: 120,
        status: "on-time",
        totalSeats: 50,
        availableSeats: 50,
        price: 200,
      });
  
    
      const res = await request(app)
        .post("/api/reservation")
        .set("Authorization", `Bearer ${token}`)
        .send({
          flightNumber: "CONF123",
          seatsReserved: 1,
          totalPrice: 200,
        });
  
      reservationId = res.body._id;
    });
  
    it("should confirm a reservation and update its status", async () => {
      const res = await request(app)
        .patch(`/api/reservation/${reservationId}/confirm`)
        .send();
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status", "confirmed");
      expect(res.body._id).toBe(reservationId);
    });
  });
  