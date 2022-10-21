export {};

declare global {
  namespace Express {
    export interface Request {
      id: number;
      first_name: string;
      last_name: string;
    }
  }
}