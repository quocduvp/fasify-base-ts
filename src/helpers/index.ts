import { theme } from "../../prisma/src/generated/client/runtime/highlight/theme";
import Db from "../datasources";

export const accessUserPermission = async (
  userId: any,
  module: string,
  action: string
) => {
  try {
    const userPermissions = await Db.getConnector().userPermission.findMany({
      where: {
        userId,
        permission: {
          OR: [
            {
              action: module,
            },
            {
              action,
            },
          ],
        },
      },
    });
    console.log(userPermissions);
    return userPermissions;
  } catch (error) {
    throw error;
  }
};
