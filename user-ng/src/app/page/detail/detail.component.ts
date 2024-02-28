import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { User } from 'src/app/gen';
import { UserService } from '../../gen/api/user.service';
import { filter } from 'rxjs';
import { ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShortcutService } from '../../common/shortcut.service';

@Component({
  selector: 'paradise-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  user: User = {
    id: -1,
    firstname: '',
    lastname: '',
    fullname: '',
    status: '0',
    job: 'ISMERETLEN',
    lastUpdatedOn: ''
  };

  detailForm: FormGroup = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
    lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
    address: ['', Validators.maxLength(128)],
    telephone: ['', Validators.maxLength(128)],
    status: ['', Validators.required],
    job: ['', [Validators.required,]],
  });

  jobs: typeof User.JobEnum = User.JobEnum;

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private shortcutService: ShortcutService,
    private fb: FormBuilder) {
    //console.log('detail');
  }
  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(paramMap => {

      var userid = paramMap.get('id');
      console.log("userid:" + userid);

      if (userid === null || '' === userid || 'new' === userid || Number(userid) < 0) {
        //create
        this.user = {
          id: -1,
          firstname: '',
          lastname: '',
          fullname: '',
          status: '0',
          job: 'ISMERETLEN',
          lastUpdatedOn: ''
        };
        this.fillForm(this.user);
      } else {
        //modify
        this.userService.readUser(Number(userid)).subscribe(u => {
          this.user = u;
          this.fillForm(u);
        });
      }


    });




    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      //TODO
      const firstInputElement = document.querySelector('#firstname')
      if (firstInputElement) {
        (firstInputElement as HTMLElement).focus();
      }
    });
  }

  fillForm(u: User): void {

    this.detailForm.controls['firstname'].setValue(u.firstname);
    this.detailForm.controls['lastname'].setValue(u.lastname);
    this.detailForm.controls['address'].setValue(u.address);
    this.detailForm.controls['telephone'].setValue(u.telephone);
    this.detailForm.controls['status'].setValue(u.status === '0');
    this.detailForm.controls['job'].setValue(u.job);

  }

  isNew(): boolean {
    return this.user.id === -1
  }

  onSave(form: FormGroup): void {
    this.detailForm.markAllAsTouched();  // calling mark as touch every time.
    if (form.invalid) {
      console.log('detailform is invalid -> do nothing');
      return;
    }

    this.user.firstname = this.detailForm.controls['firstname'].value;
    this.user.lastname = this.detailForm.controls['lastname'].value;
    this.user.address = this.detailForm.controls['address'].value;
    this.user.telephone = this.detailForm.controls['telephone'].value;
    this.user.job = this.detailForm.controls['job'].value;


    if (this.isNew()) {
      //create

      //active
      this.user.status = '0';

      this.userService.createUser(this.user).subscribe(u => {
        this.user = u;
        alert("A user sikeresen létejött.");
      });
    } else {
      //modify

      if (this.detailForm.controls['status'].value) {
        //active
        this.user.status = '0';
      } else {
        this.user.status = '1';
      }

      this.userService.updateUser(this.user.id, this.user).subscribe(u => {
        this.user = u;
        alert("Az adatokat sikeresen lementettük.");
      });
    }
    this.router.navigate(['/overview']);
  }

  onCancel(): void {
    this.router.navigate(['/overview']);
  }

  onDelete(confirmed: boolean): void {
    if (confirmed) {
      this.router.navigate(['/overview']);
    }
  }

  shortcuts: ShortcutInput[] = [];

  ngAfterViewInit(): void {
    this.shortcuts.push(
      {
        key: "f2",
        command: (output: ShortcutEventOutput) => {
          //console.log(output);
          this.onSave(this.detailForm);
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
      {
        key: "f8",
        command: (output: ShortcutEventOutput) => {
          console.log("this.shortcutService.keyboardkey.set(\"f8\")");
          this.shortcutService.keyboardkey.set("f8");
        },
        preventDefault: true
      },
    );

  }
}
