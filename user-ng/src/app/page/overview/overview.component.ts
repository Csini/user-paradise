import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { BehaviorSubject, Observable, combineLatest, map, scan } from 'rxjs';
import { sortByColumn } from 'src/app/common/sortbycolumn';
import { User, UserResponse, UserService } from 'src/app/gen';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  users: User[] = [];

  sortedColumn$ = new BehaviorSubject<string>('');

  Page: number = 0;
  Size: number = 5;

  Length: number = -1;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedroute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    console.log("component has been initialized!");
    this.activatedroute.paramMap.subscribe(paramMap => {
      this.readSortedUsers();
    });
  }

  readSortedUsers(): void {
    this.userService.readAllUser(this.Page, this.Size).subscribe(userResponse => {
      this.users = userResponse.items;
      this.Length = userResponse.size;
    })
  }

  // the scan operator will let you keep track of the sort direction
  sortDirection$ = this.sortedColumn$.pipe(
    scan<string, { col: string, dir: string }>((sort, val) => {
      return sort.col === val
        ? { col: val, dir: sort.dir === 'desc' ? 'asc' : 'desc' }
        : { col: val, dir: 'desc' }
    }, { dir: 'desc', col: '' })
  )

  // add this function to trigger subject
  sortOn(column: string) {
    this.sortedColumn$.next(column);
  }

  onPrevious(): void {
    this.Page -= 1;
    if (this.Page == -1) {
      this.Page = 0;
    }
    this.readSortedUsers();
  }

  onNext(): void {

    if (this.Page < ((this.Length / this.Size) - 1)) {
      this.Page += 1;
    }
    this.readSortedUsers();
  }

  onCreate(): void {
    this.router.navigate(['/detail', 'new']);
  }

  onDelete(id: number, fullname: string | undefined): void {

    if (confirm("Biztosan törölni akarja a '" + fullname + ' usert?')) {
      this.userService.deleteUser(id).subscribe(() => {
        //console.log("user deleted");
        this.readSortedUsers();
      });
    }
  }

  onUpdate(id: number): void {
    this.router.navigate(['/detail', id]);
  }

  shortcuts: ShortcutInput[] = [];

  ngAfterViewInit(): void {
    this.shortcuts.push(
      {
        key: "f2",
        command: (output: ShortcutEventOutput) => {
          //console.log(output);
          this.onCreate();
        },
        preventDefault: true
      },
      {
        key: "f6",
        command: (output: ShortcutEventOutput) => {
          //console.log(output);
          this.onPrevious();
        },
        preventDefault: true
      },
      {
        key: "f7",
        command: (output: ShortcutEventOutput) => {
          //console.log(output);
          this.onNext();
        },
        preventDefault: true
      },
    );

  }

}
