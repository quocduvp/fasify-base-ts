import { Request, Reply } from "../utils";
import { Authorization, AccessControl } from "../decorators";

export default class Authentication {
  static instance: Authentication;

  login(req: Request, reply: Reply) {
    reply.send({
      message: "hello world",
    });
  }

  static getInstance() {
    if (!Authentication.instance) {
      Authentication.instance = new Authentication();
    }
    return Authentication.instance;
  }
}
