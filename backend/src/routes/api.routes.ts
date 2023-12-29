import express, { Router } from 'express';
import { ScraperController } from '../controllers/scraper-controller';

export class ApiRouter {
    public router: Router;

    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        const scraperController = new ScraperController();
        
        this.router.get('/get-html', scraperController.fetchHtml.bind(scraperController))
        this.router.get('/scrape', scraperController.scrapeData.bind(scraperController));
        this.router.get('/filter-long-title', scraperController.filterByLongTitleOrderByComments.bind(scraperController));
        this.router.get('/filter-short-title', scraperController.filterByShortTitleOrderByPoints.bind(scraperController));
    }
}