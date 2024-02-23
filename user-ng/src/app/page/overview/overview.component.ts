import { Component, OnInit } from '@angular/core';
import { User, UserService } from 'src/app/gen';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log("component has been initialized!")
    this.getUsers();
  }

  getUsers(): void {
    this.userService.apiUsersGet()
    .subscribe(users => this.users = users);
  }
}
