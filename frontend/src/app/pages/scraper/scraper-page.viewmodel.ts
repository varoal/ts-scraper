import { LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { RestServiceScraper } from "./service/scraper-service";
import { ParsedResults } from "./model/parsed-result";

export class ScraperPageViewModel extends LitElement {
  @property({ type: Array }) results: ParsedResults = [];
  @property({ type: Array }) filteredResults: ParsedResults = [];
  @state() filterState!: FilterState;
  @state() loadingResults: boolean = false;
  @state() isDataFetched: boolean = false;
  @state() filterWithServer: boolean = false;

  private readonly endpoint: string = "http://localhost:3000/api";

  protected service = new RestServiceScraper(this.endpoint);

  async connectedCallback() {
    super.connectedCallback();
    console.log(this.isDataFetched);
  }

  protected async fetchData() {
    this.loadingResults = true;
    try {
      const data = await this.service.getResults();
      this.results = data;
      this.filteredResults = [...data];
      this.handleDisabledActions();
      this.filterState = "all";
      console.log(this.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    this.loadingResults = false;
  }

  protected async serverFilterByLongTitleOrderByComments() {
    this.loadingResults = true;
    try {
      const data = await this.service.filterByLongTitleOrderByComments();
      this.results = data;
      this.filteredResults = [...data];
      this.handleDisabledActions();
      this.filterState = "filter1";
      console.log(this.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    this.loadingResults = false;
  }

  protected async serverfilterByShortTitleOrderByPoints() {
    this.loadingResults = true;
    try {
      const data = await this.service.filterByShortTitleOrderByPoints();
      this.results = data;
      this.filteredResults = [...data];
      this.handleDisabledActions();
      this.filterState = "filter2";
      console.log(this.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    this.loadingResults = false;
  }

  protected filterByLongTitleOrderByComments() {
    if (this.filterWithServer) {
      this.serverFilterByLongTitleOrderByComments();
    } else {
      this.filteredResults = this.results
        .filter((item) => item.title.split(" ").length > 5)
        .sort((a, b) => a.commentCount - b.commentCount);
    }
    this.filterState = "filter1";
  }

  protected filterByShortTitleOrderByPoints() {
    if (this.filterWithServer) {
      this.serverfilterByShortTitleOrderByPoints();
    } else {
      this.filteredResults = this.results
        .filter((item) => item.title.split(" ").length <= 5)
        .sort((a, b) => a.points - b.points);
    }
    this.filterState = "filter2";
  }

  protected showAllResults() {
    this.filteredResults = [...this.results];
    this.filterState = "all";
  }

  protected clearResults() {
    this.results = [];
    this.filteredResults = [];
    this.handleDisabledActions();
    this.filterState = "none";
  }

  protected handleDisabledActions() {
    this.isDataFetched = this.results.length > 0;
  }

  getListTitle() {
    const titles = {
      none: "Fetch data to get results",
      all: "Showing All Results",
      filter1:
        "More than five words in the title ordered by the number of comments",
      filter2:
        "Less than or equal to five words in the title ordered by points",
    };

    return titles[this.filterState];
  }

  protected setFilterMode(useServer: boolean) {
    this.clearResults();
    this.filterWithServer = useServer;
    console.log(this.filterWithServer);
  }
}
