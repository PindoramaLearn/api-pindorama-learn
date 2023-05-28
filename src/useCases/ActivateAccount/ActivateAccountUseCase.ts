import { IActivateAccountProvider } from "../../providers/IActivateAccountProvider";
import { z } from "zod";

class ActivateAccountUseCase {
  constructor(private ActivateAccountProvider: IActivateAccountProvider) {}

  async execute(token: string): Promise<void> {
    try {
      const tokenSchema = z.string().uuid();

      const verifyToken = tokenSchema.safeParse(token);

      if (!verifyToken.success) {
        throw new Error("Invalid token");
      }

      await this.ActivateAccountProvider.activateAccount(token);
    } catch (err) {
      throw new Error(err && err.message ? err.message : err);
    }
  }
}

export default ActivateAccountUseCase;
