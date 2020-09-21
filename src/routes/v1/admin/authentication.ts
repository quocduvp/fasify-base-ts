import Controller from "../../../controllers";
import { FastifyInterFace, OptionInterface } from "../../../utils";

const handler = (
  fastify: FastifyInterFace,
  opts: OptionInterface,
  done: any
) => {
  fastify.get("/login", Controller.Authentiation.login);
  fastify.get("/error", (request, reply) => {
    throw new Error("Error");
  });
  done();
};

export default handler;
