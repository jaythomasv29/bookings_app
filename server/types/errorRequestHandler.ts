import { ErrorRequestHandler } from "express";

export interface ErrorUserRequestHandler extends ErrorRequestHandler {
  status: string,
  message: string,
  stack: string,
}