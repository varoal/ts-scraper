import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { ParsedResult } from 'src/app/pages/scraper/model/parsed-result';

export class ListItemViewModel extends LitElement {
    @property({ type: Object }) item!: ParsedResult;
}