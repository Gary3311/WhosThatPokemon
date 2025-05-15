import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSeiteComponent } from './quiz-seite.component';

describe('QuizSeiteComponent', () => {
  let component: QuizSeiteComponent;
  let fixture: ComponentFixture<QuizSeiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizSeiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizSeiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
