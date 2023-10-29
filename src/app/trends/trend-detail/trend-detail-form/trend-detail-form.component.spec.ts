import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendDetailFormComponent } from './trend-detail-form.component';

describe('TrendDetailFormComponent', () => {
  let component: TrendDetailFormComponent;
  let fixture: ComponentFixture<TrendDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendDetailFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
