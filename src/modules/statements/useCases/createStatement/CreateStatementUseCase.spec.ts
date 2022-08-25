import { CreateStatementUseCase } from './CreateStatementUseCase';

import { OperationType } from '../../entities/Statement';

import { User } from '../../../users/entities/User';
import { CreateStatementError } from './CreateStatementError';
import { InMemoryUsersRepository } from '../../../users/repositories/in-memory/InMemoryUsersRepository';
import { InMemoryStatementsRepository } from '../../repositories/in-memory/InMemoryStatementsRepository';

import UserNotFound = CreateStatementError.UserNotFound;
import InsufficientFunds = CreateStatementError.InsufficientFunds;

let createStatementUseCase: CreateStatementUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryStatementsRepository: InMemoryStatementsRepository

describe('Testes de depósito e saque', () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryStatementsRepository = new InMemoryStatementsRepository()
    createStatementUseCase = new CreateStatementUseCase(
      inMemoryUsersRepository,
      inMemoryStatementsRepository
    )
  })

  it('Deve ser capaz de criar uma nova declaração', async () => {
    const user: User = await inMemoryUsersRepository.create({
      name: 'user Test',
      email: 'test@example.com',
      password: 'password'
    })

    const statement = await createStatementUseCase.execute({
      user_id: user.id as string,
      type: OperationType.DEPOSIT,
      amount: 600,
      description: 'statement test'
    })
    expect(statement).toHaveProperty('id')
  })

  it('Não deve ser capaz de criar uma declaração com um usuário não existente', async () => {
    await expect(createStatementUseCase.execute({
      user_id: 'no-user',
      type: OperationType.DEPOSIT,
      amount: 1000,
      description: 'Salary'
    })).rejects.toBeInstanceOf(UserNotFound)
  })

  it('Não deve ser capaz de criar um novo extrato com fundos insuficientes', async () => {
    const user: User = await inMemoryUsersRepository.create({
      email: 'john@do.com',
      name: 'John do',
      password: '123123',
    });
    await expect(createStatementUseCase.execute({
      user_id: user.id as string,
      type: OperationType.WITHDRAW,
      amount: 1000,
      description: 'Code'
    })).rejects.toBeInstanceOf(InsufficientFunds)
  });
})
