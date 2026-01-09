jest.mock("cloudinary");

import request from "supertest";
import app from "../src/app";

describe("App test", () => {
  it("should return 404 for unknown route", async () => {
    const res = await request(app).get("/unknown");
    expect(res.status).toBe(404);
  });
});
