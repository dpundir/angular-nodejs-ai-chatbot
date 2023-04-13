import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AIProviderComponent } from './aiprovider.component';

describe('AIProviderComponent', () => {
  let component: AIProviderComponent;
  let fixture: ComponentFixture<AIProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AIProviderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AIProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
