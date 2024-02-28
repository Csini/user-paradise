import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { BehaviorSubject, Observable, combineLatest, map, scan } from 'rxjs';
import { User, UserResponse, UserService } from 'src/app/gen';
import { ShortcutService } from '../../common/shortcut.service';

@Component({
  selector: 'paradise-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  users: User[] = [];

  sortedColumn$ = new BehaviorSubject<string>('');

  Page: number = 0;
  Size: number = 5;
  Sort: Array<string> = ['id', 'asc'];

  Length: number = -1;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private shortcutService: ShortcutService,
  ) {
    //console.log('overview');
   }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(paramMap => {
      this.readSortedUsers();
    });
  }

  readSortedUsers(): void {
    this.userService.readAllUser(this.Page, this.Size, this.Sort).subscribe(userResponse => {
      this.users = userResponse.items;
      this.Length = userResponse.size;
    })
  }

  sortOn(column: string) {
    var dir = (this.Sort[1] === 'desc') ? 'asc' : 'desc';

    this.Sort[0] = column;
    this.Sort[1] = dir;
    this.readSortedUsers();
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

  onDelete(confirmed:boolean): void {
    if (confirmed) {
      this.readSortedUsers();
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
      {
        key: "ctrl + 1",
        command: (output: ShortcutEventOutput) => {
          //console.log(output);
          this.onUpdate(this.users[0].id);
        },
        preventDefault: true
      },
      {
        key: "ctrl + 2",
        command: (output: ShortcutEventOutput) => {
          //console.log(output);
          this.onUpdate(this.users[1].id);
        },
        preventDefault: true
      },
      {
        key: "ctrl + 3",
        command: (output: ShortcutEventOutput) => {
          //console.log(output);
          this.onUpdate(this.users[2].id);
        },
        preventDefault: true
      },
      {
        key: "ctrl + 4",
        command: (output: ShortcutEventOutput) => {
          //console.log(output);
          this.onUpdate(this.users[3].id);
        },
        preventDefault: true
      },
      {
        key: "ctrl + 5",
        command: (output: ShortcutEventOutput) => {
          //console.log(output);
          this.onUpdate(this.users[4].id);
        },
        preventDefault: true
      },
      {
        key: "cmd + shift + 1",
        command: (output: ShortcutEventOutput) => {
          //console.log(output);
          this.shortcutService.keyboardkey.set("ctrl + shift + 1");
        },
        preventDefault: true
      },
      {
        key: "ctrl + shift + 2",
        command: (output: ShortcutEventOutput) => {
          //console.log(output);
          this.shortcutService.keyboardkey.set("ctrl + shift + 2");
        },
        preventDefault: true
      },
      {
        key: "ctrl + shift + 3",
        command: (output: ShortcutEventOutput) => {
          //console.log(output);
          this.shortcutService.keyboardkey.set("ctrl + shift + 3");
        },
        preventDefault: true
      },
      {
        key: "ctrl + shift + 4",
        command: (output: ShortcutEventOutput) => {
          //console.log(output);
          this.shortcutService.keyboardkey.set("ctrl + shift + 4");
        },
        preventDefault: true
      },
      {
        key: "ctrl + shift + 5",
        command: (output: ShortcutEventOutput) => {
          //console.log(output);
          this.shortcutService.keyboardkey.set("ctrl + shift + 5");
        },
        preventDefault: true
      },
    );

  }

}
