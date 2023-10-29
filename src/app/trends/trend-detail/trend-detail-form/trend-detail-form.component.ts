import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TrendService } from '../../trend.service';

@Component({
  selector: 'app-trend-detail-form',
  templateUrl: 'trend-detail-form.component.html',
  styleUrls: ['trend-detail-form.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('200ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('200ms ease-in', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class TrendDetailFormComponent implements OnInit {
  @Input() trend: any;
  @Output('formActivated') formActivated = new EventEmitter();

  public titleModal: string = '';

  public providers = [
    { name: 'El Mundo', value: 'elmundo' },
    { name: 'El País', value: 'elpais' },
    { name: 'Levante EMV', value: 'levanteemv' },
  ];

  public form = new FormGroup({
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    provider: new FormControl('', Validators.required),
  });

  constructor(private trendService: TrendService) {}

  ngOnInit(): void {
    this.titleModal =
      this.trend === undefined ? 'Nueva noticia' : 'Edita la noticia';

    if (this.trend) {
      this.form.patchValue({
        title: this.trend.title,
        body: this.trend.body.toString(),
        url: this.trend.url,
        image: this.trend.image,
        provider: this.trend.provider,
      });
    }
  }

  closeForm() {
    this.formActivated.emit();
  }

  saveForm() {
    const pattern = /\.(jpg|jpeg|png|gif|bmp|tiff|webp|svg)$/i;

    let aux = this.form.get('image')!.value;

    if (this.form.valid && aux != null) {
      if (pattern.test(aux)) {
        if (this.titleModal.includes('Nueva')) {
          this.trendService.createTrend(this.form.value).subscribe(() => {
            // this.formActivated.emit();
            window.location.reload(); // Esto está hecho únicamente por no entender el store de ngrx y no poder actualizar la trend activada para que se muestre al cerrar el editor
          });
        } else if (!this.form.pristine) {
          this.trendService
            .editTrend(this.trend.id, this.form.value)
            .subscribe(() => {
              // this.formActivated.emit();
              window.location.reload(); // Esto está hecho únicamente por no entender el store de ngrx y no poder actualizar la trend activada para que se muestre al cerrar el editor
            });
        } else {
          alert('No hay ningún cambio que guardar');
        }
      } else {
        alert('La URL de la imagen no tiene el formato requerido');
      }
    } else {
      alert('No puedes dejar ningún campo en blanco');
    }
  }
}
