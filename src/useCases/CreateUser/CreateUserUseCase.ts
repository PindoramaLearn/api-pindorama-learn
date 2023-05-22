import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserDTO } from "./CreateUserDTO";
import { User } from "../../entities/User";
import { NodemailerProvider } from "../../providers/implementations/NodemailerProvider";

export class CreateUserUseCase {
  constructor(private usersRepository: IUserRepository) {}

  async execute(data: ICreateUserDTO): Promise<void> {
    const verifyUser = await this.usersRepository.findByEmail(data.email);

    if (verifyUser) {
      throw new Error("User already exists");
    }

    const user = new User(data);

    await this.usersRepository.create(user);

    const nodemailer = new NodemailerProvider();

    nodemailer.sendMail({
      to: user.email,
      subject: user.name,
      body: "<h1>Oi</h1>",
    });
  }
}
