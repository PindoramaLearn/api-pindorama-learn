import { FastifyReply, FastifyRequest } from "fastify";
import { LoginUserUseCase } from "./LoginUserUseCase";

export class LoginUserController {
  constructor(private loginUserUseCase: LoginUserUseCase) {}

  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const email = request.body["email"];
    const password = request.body["password"];

    try {
      const token = await this.loginUserUseCase.execute({
        email,
        password,
      });

      return reply.code(200).send(token);
    } catch (error) {
      return reply.code(400).send({ error: error.message });
    }
  }
}
