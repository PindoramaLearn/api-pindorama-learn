import redis from "../../database/cache";
import prismaClient from "../../database/prismaClient";
import { IActivateAccountProvider } from "../IActivateAccountProvider";

class ActivateAccountProvider implements IActivateAccountProvider {
  async activateAccount(token: string): Promise<void> {

    const verifyTokenExist = await redis.get(token);

    if (!verifyTokenExist) {
      throw new Error("Token not found");
    }

    await redis.del(token);

    await prismaClient.user.update({
      where: {
        email: verifyTokenExist,
      },
      data: {
        activated: true,
      },
    });
  }
}

export default ActivateAccountProvider;
