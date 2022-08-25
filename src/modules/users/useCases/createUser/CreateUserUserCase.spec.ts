import { CreateUserUseCase } from './CreateUserUseCase'
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository'
import { AppError } from '../../../../shared/errors/AppError';


let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Criar usuário", () => {


  beforeEach(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
  })

  it("Deve ser capaz de criar um novo usuário", async () => {
    let newUser = {
      name: 'test sample',
      email: 'test@example.com',
      password: 'test'
    }
    await createUserUseCase.execute({
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
    })

    const userCreated = await inMemoryUsersRepository.findByEmail(newUser.email)
    expect(userCreated).toHaveProperty('id');
  })

  it("Não deve ser possível criar um novo usuário com um e-mail existente", async () => {
    expect(async () => {
      let newUser = {
        name: 'test sample',
        email: 'test@example.com',
        password: 'test'
      }
      await createUserUseCase.execute({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
      })
      await createUserUseCase.execute({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
