import 'reflect-metadata'
import { GetStatementOperationUseCase } from './GetStatementOperationUseCase';

import { IUsersRepository } from '../../../users/repositories/IUsersRepository';
import { IStatementsRepository } from '../../repositories/IStatementsRepository';
import { InMemoryUsersRepository } from '../../../users/repositories/in-memory/InMemoryUsersRepository';
import { InMemoryStatementsRepository } from '../../repositories/in-memory/InMemoryStatementsRepository';

import { User } from '../../../users/entities/User';
import { OperationType, Statement } from '../../entities/Statement';
import { GetStatementOperationError } from "./GetStatementOperationError";


let usersRepository: IUsersRepository;
let statementRepository: IStatementsRepository;

let getStatementOperationUseCase: GetStatementOperationUseCase;

describe('Obter extrato', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    statementRepository = new InMemoryStatementsRepository();

    getStatementOperationUseCase = new GetStatementOperationUseCase(
      usersRepository,
      statementRepository
    );
  });

  it('Deve ser capaz de obter extrato', async () => {
    const user: User = await usersRepository.create({
      name: 'user test',
      email: 'test@example.com',
      password: 'test'
    })

    const statement: Statement = await statementRepository.create({
      user_id: user.id as string,
      type: OperationType.DEPOSIT,
      amount: 1000,
      description: 'test'
    });

    const operationStatement = await getStatementOperationUseCase.execute({
      user_id: user.id as string,
      statement_id: statement.id as string,
    })

    expect(operationStatement).toBe(statement)
  })


  it('Não deve ser possível obter uma operação de instrução com extrato inexistente', async () => {
    const statement: Statement = await statementRepository.create({
      user_id: 'no user',
      type: OperationType.DEPOSIT,
      amount: 1,
      description: 'test operation statement'
    })

    await expect(getStatementOperationUseCase.execute({
      user_id: 'no-user',
      statement_id: statement.id as string
    })).rejects.toBeInstanceOf(GetStatementOperationError.UserNotFound)
  })


  it('não deve ser capaz de obter uma operação de instrução sem um id do extrato', async () => {
    const user: User = await usersRepository.create({
      name: 'user test',
      email: 'test@example.com',
      password: 'password'
    })

    expect(getStatementOperationUseCase.execute({
      user_id: user.id as string,
      statement_id: 'not valid'
    })).rejects.toBeInstanceOf(GetStatementOperationError.StatementNotFound)
  })
})
