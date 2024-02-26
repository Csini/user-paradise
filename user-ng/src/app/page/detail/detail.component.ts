import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { User } from 'src/app/gen';
import { UserService } from '../../gen/api/user.service';
import { filter } from 'rxjs';
import { ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  user: User = {
    id: -1,
    firstname: '',
    lastname: '',
    job: 'ISMERETLEN',
    lastUpdatedOn: ''
  };

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private userService: UserService) {

  }
  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(paramMap => {

      var userid = Number(paramMap.get('id'));

      if (userid === null || userid<0) {
        //create
        this.user = {
          id: -1,
          firstname: '',
          lastname: '',
          job: 'ISMERETLEN',
          lastUpdatedOn: ''
        };
      } else {
        //modify
        this.userService.readUser(userid).subscribe(u => {
          this.user = u;
        });
      }


    });


    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      //TODO
      const firstInputElement = document.querySelector('#main-content-header')
      if (firstInputElement) {
        (firstInputElement as HTMLElement).focus();
      }
    });
  }

  onSave(): void {

    var userid = this.user.id;

    if (userid === null || userid<0) {
      //create
      this.userService.createUser(this.user).subscribe(u => {
        this.user = u;
      });
    } else {
      //modify
      this.userService.updateUser(userid, this.user).subscribe(u => {
        this.user = u;
      });
    }
    this.router.navigate(['/overview']);
  }

  onCancel(): void {
    this.router.navigate(['/overview']);
  }

  shortcuts: ShortcutInput[] = [];

  ngAfterViewInit(): void {
    this.shortcuts.push(
      {
        key: "f2",
        command: (output: ShortcutEventOutput) => {
          //console.log(output);
          this.onSave();
        },
        preventDefault: true
      },
      {
        key: "f3",
        command: (output: ShortcutEventOutput) => {
          //console.log(output);
          this.onCancel();
        },
        preventDefault: true
      },
    );

  }
}
