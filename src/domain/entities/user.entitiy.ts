export class User {
  constructor(
    public readonly id: number,
    public readonly firstName: string,
    public readonly lastName: string | null,
    public readonly email: string,
    public readonly phone: string,
    public readonly profile: string | null,
    public readonly isDeleted: boolean,
    public readonly deletedDate: Date | null,
    public readonly password: string,
    public readonly createdAt: Date
  ) {}
}