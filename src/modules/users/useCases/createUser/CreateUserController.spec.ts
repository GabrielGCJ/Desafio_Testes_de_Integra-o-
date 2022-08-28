import  request from "supertest";
import { Connection, createConnection } from "typeorm";
import { app } from "../../../../app";
import { AppError } from "../../../../shared/errors/AppError";

let connection:Connection


describe("Criar usuário (Controller)", () => {


    beforeAll(async() => {
       connection = await createConnection()
      await connection.runMigrations()
    })

    afterAll(async() => {
        await connection.dropDatabase()
        await connection.close()
    })

    it("Deve ser capaz de criar um novo usuário", async() => {


        const response = await request(app).post("/api/v1/users").send({
            name: "teste",
            email: "teste@teste.com",
            password: "1234"
        })

        expect(response.status).toBe(201)
    }),

    it("não deve ser capaz de criar um novo usuário com email já existente", async() => {

        await request(app).post("/api/v1/users").send({
            name: "teste",
            email: "teste@teste.com",
            password: "1234"
        })

        const response = await request(app).post("/api/v1/users").send({
            name: "teste",
            email: "teste@teste.com",
            password: "1234"
        })

        expect(response.status).toBe(400)

    })
})
