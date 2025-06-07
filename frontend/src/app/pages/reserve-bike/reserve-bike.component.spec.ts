import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveBikeComponent } from './reserve-bike.component';

describe('ReserveBikeComponent', () => {
  let component: ReserveBikeComponent;
  let fixture: ComponentFixture<ReserveBikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReserveBikeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReserveBikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
