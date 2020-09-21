import {
  PrismaClient,
  PrismaClientOptions,
} from "../../prisma/src/generated/client";

class Db {
  private static instance: PrismaClient<PrismaClientOptions, never>;

  static getConnector() {
    if (!Db.instance) {
      Db.instance = new PrismaClient({
        log: ["query"],
        errorFormat: "pretty",
      });
    }
    return Db.instance;
  }
}

export default Db;
