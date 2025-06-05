import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsedBikesComponent } from './used-bikes.component';

describe('UsedBikesComponent', () => {
  let component: UsedBikesComponent;
  let fixture: ComponentFixture<UsedBikesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsedBikesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsedBikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
