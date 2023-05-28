import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { createUserController } from "../useCases/CreateUser";
import { activateAccountController } from "../useCases/ActivateAccount";

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

  app.route({
    method: "POST",
    url: "/activateaccount",
    schema: {
      body: {
        type: "object",
        properties: {
          token: { type: "string" },
        },
        required: ["token"],
      },
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
        400: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: async (request, reply) => {
      await activateAccountController.handle(request, reply);
    },
  });
};
