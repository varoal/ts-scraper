import * as cheerio from "cheerio";
import { ParsedResult, ParsedResults } from "../models/parsed-result";

export class ScraperService {
  public async fetchHtml(url: string): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error, status: ${response.status}`);
    }
    return response.text();
  }

  public parseHtml(html: string): ParsedResults {
    const $ = cheerio.load(html);
    const results: ParsedResults = [];

    $("tr.athing").slice(0, 30).each((index, el) => {
        const element = $(el);

        const title = element.find("td.title > span.titleline > a").text();
        const rankText = element.find("span.rank").text();
        const orderNumber = parseInt(rankText.replace(/\D/g, ""), 10) || 0;

        const sibling = element.next(); 
        const pointsText = sibling.find("span.score").text();
        const points = parseInt(pointsText.replace(/\D/g, ""), 10) || 0;
        const commentText = sibling.find('a[href*="item?id="]').last().text();
        const commentCount = parseInt(commentText.replace(/\D/g, ""), 10) || 0;

        const data: ParsedResult = {
            title: title,
            orderNumber: orderNumber,
            points: points,
            commentCount: commentCount,
        };

        results.push(data);
    });

    return results;
}
}
