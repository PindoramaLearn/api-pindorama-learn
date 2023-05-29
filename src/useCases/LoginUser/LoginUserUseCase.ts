import { IUserRepository } from "../../repositories/IUserRepository";
import { ILoginUserDTO } from "./LoginUserDTO";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export class LoginUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: ILoginUserDTO) {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (!userAlreadyExists) {
      throw new Error("User not found");
    }

    const passwordMatch = bcrypt.compareSync(
      data.password,
      userAlreadyExists.password
    );

    if (!passwordMatch) {
      throw new Error("Incorrect password");
    }

    const token = jwt.sign(
      { id: userAlreadyExists.id, email: userAlreadyExists.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log(token);
    return token;
  }
}
