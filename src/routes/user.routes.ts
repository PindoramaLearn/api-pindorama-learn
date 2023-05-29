import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { createUserController } from "../useCases/CreateUser";
import { activateAccountController } from "../useCases/ActivateAccount";
import { findAllUsersController } from "../useCases/FindAllUser";
import { RateLimit } from "../middlewares/RateLimit";
import { loginUserController } from "../useCases/LoginUser";

export const UserRoutes = (app: FastifyInstance) => {
  app.route({
    method: "GET",
    url: "/users",
    handler: async (request, reply) => {
      await findAllUsersController.handle(request, reply);
    },
    preHandler: RateLimit,
  });

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

  app.route({
    method: "POST",
    url: "/loginuser",
    schema: {
      body: {
        type: "object",
        properties: {
          email: { type: "string" },
          password: { type: "string" },
        },
        required: ["email", "password"],
      },
    },
    handler: async (request, reply) => {
      await loginUserController.handle(request, reply);
    },
  });
};
