import { ParsedResults } from "../models/parsed-result";
import { ScraperService } from "./scraper-service";

describe("ScraperService", () => {
  const sampleHtml = `<html>
    <body>
      <table>
        <tr class="athing">
          <td class="title">
            <span class="rank">1.</span>
            <span class="titleline"><a href="https://example.com/story">Test Title</a></span>
          </td>
        </tr>
        <tr>
          <td class="subtext">
            <span class="score">123 points</span>
            <a href="item?id=12345">35 comments</a>
          </td>
        </tr>
      </table>
    </body>
    </html>`;
  test("should parse HTML correctly", () => {
    const service = new ScraperService();
    const results: ParsedResults = service.parseHtml(sampleHtml);
    expect(results.length).toBeGreaterThan(0);
    expect(results.length).toEqual(1);
  });

  it("should return results following the ParsedResult interface", () => {
    const service = new ScraperService();
    const results = service.parseHtml(sampleHtml);

    results.forEach((result) => {
      expect(result).toHaveProperty("title");
      expect(typeof result.title).toBe("string");

      expect(result).toHaveProperty("orderNumber");
      expect(typeof result.orderNumber).toBe("number");

      expect(result).toHaveProperty("points");
      expect(typeof result.points).toBe("number");

      expect(result).toHaveProperty("commentCount");
      expect(typeof result.commentCount).toBe("number");
    });
  });
});
