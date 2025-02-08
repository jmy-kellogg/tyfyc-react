import express, {type Request, type Response } from 'express';

export const app = express();

if (!process.env['VITE']) {
  const frontendFiles = process.cwd() + '/dist'
  app.use(express.static(frontendFiles))
  app.get('/*', (_, res) => {
    res.send(frontendFiles + '/index.html')
  })
  app.listen(process.env['PORT'])
}

app.get('/api/test', (req: Request, res: Response) => {
  res.json({ greeting: "Hello World!" })
});