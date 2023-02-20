import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowitanieComponent } from './powitanie.component';

describe('PowitanieComponent', () => {
  let component: PowitanieComponent;
  let fixture: ComponentFixture<PowitanieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowitanieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PowitanieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
