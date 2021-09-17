import { container } from "tsyringe";
import { IUsersRepository } from "../../modules/users/Repositories/IUsersRepository";
import { UsersRepository } from "../../modules/users/Repositories/implementations/UsersRepository";

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);