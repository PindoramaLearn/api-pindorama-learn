import { FastifyReply, FastifyRequest } from "fastify";
import ActivateAccountUseCase from "./ActivateAccountUseCase";

class ActivateAccountController {
  constructor(private activateAccountUseCase: ActivateAccountUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const token = request.body["token"];

    if (!token) return reply.status(400).send({ message: "Token is required" });

    try {
      await this.activateAccountUseCase.execute(token);
      return reply
        .code(200)
        .send({ message: "Account activated successfully" });
    } catch (err) {
      return reply.code(400).send({
        message: err.message || "Unexpected error.",
      });
    }
  }
}

export default ActivateAccountController;
