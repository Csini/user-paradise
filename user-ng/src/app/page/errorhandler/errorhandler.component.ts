import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';

@Component({
  selector: 'paradise-errorhandler',
  templateUrl: './errorhandler.component.html',
  styleUrls: ['./errorhandler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// copied from https://github.com/anirbmuk/angular-error-handler/
export class ErrorhandlerComponent implements OnInit {


  constructor(
    private readonly route: ActivatedRoute,
    private router: Router,
  ) { }

  data: Observable<{ code: number; message: string } | undefined> = EMPTY;

  ngOnInit(): void {
    this.data = this.route.data.pipe(
      map(
        (data) =>
          (data['errorData'] as { code: number; message: string }) || undefined
      )
    );
  }

  onRefresh(): void {
    this.router.navigate(['/']);
  }

  shortcuts: ShortcutInput[] = [];

  ngAfterViewInit(): void {
    this.shortcuts.push(
      {
        key: "f2",
        command: (output: ShortcutEventOutput) => {
          //console.log(output);
          this.onRefresh();
        },
        preventDefault: true
      },
    );
  }
}
