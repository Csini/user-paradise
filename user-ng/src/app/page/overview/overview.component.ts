import { Component, OnInit } from '@angular/core';
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

  Length: number = 100;

  constructor(private userService: UserService) {



  }

  ngOnInit(): void {
    console.log("component has been initialized!")
    this.readSortedUsers();
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
}