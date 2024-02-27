import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { OverviewComponent } from './overview.component';


import { RouterTestingModule } from '@angular/router/testing';
// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from 'src/app/gen';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';


describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  let injector: TestBed;
  let service: UserService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule, KeyboardShortcutsModule.forRoot(),],
      providers: [UserService],
      declarations: [OverviewComponent]
    });

    injector = getTestBed();
    service = injector.get(UserService);
    httpMock = injector.get(HttpTestingController);
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
