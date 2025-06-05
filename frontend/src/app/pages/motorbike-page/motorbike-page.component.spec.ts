import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorbikePageComponent } from './motorbike-page.component';

describe('MotorbikePageComponent', () => {
  let component: MotorbikePageComponent;
  let fixture: ComponentFixture<MotorbikePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotorbikePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotorbikePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
