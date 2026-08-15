const request = require("supertest");
const express = require("express");
const app = express();

const userRoutes = require("../routes/userRoutes");
const donorRoutes = require("../routes/donorRoutes");
const requestRoutes = require("../routes/requestRoutes");
const db = require("../config/database");

app.use(express.json());
app.use("/users", userRoutes);
app.use("/donors", donorRoutes);
app.use("/requests", requestRoutes);

afterAll((done) => {
    db.end(done);
});

describe("Blood Bank API", () => {
    let testUserId;
    let testDonorId;
    let testRequestId;

    describe("Users API", () => {
        it("should get all users", async () => {
            const res = await request(app).get("/users");
            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body)).toBeTruthy();
        });

        it("should create a new user", async () => {
            const res = await request(app).post("/users").send({
                name: "Test User",
                email: `test${Date.now()}@test.com`,
                password: "password123",
                phone: "1234567890",
                address: "Test Address",
                date_of_birth: "1990-01-01",
                is_interested: "true"
            });
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty("user_id");
            testUserId = res.body.user_id;
        });

        it("should get a user by id", async () => {
            const res = await request(app).get(`/users/${testUserId}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("name", "Test User");
        });
    });

    describe("Donors API", () => {
        it("should register a donor", async () => {
            const res = await request(app).post("/donors").send({
                user_id: testUserId,
                blood_group: "AB+",
                last_donation_date: "2023-01-01"
            });
            expect(res.statusCode).toEqual(201);
        });

        it("should get all donors", async () => {
            const res = await request(app).get("/donors");
            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body)).toBeTruthy();
            if(res.body.length > 0) {
                testDonorId = res.body[res.body.length - 1].donor_id;
            }
        });
    });

    describe("Requests API", () => {
        it("should create a request", async () => {
            const res = await request(app).post("/requests").send({
                requester_id: testUserId,
                donor_id: testDonorId || 1, // fallback to seed data
                blood_group: "AB+",
                hospital_name: "Test Hospital",
                hospital_address: "Test Address",
                required_date: "2023-12-01",
                units_required: 1,
                reason: "Test Reason"
            });
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty("request_id");
            testRequestId = res.body.request_id;
        });

        it("should update request status", async () => {
            const res = await request(app).patch(`/requests/${testRequestId}/status`).send({
                status: "Accepted"
            });
            expect(res.statusCode).toEqual(200);
        });
    });
});
