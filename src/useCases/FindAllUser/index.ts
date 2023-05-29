import { FindAllUsersController } from "./FindAllUsersController";
import { FindAllUsersUseCase } from "./FindAllUsersUseCase";
import { UserRepository } from "../../repositories/implementations/UserRepository";

const userRepository = new UserRepository();
const findAllUsersUseCase = new FindAllUsersUseCase(userRepository);
const findAllUsersController = new FindAllUsersController(findAllUsersUseCase);

export { findAllUsersController };