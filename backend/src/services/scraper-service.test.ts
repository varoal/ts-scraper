import { ParsedResults } from "../models/parsed-result";
import { ScraperService } from "./scraper-service";

describe("ScraperService", () => {
  let service: ScraperService;
  let parsedResults: ParsedResults;
  const sampleHtml = `<html>
    <body>
      <table>
        <tr class="athing">
          <td class="title">
            <span class="rank">1.</span>
            <span class="titleline"><a href="">Test Title</a></span>
          </td>
        </tr>
        <tr>
          <td class="subtext">
            <span class="score">123 points</span>
            <a href="item?id=12345">35 comments</a>
          </td>
        </tr>
        <tr class="athing">
          <td class="title">
            <span class="rank">2.</span>
            <span class="titleline"><a href="">Test Title 2</a></span>
          </td>
        </tr>
        <tr>
          <td class="subtext">
            <span class="score">12 points</span>
            <a href="item?id=12345">2 comments</a>
          </td>
        </tr>
      </table>
    </body>
    </html>`;

    beforeEach(() => {
      service = new ScraperService();
      parsedResults = service.parseHtml(sampleHtml);
    });

  it("should parse HTML correctly", () => {

    expect(parsedResults.length).toBeGreaterThan(0);
    expect(parsedResults.length).toEqual(2);
  });

  it("should return results following the ParsedResult interface", () => {

    parsedResults.forEach((parsedResult) => {
      expect(parsedResult).toHaveProperty("title");
      expect(typeof parsedResult.title).toBe("string");

      expect(parsedResult).toHaveProperty("orderNumber");
      expect(typeof parsedResult.orderNumber).toBe("number");

      expect(parsedResult).toHaveProperty("points");
      expect(typeof parsedResult.points).toBe("number");

      expect(parsedResult).toHaveProperty("commentCount");
      expect(typeof parsedResult.commentCount).toBe("number");
    });
  });

  it('should parse HTML and extract correct values', () => {
    expect(parsedResults[0].title).toBe('Test Title');
    expect(parsedResults[0].orderNumber).toBe(1);
    expect(parsedResults[0].points).toBe(123);
    expect(parsedResults[0].commentCount).toBe(35);
  });

  it('filterByLongTitleOrderByComments should filter and sort correctly', () => {
    const filteredResults = service.filterByLongTitleOrderByComments(5);

    expect(filteredResults.every(result => result.title.split(' ').length > 5)).toBeTruthy();

    const isSortedByComments = filteredResults.every((result, index, array) => {
      return index === 0 || array[index - 1].commentCount <= result.commentCount;
    });
    expect(isSortedByComments).toBeTruthy();
  });

  it('filterByShortTitleOrderByPoints should filter and sort correctly', () => {
    const filteredResults = service.filterByShortTitleOrderByPoints(5);

    expect(filteredResults.every(result => result.title.split(' ').length <= 5)).toBeTruthy();

    const isSortedByPoints = filteredResults.every((result, index, array) => {
      return index === 0 || array[index - 1].points <= result.points;
    });
    expect(isSortedByPoints).toBeTruthy();
  });
});
