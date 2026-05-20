import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiolinkComponent } from './biolink.component';

describe('BiolinkComponent', () => {
  let component: BiolinkComponent;
  let fixture: ComponentFixture<BiolinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BiolinkComponent]
    });
    fixture = TestBed.createComponent(BiolinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
