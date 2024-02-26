import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/gen';
import { UserService } from '../../gen/api/user.service';

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

  constructor(private _Activatedroute: ActivatedRoute, private userService: UserService) {

  }
  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(paramMap => {

      var userid = paramMap.get('id');

      if (userid === null) {
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
        this.userService.readUser(Number(userid)).subscribe(u => {
          this.user = u;
        });
      }


    });
  }
}
