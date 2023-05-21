export class User {
  public readonly id: number;
  public name: string;
  public email: string;
  public password: string;

  constructor(props: Omit<User, "id">, id?: number) {
    Object.assign(this, props);

    if (id) {
      this.id = id;
    }
  }
}
