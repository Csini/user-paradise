import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletebuttonComponent } from './deletebutton.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';

describe('DeletebuttonComponent', () => {
  let component: DeletebuttonComponent;
  let fixture: ComponentFixture<DeletebuttonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,  KeyboardShortcutsModule.forRoot(),],
      declarations: [DeletebuttonComponent]
    });
    fixture = TestBed.createComponent(DeletebuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
