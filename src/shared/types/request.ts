import { Request, Response } from "express";

export interface CustomRequest extends Request {
  hostId?: number;
  userId?: number;
}

export interface CustomResponse extends Response {
    hostId?: number;
    userId?: number;
  }
