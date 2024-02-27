import { ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';

@Component({
  selector: 'paradise-errorhandler',
  templateUrl: './errorhandler.component.html',
  styleUrls: ['./errorhandler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// copied from https://github.com/anirbmuk/angular-error-handler/
export class ErrorhandlerComponent implements OnInit {
  constructor(private readonly route: ActivatedRoute) { }

  data: Observable<{ code: number; message: string } | undefined> = EMPTY;

  ngOnInit(): void {
    this.data = this.route.data.pipe(
      map(
        (data) =>
          (data['errorData'] as { code: number; message: string }) || undefined
      )
    );
  }
}
