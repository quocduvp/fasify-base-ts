import dotenv from "dotenv";
import fastify from "fastify";
// includes routes
import v1 from "./routes/v1";

// includes env
dotenv.config({
  path: ".env",
});
const app = fastify({
  logger: true,
});
app.register(v1, { prefix: "/api/v1" });

//error handler
app.setErrorHandler((error, request, reply) => {
  reply.status(error.statusCode || 400).send(error);
});
app.listen(<any>process.env.PORT || 3000, (error, address) => {
  console.log(`Server listen ${address}`);
});
