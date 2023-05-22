import fastify, { FastifyInstance } from "fastify";
import routes from "./routes";
import { config } from "dotenv";
config();

const server: FastifyInstance = fastify({ logger: false });

routes(server);

const start = async () => {
    try {
        await server.listen({ port: 3000, host: "0.0.0.0" });
        console.log(
            `%cServer listening on http://localhost:3000`,
            "color: red; font-style: italic"
        );
    } catch (err) {
        server.log.error("Erro", err);
        process.exit(1);
    }
};
start();
