const request = require("supertest");
const app = require("./app");

describe("Node.js Demo App", () => {

    test("GET / should return the welcome message", async () => {
        const response = await request(app).get("/");

        expect(response.statusCode).toBe(200);
        expect(response.text).toBe(
            "Hello from Node.js CI/CD Demo App!"
        );
    });

    test("GET /health should return OK status", async () => {
        const response = await request(app).get("/health");

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            status: "OK"
        });
    });

});