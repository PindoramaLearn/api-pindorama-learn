export interface IActivateAccountProvider {
  activateAccount(token: string): Promise<void>;
}

