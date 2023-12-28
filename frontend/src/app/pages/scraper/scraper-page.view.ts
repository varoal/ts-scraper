import { css, html } from "lit";
import { ScraperPageViewModel } from "./scraper-page.viewmodel";
import { customElement } from "lit/decorators.js";
import { when } from 'lit/directives/when.js';
import '../../components/list-item/list-item.view'

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
        ${this.renderButtons()}
        ${this.renderList()}
        ${when(this.loading, () => html `
        Loading results
        `)}
      </div>
    `;
  }

  private renderButtons() {
    return html`
      <button @click="${this.fetchData}">Fetch Data</button>
      <button @click="${this.showAllResults}">Show All Results</button>
      <button @click="${this.filterByLongTitleOrderByComments}">Filter 1</button>
      <button @click="${this.filterByShortTitleOrderByPoints}">Filter 2</button>
    `;
  }

  private renderList() {
    return html`
      <ul>
        ${this.filteredResults.map(item => html`<list-item-view .item=${item}></list-item-view>`)}
      </ul>
    `;
  }
}

