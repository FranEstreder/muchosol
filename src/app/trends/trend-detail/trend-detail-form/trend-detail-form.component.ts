import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-trend-detail-form',
  templateUrl: 'trend-detail-form.component.html',
  styleUrls: ['trend-detail-form.component.scss'],
})
export class TrendDetailFormComponent implements OnInit {
  @Input() trend: any;
  @Output('formActivated') formActivated = new EventEmitter();

  public form = new FormGroup({
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    provider: new FormControl('', Validators.required),
  });

  constructor() {}

  ngOnInit(): void {
    console.log(this.trend);

    if (this.trend) {
      this.form.patchValue({
        title: this.trend.title,
        body: this.trend.body,
        url: this.trend.url,
        image: this.trend.image,
        provider: this.trend.provider,
      });
    }
  }

  closeForm() {
    this.formActivated.emit();
  }
}
