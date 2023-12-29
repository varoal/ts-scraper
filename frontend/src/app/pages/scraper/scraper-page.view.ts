import { css, html } from "lit";
import { ScraperPageViewModel } from "./scraper-page.viewmodel";
import { customElement } from "lit/decorators.js";
import { when } from "lit/directives/when.js";
import "../../components/list-item/list-item.view";

@customElement("scraper-page")
export class ScraperPageView extends ScraperPageViewModel {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        background-color: #121212;
        color: #ffffff;
      }

      .container {
        text-align: center;
        max-width: 600px;
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
      }

      button {
        background-color: #1e88e5;
        color: #ffffff;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1em;
        margin-bottom: 20px;
        transition: background-color 0.3s ease;
      }

      button:hover {
        background-color: #1565c0;
      }

      button[disabled],
      .filterby-button.inactive {
        background-color: #808080;
        cursor: not-allowed;
      }

      button[disabled]:hover {
        background-color: #646464;
      }

      .clear-button {
        background: #bb0000;
      }

      .clear-button:hover {
        background: #960909;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      list-item-view {
        background-color: #1e1e1e;
        padding: 10px 15px;
        border-radius: 8px;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
      }

      list-item-view:hover {
        background-color: #3f3f3f;
      }
    `;
  }

  public render() {
    return html`
      <div class="container">
        <h1>Hacker News Scraper</h1>
        <div class="filterby-buttons">${this.renderFilterByServer()}</div>
        ${this.renderButtons()}
        <h2>${this.getListTitle()}</h2>
        ${when(
          !this.loadingResults,
          () => this.renderList(),
          () => html`<p>Loading results...</p>`
        )}
      </div>
    `;
  }

  private renderFilterByServer() {
    const clientButtonText = this.filterWithServer
      ? "Use client filter"
      : "Using client filter";
    const serverButtonText = this.filterWithServer
      ? "Using server filter"
      : "Use server filter";

    return html`
      <button @click="${() => this.setFilterMode(false)}">
        ${clientButtonText}
      </button>
      <button @click="${() => this.setFilterMode(true)}">
        ${serverButtonText}
      </button>
    `;
  }

  private renderButtons() {
    return html`
      <button @click="${this.fetchData}">Fetch Data</button>
      <button @click="${this.showAllResults}" ?disabled=${!this.isDataFetched}>
        Show All Results
      </button>
      <button
        @click="${this.filterByLongTitleOrderByComments}"
        ?disabled=${!this.isDataFetched}
      >
        Filter 1
      </button>
      <button
        @click="${this.filterByShortTitleOrderByPoints}"
        ?disabled=${!this.isDataFetched}
      >
        Filter 2
      </button>
      <button class="clear-button" @click="${this.clearResults}">
        Clear Results
      </button>
    `;
  }

  private renderList() {
    return html`
      <ul>
        ${this.filteredResults.map(
          (item) => html`<list-item-view .item=${item}></list-item-view>`
        )}
      </ul>
    `;
  }
}
