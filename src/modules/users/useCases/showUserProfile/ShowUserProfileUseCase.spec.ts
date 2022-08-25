import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";
import { User } from "../../entities/User";
import { ShowUserProfileError } from "./ShowUserProfileError";

let showUserProfileUseCase: ShowUserProfileUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe('Mostrar perfil de usuário', () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUsersRepository);
  });

  it('Deve ser capaz de mostrar o perfil do usuário', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'John do',
      email: 'john@do.com',
      password: '123123'
    });

    const userProfile = await showUserProfileUseCase.execute(user.id as string)

    expect(userProfile).toBeInstanceOf(User);
    expect(userProfile).toEqual(expect.objectContaining({
      name: user.name,
      email: user.email,
    }));

  });

  it('Não deve ser capaz de mostrar o perfil de usuário não existente', async () => {
    await expect(showUserProfileUseCase.execute('non-existing-user'))
      .rejects.toBeInstanceOf(ShowUserProfileError);
  });
});
