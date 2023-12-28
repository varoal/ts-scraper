import { LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { RestServiceScraper } from "./service/scraper-service";
import { ParsedResults } from "./model/parsed-result";

export class ScraperPageViewModel extends LitElement {
  @property({ type: Array }) results: ParsedResults = [];
  @property({ type: Array }) filteredResults: ParsedResults = [];
  @state() loading: boolean = false;

  private endpoint: string = "http://localhost:3000/api/scrape";

  protected service = new RestServiceScraper(this.endpoint);

  protected async fetchData() {
    this.loading = true;
    try {
      const data = await this.service.getResults();
      this.results = data;
      this.filteredResults = [...data];
      console.log(this.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    this.loading = false;
  }

  protected filterByLongTitleOrderByComments() {
    this.filteredResults = this.results
      .filter((item) => item.title.split(" ").length > 5)
      .sort((a, b) => a.commentCount - b.commentCount);
  }

  protected filterByShortTitleOrderByPoints() {
    this.filteredResults = this.results
      .filter((item) => item.title.split(" ").length <= 5)
      .sort((a, b) => a.points - b.points);
  }

  protected showAllResults() {
    this.filteredResults = [...this.results];
  }
}
