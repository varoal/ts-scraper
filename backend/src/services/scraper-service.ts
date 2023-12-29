import * as cheerio from "cheerio";
import { ParsedResult, ParsedResults } from "../models/parsed-result";

export class ScraperService {
  private parsedResults: ParsedResults = [];
  private filteredResults: ParsedResults = [];

  public async fetchHtml(url: string): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error, status: ${response.status}`);
    }
    return response.text();
  }

  public parseHtml(html: string): ParsedResults {
    const $ = cheerio.load(html);
    this.parsedResults = [];

    $("tr.athing")
      .slice(0, 30)
      .each((index, el) => {
        const element = $(el);

        const title = element.find("td.title > span.titleline > a").text();
        const rankText = element.find("span.rank").text();
        const orderNumber = parseInt(rankText.replace(/\D/g, ""), 10) || 0;

        const sibling = element.next();
        const pointsText = sibling.find("span.score").text();
        const points = parseInt(pointsText.replace(/\D/g, ""), 10) || 0;
        const commentText = sibling.find('a[href*="item?id="]').last().text();
        const commentCount = parseInt(commentText.replace(/\D/g, ""), 10) || 0;

        const result: ParsedResult = {
          title: title,
          orderNumber: orderNumber,
          points: points,
          commentCount: commentCount,
        };

        this.parsedResults.push(result);
      });

    return this.parsedResults;
  }

  public isDataAvailable(): boolean {
    return this.parsedResults.length > 0;
  }

  private filterByTitleLength(results: ParsedResults, minWords?: number, maxWords?: number): ParsedResults {
    return results.filter(item => {
      const wordCount = item.title.split(" ").length;
      const meetsMinWords = minWords !== undefined ? wordCount >= minWords : true;
      const meetsMaxWords = maxWords !== undefined ? wordCount <= maxWords : true;
      return meetsMinWords && meetsMaxWords;
    });
  }

  private sortByComments(results: ParsedResults): ParsedResults {
    return results.sort((a, b) => a.commentCount - b.commentCount);
  }

  private sortByPoints(results: ParsedResults): ParsedResults {
    return results.sort((a, b) => a.points - b.points);
  }

  public filterByLongTitleOrderByComments(minWords: number) {
    const longTitleResults = this.filterByTitleLength(this.parsedResults, minWords);
    this.filteredResults = this.sortByComments(longTitleResults);
    return this.filteredResults;
  }

  public filterByShortTitleOrderByPoints(maxWords: number) {
    const shortTitleResults = this.filterByTitleLength(this.parsedResults, undefined, maxWords);
    this.filteredResults = this.sortByPoints(shortTitleResults);
    return this.filteredResults;
  }
}
