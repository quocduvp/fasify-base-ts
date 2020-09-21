import adminRoutes from "./admin";
import { registerHandler } from "../../utils";

export default registerHandler([
  {
    routes: adminRoutes,
    prefix: {
      prefix: "/admin",
    },
  },
]);
