import { Request, Response } from "express";

export interface AppRequest extends Request {
  hostId?: number;
  userId?: number;
  orgId?: number;
}

export interface AppResponse extends Response {
  hostId?: number;
  userId?: number;
  orgId?: number;
}
