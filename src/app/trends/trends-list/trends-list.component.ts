import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { loadTrends } from '../store/actions/trends-list-page.actions';
import { selectTrendsByProvider } from '../store/selectors';

@Component({
  selector: 'app-trends-list',
  template: `
    <a class="trend__action--new" (click)="formActivated()">
      <img src="assets/Iconos/Actions/add.svg" alt="Nueva noticia" />
    </a>
    <article class="trend" *ngFor="let trend of trends$ | async">
      <a class="trend__link" routerLink="/trends/{{ trend.id }}">
        <figure class="trend__figure">
          <img class="trend__image" [src]="trend.image" [alt]="trend.title" />
          <figcaption class="trend__title">
            <h2>{{ trend.title }}</h2>
          </figcaption>
        </figure>
        <p class="trend__excerpt">{{ trend.body[0] }}</p>
      </a>
    </article>
    <div *ngIf="formActive" class="formActive">
      <app-trend-detail-form
        (formActivated)="formActivated()"
      ></app-trend-detail-form>
    </div>
  `,
  styleUrls: ['./trends-list.component.scss'],
})
export class TrendsListComponent implements OnInit {
  protected trends$ = this.store.select(selectTrendsByProvider);

  protected formActive: boolean = false;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadTrends());
  }

  protected formActivated() {
    this.formActive = !this.formActive;
  }
}
