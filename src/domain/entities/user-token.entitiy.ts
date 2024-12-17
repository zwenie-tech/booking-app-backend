export class UserToken {
    constructor(
        public readonly id: number,
        public readonly userId: number,
        public readonly token: string,
        public readonly createdAt: Date,
        public readonly expiresAt: Date
    ){}
}