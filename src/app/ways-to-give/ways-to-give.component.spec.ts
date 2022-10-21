import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WaysToGiveComponent } from './ways-to-give.component';

describe('WaysToGiveComponent', () => {
  let component: WaysToGiveComponent;
  let fixture: ComponentFixture<WaysToGiveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WaysToGiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaysToGiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
