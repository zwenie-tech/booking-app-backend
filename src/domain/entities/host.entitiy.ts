export class Host {
  constructor(
    public readonly id: number,
    public readonly firstName: string,
    public readonly lastName: string | null,
    public readonly email: string,
    public readonly phone: string,
    public readonly profile: string | null,
    public readonly orgId: number,
    public readonly role: string,
    public readonly isVerified: boolean,
    public readonly isDeleted: boolean,
    public readonly deletedDate: Date | null,
    public readonly password: string,
    public readonly createdAt: Date
  ) {}
}
