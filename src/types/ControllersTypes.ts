import express, { RequestHandler } from "express";
const app = express();

export interface ControllerType {
  path: string;
  method: keyof typeof app;
  handler: RequestHandler;
}

export interface SignInBodyType {
  email: string;
  password: string;
}

export interface SignUpBodyType {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface SignUpDataType {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmation_id: string;
}
