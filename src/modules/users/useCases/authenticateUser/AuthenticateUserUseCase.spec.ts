import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Autenticar usuário com e-mail e senha', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository

    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUsersRepository)

    createUserUseCase = new CreateUserUseCase(
      inMemoryUsersRepository
    )
  })

  it('Deve ser capaz de fazer login com e-mail e senha', async () => {
    const user = {
      name: 'user test auth',
      email: 'test@example.com',
      password: 'password'
    }
    await createUserUseCase.execute(user)

    const authTest = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })
    expect(authTest).toHaveProperty('token')
  })

  it('Não deve ser capaz de fazer login com um usuário não existente', async () => {
    expect(async () => {
      const authTest = await authenticateUserUseCase.execute({
        email: 'nonexistent@example.com',
        password: 'password'
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Não deve ser capaz de fazer login com um e-mail incorreto', async () => {
    expect(async () => {
      const user = {
        name: 'user test auth',
        email: 'test@example.com',
        password: 'password'
      }
      await createUserUseCase.execute(user)

      const authTest = await authenticateUserUseCase.execute({
        email: 'incorrect@example.com',
        password: user.password
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Não deve ser capaz de fazer login com uma senha incorreta', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: 'user test auth',
        email: 'test@example.com',
        password: 'password'
      }

      await createUserUseCase.execute(user)

      const authTest = await authenticateUserUseCase.execute({
        email: user.email,
        password: 'wrong password'
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
