import { DeleteResult } from "typeorm";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUsersRepository{
  create(data: ICreateUserDTO): Promise<void>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  update(id: string, data: ICreateUserDTO): Promise<User>;
  delete(id: string): Promise<DeleteResult>;
  list(): Promise<User[]>;
}

export { IUsersRepository }