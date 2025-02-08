import express, {type Request, type Response } from 'express';

export const app = express();

app.get('/api/test', (req: Request, res: Response) => {
  res.json({ greeting: "Hello World!" })
});
