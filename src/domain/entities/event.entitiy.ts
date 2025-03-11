import { EventMode, EventStatus, EventType } from "../../shared/types";

export class Event {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly shortDescription: string,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly type: EventType,
    public readonly status: EventStatus,
    public readonly mode: EventMode,
    public readonly categoryId: number,
    public readonly subCategory: string,
    public readonly description: string,
    public readonly location: string,
    public readonly address: string,
    public readonly meetLink: string,
    public readonly coverPhoto: string,
    public readonly updatedAt: Date,
    public readonly createdAt: Date
  ) {}
}
