import { Request, Response } from "express";

export interface AppRequest extends Request {
  hostId?: number;
  userId?: number;
}

export interface AppResponse extends Response {
    hostId?: number;
    userId?: number;
  }
