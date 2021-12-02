const request = require("supertest");
const app = require('../app');

describe("testing-server-routes", () => {
  it("GET /summary - success", async () => {
    const req = await request(app).get("/summary");
    expect(req.status).toBe(200)
  }); 

  it("POST /create - success", async () => {
    const req = await request(app).post("/create").send({
      homeName: "Argentina",
      awayName: "Australia",
      homeScore: 3,
      awayScore: 1
    });
    expect(req.status).toBe(201)
  });

  it("POST /create - reject sending empty body, checking mongoose errors", async () => {
    const req = await request(app).post("/create").send({
      homeName: "",
      awayName: "",
      homeScore: "",
      awayScore: ""
    });
    expect(req.status).toBe(400)
    expect(Object.keys(req.body.errors).includes('homeName')).toBe(true)
    expect(Object.keys(req.body.errors).includes('awayName')).toBe(true)
    expect(Object.keys(req.body.errors).includes('homeScore')).toBe(true)
    expect(Object.keys(req.body.errors).includes('awayScore')).toBe(true)
  });
  
  it("POST /create - reject sending wrong type in homeScore, checking mongoose errors", async () => {
    const req = await request(app).post("/create").send({
      homeName: "Argentina",
      awayName: "Australia",
      homeScore: "Wrong type",
      awayScore: 1
    });
    expect(req.status).toBe(400)
    expect(Object.keys(req.body.errors).includes('homeScore')).toBe(true)
  });
});


