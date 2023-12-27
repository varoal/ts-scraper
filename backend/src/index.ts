import express from "express";
import { ApiRouter } from './routes/api.routes';

class Server {
  private app: express.Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";
    this.initializeMiddleware();
    this.initializeRoutes();
    this.start();
  }

  private initializeMiddleware() {
    this.app.use(express.json()); 
  }

  private initializeRoutes() {
    const apiRoutes = new ApiRouter().router;
    this.app.use('/api', apiRoutes);
}

  public start() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

const server = new Server();
