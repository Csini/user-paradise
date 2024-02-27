import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorhandlerComponent } from './errorhandler.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ErrorhandlerComponent', () => {
  let component: ErrorhandlerComponent;
  let fixture: ComponentFixture<ErrorhandlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]),],
      declarations: [ErrorhandlerComponent]
    });
    fixture = TestBed.createComponent(ErrorhandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
