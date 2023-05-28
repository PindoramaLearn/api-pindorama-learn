import ActivateAccountUseCase from "./ActivateAccountUseCase";
import ActivateAccountController from "./ActivateAccountController";
import ActivateAccountProvider from "../../providers/implementations/ActivateAccountProvider";

const activateAccountProvider = new ActivateAccountProvider();
const activateAccountUseCase = new ActivateAccountUseCase(activateAccountProvider);
const activateAccountController = new ActivateAccountController(activateAccountUseCase);

export { activateAccountUseCase, activateAccountController };
