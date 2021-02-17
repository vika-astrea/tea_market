import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaveListComponent } from './have-list.component';

describe('HaveListComponent', () => {
  let component: HaveListComponent;
  let fixture: ComponentFixture<HaveListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HaveListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HaveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
