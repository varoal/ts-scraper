import { Request, Response } from "express";
import { ScraperService } from "../services/scraper-service";

export class ScraperController {
  private readonly targetUrl: string = "https://news.ycombinator.com/";
  private scraperService: ScraperService = new ScraperService();

  public fetchHtml = async (req: Request, res: Response) => {
    try {
      const html = await this.scraperService.fetchHtml(this.targetUrl);
      res.json(html);
    } catch (error) {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  };

  public scrapeData = async (req: Request, res: Response) => {
    try {
      const html = await this.scraperService.fetchHtml(this.targetUrl);
      const formattedData = this.scraperService.parseHtml(html);
      res.json(formattedData);
    } catch (error) {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  };
}
