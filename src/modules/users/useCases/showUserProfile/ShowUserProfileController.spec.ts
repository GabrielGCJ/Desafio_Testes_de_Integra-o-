import { Connection, createConnection, Repository } from "typeorm"
import request from 'supertest';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../../../../config/auth';

import { app } from "../../../../app";
import { User } from "../../entities/User";

let connection: Connection;
let usersRepository: Repository<User>;
let user: User;
let token: string;

describe('Mostrar perfil do usuário (Controller)', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    usersRepository = connection.getRepository<User>(User);

    user = usersRepository.create({
      name: 'Name sample',
      email: 'namesample@email.com',
      password: await hash('123', 8)
    });

    user = await usersRepository.save(user);

    const { secret, expiresIn } = authConfig.jwt;

    token = sign({ user }, secret, {
      subject: user.id,
      expiresIn: expiresIn,
    });
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  })

  it('Deve ser capaz de mostrar o perfil de usuário autenticado', async () => {

    const response = await request(app)
    
      .get('/api/v1/profile')
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toEqual(user.email);
  });

  it('Não deve ser capaz de mostrar o perfil de um não usuário', async () => {

    const { secret, expiresIn } = authConfig.jwt;

    token = sign({ name: 'not-valid-user' }, secret, {
      subject: 'not-valid-id',
      expiresIn: expiresIn,
    });

    const response = await request(app)
      .get('/api/v1/profile')
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(500);
  });
})
