import express, { RequestHandler } from "express";
const app = express();

export interface ControllerType {
  path: string;
  method: keyof typeof app;
  handler: RequestHandler;
}
