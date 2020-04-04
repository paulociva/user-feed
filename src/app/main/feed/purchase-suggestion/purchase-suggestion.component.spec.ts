import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseSuggestionComponent } from './purchase-suggestion.component';

describe('PurchaseSuggestionComponent', () => {
  let component: PurchaseSuggestionComponent;
  let fixture: ComponentFixture<PurchaseSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseSuggestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
