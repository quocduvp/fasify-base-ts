import {
  FastifyInstance,
  FastifyLoggerInstance,
  RouteShorthandOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { RouteGenericInterface } from "fastify/types/route";

interface RegisterRoutes {
  routes: any;
  prefix: Prefix;
}

interface Prefix {
  prefix: string;
}

export interface Request
  extends FastifyRequest<RouteGenericInterface, Server, IncomingMessage> {
  [index: string]: any;
}
export interface Reply
  extends FastifyReply<
    Server,
    IncomingMessage,
    ServerResponse,
    RouteGenericInterface,
    unknown
  > {
  [index: string]: any;
}

export interface FastifyInterFace
  extends FastifyInstance<
    Server,
    IncomingMessage,
    ServerResponse,
    FastifyLoggerInstance
  > {}

export interface OptionInterface
  extends RouteShorthandOptions<
    Server,
    IncomingMessage,
    ServerResponse,
    RouteGenericInterface,
    unknown
  > {}

export const registerHandler = (registerRoutes: RegisterRoutes[]) => async (
  fastify: FastifyInterFace,
  opts: OptionInterface,
  done: any
) => {
  await Promise.all(
    registerRoutes.map((registerRoute) => {
      return fastify.register(registerRoute.routes, registerRoute.prefix);
    })
  );
  done();
};
