import { OperationType } from '../../entities/Statement';

import { User } from '../../../users/entities/User';
import { GetBalanceError } from "./GetBalanceError";
import { GetBalanceUseCase } from './GetBalanceUseCase';
import { InMemoryUsersRepository } from '../../../users/repositories/in-memory/InMemoryUsersRepository';
import { InMemoryStatementsRepository } from '../../repositories/in-memory/InMemoryStatementsRepository';

let getBalanceUseCase: GetBalanceUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;

describe('Obter saldo', () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryStatementsRepository = new InMemoryStatementsRepository();

    getBalanceUseCase = new GetBalanceUseCase(
      inMemoryStatementsRepository,
      inMemoryUsersRepository
    );
  });

  it('Deve ser capaz de mostrar o saldo dos usuários', async () => {
    const user: User = await inMemoryUsersRepository.create({
      name: 'balance test',
      email: 'test@example.com',
      password: 'test'
    });

    const statement = await inMemoryStatementsRepository.create({
      user_id: user.id as string,
      type: OperationType.DEPOSIT,
      amount: 1000,
      description: 'statement n 1'
    });

    const statement2 = await inMemoryStatementsRepository.create({
      user_id: user.id as string,
      type: OperationType.DEPOSIT,
      amount: 1000,
      description: 'statement n 2'
    });

    const statement3 = await inMemoryStatementsRepository.create({
      user_id: user.id as string,
      type: OperationType.WITHDRAW,
      amount: 500,
      description: 'statement n 3'
    });

    const userBalance = await getBalanceUseCase.execute({ user_id: user.id as string })
    expect(userBalance).toStrictEqual({
      statement: expect.arrayContaining([statement, statement2, statement3]),
      balance: 1500
    })
  })

  it('Não deve ser capaz de listar um saldo com um usuário não existente', async () => {
    await expect(getBalanceUseCase.execute({
      user_id: 'non existent user',
    })).rejects.toBeInstanceOf(GetBalanceError)
  })
});
