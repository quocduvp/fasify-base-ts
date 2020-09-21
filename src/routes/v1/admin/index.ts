import authentication from "./authentication";
import { registerHandler } from "../../../utils";

export default registerHandler([
  {
    routes: authentication,
    prefix: { prefix: "/authentication" },
  },
]);
