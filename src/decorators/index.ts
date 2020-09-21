import { Request, Reply } from "../utils";
import { accessUserPermission } from "../helpers";

export const AccessControl = (
  component: string,
  module: string,
  action: string
) => {
  return function (
    target: Object,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) {
    let method = descriptor.value;
    descriptor.value = function (...args: any[]) {
      //   console.log(args);
      let [req, rep] = args;
      req.acl = {
        component,
        module,
        action,
      };
      return method.apply(this, args);
    };
    return descriptor;
  };
};

export const Authorization = (role: string, action: string) => {
  return function (
    target: Object,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) {
    let method = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const [req, rep] = args;
      console.log(req.acl);
      const checked = await accessUserPermission(
        1,
        req.acl.module,
        req.acl.action
      );
      console.log("ok ", checked);
      return method.apply(this, args);
    };
    return descriptor;
  };
};
