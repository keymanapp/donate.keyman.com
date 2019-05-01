import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WayToGiveComponent } from './ways-to-give.component';

describe('WayToGiveComponent', () => {
  let component: WayToGiveComponent;
  let fixture: ComponentFixture<WayToGiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WayToGiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WayToGiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
