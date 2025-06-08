import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesPaymentComponent } from './succes-payment.component';

describe('SuccesPaymentComponent', () => {
  let component: SuccesPaymentComponent;
  let fixture: ComponentFixture<SuccesPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccesPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccesPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
