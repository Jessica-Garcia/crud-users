import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../Repositories/IUsersRepository";

interface IRequest{
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  }
  token: string;
}
@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({email, password}: IRequest): Promise<IResponse>{

    const user = await this.usersRepository.findByEmail(email);
    if(!user){
      throw new AppError("Email or password incorrect", 401);
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch){
      throw new AppError("Email or password incorrect", 401);
    }

    const token = sign({}, "53ffd167a6d6f3424fac044ca10ba201", {
      subject: user.id,
      expiresIn: "1d"
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    }

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };