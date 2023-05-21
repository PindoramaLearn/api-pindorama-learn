import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { createUserController } from "../useCases/CreateUser";

export const UserRoutes = (app: FastifyInstance) => {
  app.route({
    method: "POST",
    url: "/users",
    schema: {
      body: {
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          password: { type: "string" },
        },
        required: ["name", "email", "password"],
      },
      response: {
        201: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
            message: { type: "string" },
          },
        },
      },
    },
    handler: async (request, reply) => {
      await createUserController.handle(request, reply);
    },
  });
};
