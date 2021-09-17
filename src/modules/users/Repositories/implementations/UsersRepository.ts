import { DeleteResult, getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository{
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  async create({name, email, password }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password
    });

    await this.repository.save(user);
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async update(id: string, data: ICreateUserDTO): Promise<User> {
    await this.repository.update(id, data);
    const updatedUser = await this.repository.findOne(id);
    return updatedUser;
  }

  async delete(id: string): Promise<DeleteResult> {
    const deletedUser = await this.repository.delete(id);
    return deletedUser;
  }

  async list(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }
};

export { UsersRepository };