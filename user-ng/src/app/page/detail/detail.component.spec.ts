import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailComponent } from './detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ShortcutService } from 'src/app/common/shortcut.service';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [RouterTestingModule.withRoutes([]), HttpClientTestingModule, KeyboardShortcutsModule.forRoot(), ReactiveFormsModule,],
      providers: [
        ShortcutService,
      ],
      declarations: [DetailComponent, ]
    });
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
