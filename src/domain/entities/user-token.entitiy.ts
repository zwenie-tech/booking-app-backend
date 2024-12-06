export class UserToken {
    constructor(
        public readonly id: number,
        public readonly hostId: number,
        public readonly token: string,
        public readonly createdAt: Date
    ){}
}