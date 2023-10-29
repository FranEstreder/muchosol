import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Router } from '@angular/router';
import { selectSelectedTrend } from '../store/selectors';
import { TrendService } from '../trend.service';

@Component({
  selector: 'app-trend-detail',
  template: `
    <a class="link-to-home" routerLink="/trends">
      <img src="assets/Iconos/Actions/back.svg" alt="Flecha hacia atrás" />
      <span>TODOS LOS EVENTOS</span>
    </a>
    <article class="trend__detail" *ngIf="trend$ | async as trend">
      <header class="trend__header">
        <div class="trend__actions">
          <button type="button" class="trend__action" (click)="formActivated()">
            <img src="assets/Iconos/Actions/edit.svg" alt="Editar noticia" />
          </button>
          <button
            type="button"
            class="trend__action"
            (click)="deleteTrend(trend.id)"
          >
            <img src="assets/Iconos/Actions/delete.svg" alt="Borrar noticia" />
          </button>
        </div>
        <img class="trend__image" [src]="trend.image" alt="trend.title" />
      </header>
      <div class="trend__content">
        <h2 class="trend__title">
          <a class="trend__link" [href]="trend.url" target="_blank">
            {{ trend.title }}
          </a>
        </h2>
        <div class="trend_paragraph-container">
          <p class="trend__paragraph" *ngFor="let paragraph of trend.body">
            {{ paragraph }}
          </p>
        </div>
      </div>
    </article>
    <div *ngIf="formActive" class="formActive">
      <app-trend-detail-form
        *ngIf="trend$ | async as trend"
        [trend]="trend"
        (formActivated)="formActivated()"
      ></app-trend-detail-form>
    </div>
  `,
  styleUrls: ['./trend-detail.component.scss'],
})
export class TrendDetailComponent {
  protected trend$ = this.store.select(selectSelectedTrend);

  protected formActive: boolean = false;

  constructor(
    private store: Store,
    private trendService: TrendService,
    private router: Router
  ) {}

  protected formActivated() {
    this.formActive = !this.formActive;
  }

  protected deleteTrend(id: string) {
    if (confirm('¿Seguro que quieres borrar la noticia?')) {
      this.trendService.deleteTrend(id).subscribe(() => {
        this.router.navigateByUrl('trends');
      });
    }
  }
}
