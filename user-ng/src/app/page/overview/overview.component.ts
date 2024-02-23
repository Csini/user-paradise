import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map, scan } from 'rxjs';
import { sortByColumn } from 'src/app/common/sortbycolumn';
import { User, UserService } from 'src/app/gen';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  users: User[] = [];

  users$: Observable<User[]>;
  // make this a behavior subject instead
  sortedColumn$ = new BehaviorSubject<string>('');

  constructor(private userService: UserService) {
    // combine observables, use map operator to sort
    this.users$ = combineLatest(this.userService.readAllUser(), this.sortDirection$)
    .pipe(
      map(([list, sort]) => !sort.col ? list : sortByColumn(list, sort.col, sort.dir))
    );

  }

  ngOnInit(): void {
    console.log("component has been initialized!")
    this.getUsers();
  }

  getUsers(): void {
    this.userService.readAllUser()
      .subscribe(users => this.users = users);
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
}
