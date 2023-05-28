import { CreateUserUseCase } from "./CreateUserUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const name = request.body["name"];
    const email = request.body["email"];
    const password = request.body["password"];

    if (!name) return reply.status(400).send({ message: "Name is required" });
    if (!email) return reply.status(400).send({ message: "Email is required" });
    if (!password)
      return reply.code(400).send({ message: "Password is required" });

    try {
      await this.createUserUseCase.execute({
        name,
        email,
        password,
      });

      return reply.code(201).send({ message: "User created successfully" });
    } catch (err) {
      return reply.code(400).send({
        message: err.message || "Unexpected error.",
      });
    }
  }
}
