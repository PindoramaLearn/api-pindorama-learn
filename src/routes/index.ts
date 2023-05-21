import { FastifyInstance } from "fastify";
import { UserRoutes } from "./user.routes";

const routes = async (fastify: FastifyInstance) => {
  UserRoutes(fastify);

  fastify.route({
    method: "GET",
    url: "/",
    handler: async (request, reply) => {
      return { hello: "API OK" };
    },
  });
};

export default routes;
