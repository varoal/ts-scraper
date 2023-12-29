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
      res.status(500).json({ message: "Error fetching HTML" });
    }
  };

  public scrapeData = async (req: Request, res: Response) => {
    try {
      const html = await this.scraperService.fetchHtml(this.targetUrl);
      const formattedData = this.scraperService.parseHtml(html);
      res.json(formattedData);
    } catch (error) {
      res.status(500).json({ message: "Error parsing HTML" });
    }
  };

  private async fetchDataAndParse(): Promise<void> {
    if (!this.scraperService.isDataAvailable()) {
      const html = await this.scraperService.fetchHtml(this.targetUrl);
      this.scraperService.parseHtml(html);
    }
  }

  public filterByLongTitleOrderByComments = async (
    req: Request,
    res: Response
  ) => {
    try {
      const minWords = req.query.minWords
        ? parseInt(req.query.minWords as string, 10)
        : 6;
      if (isNaN(minWords)) {
        return res.status(400).json({ message: "Invalid minWords parameter" });
      }

      await this.fetchDataAndParse();
      const results =
        this.scraperService.filterByLongTitleOrderByComments(minWords);

      res.status(200).json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error filtering and sorting" });
    }
  };

  public filterByShortTitleOrderByPoints = async (
    req: Request,
    res: Response
  ) => {
    try {
      const maxWords = req.query.maxWords
        ? parseInt(req.query.maxWords as string, 10)
        : 5;

      if (isNaN(maxWords)) {
        return res.status(400).json({ message: "Error filtering and sorting" });
      }

      await this.fetchDataAndParse();
      const results = this.scraperService.filterByShortTitleOrderByPoints(maxWords);

      res.status(200).json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  };
}
