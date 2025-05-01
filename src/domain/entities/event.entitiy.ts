
export class Event {
  constructor(
    public readonly id: number,
    public readonly orgId: number,
    public readonly name: string,
    public readonly shortDescription: string,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly type: number,
    public readonly status: number,
    public readonly mode: number,
    public readonly categoryId: number,
    public readonly description: string,
    public readonly location: string,
    public readonly address: string,
    public readonly meetLink: string | null,
    public readonly coverPhoto: string,
    public readonly featured: boolean,
    public readonly updatedAt: Date,
    public readonly createdAt: Date
  ) {}
}


export class EventType{
  constructor(
    public readonly id: number,
    public readonly eventTypeName: string,
  ) {}
}

export class EventStatus{
  constructor(
    public readonly id: number,
    public readonly eventStatusName: string,
  ) {}
}

export class EventMode{
  constructor(
    public readonly id: number,
    public readonly eventModeName: string,
  ) {}
}

