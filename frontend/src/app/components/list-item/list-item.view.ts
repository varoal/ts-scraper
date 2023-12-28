import { html } from "lit";
import { ListItemViewModel } from "./list-item.viewmodel";
import { customElement } from "lit/decorators.js";

@customElement("list-item-view")
export class ListItemView extends ListItemViewModel {
  public render() {
    return html`
      <li>
        ${this.item.orderNumber} . ${this.item.title} -
        ${this.item.commentCount} comments - ${this.item.points} points
      </li>
    `;
  }
}
