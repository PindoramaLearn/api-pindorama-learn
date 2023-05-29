import { RouteOptions, preHandlerHookHandler } from "fastify";
import redis from "../../database/cache";

export const RateLimit: preHandlerHookHandler = async (
  request,
  reply,
  next
) => {
  const routeConfig = request.routeConfig as RouteOptions;
  const local = (request.query["local"] as string) || "none";
  const disableRateLimit =
    (request.query["dsrt"] as string) || "false";
  if (disableRateLimit == "false") {
    const key = `rate-limit:${request.ip}:${routeConfig.url}:${routeConfig.method}:${local}`;
    const countConnection = Number((await redis.get(key)) || 0) + 1;
    await redis.set(key, countConnection, "EX", 30);
    if (countConnection > 5)
      return reply.status(429).send({ message: "Too many requests" });
    next();
  }
  next();
};
