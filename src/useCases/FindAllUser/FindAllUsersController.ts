import { FastifyReply, FastifyRequest } from "fastify";
import { FindAllUsersUseCase } from "./FindAllUsersUseCase";

export class FindAllUsersController {
  constructor(private findAllUsersUseCase: FindAllUsersUseCase) {}

  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<Response> {
    try {
      const users = await this.findAllUsersUseCase.execute();
      return reply.status(200).send(users);
    } catch (error) {
      return reply.status(400).send({
        message: error.message || "Unexpected error",
      });
    }
  }
}
