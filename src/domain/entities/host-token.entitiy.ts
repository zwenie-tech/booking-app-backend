export class HostToken {
    constructor(
        public readonly id: number,
        public readonly hostId: number,
        public readonly token: string,
        public readonly createdAt: Date,
        public readonly expiresAt: Date
    ){}
}