import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { UserService } from '../../gen/api/user.service';

@Component({
  selector: 'paradise-deletebutton',
  templateUrl: './deletebutton.component.html',
  styleUrls: ['./deletebutton.component.scss']
})
export class DeletebuttonComponent implements OnInit {

  @Input({ required: true }) id!: number;

  @Input() fullname: string = '' + this.id;

  @Output('isConfirmed') isConfirmed = new EventEmitter<boolean>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }

  onClickButton() {
    const confirmed = confirm("Biztosan törölni akarja a '" + this.fullname + ' usert?');

    if(confirmed){
      this.userService.deleteUser(this.id).subscribe(() => {
        //console.log("user deleted");
        this.isConfirmed.emit(confirmed);
      });
    }else{
      this.isConfirmed.emit(confirmed);
    }

  }

  shortcuts: ShortcutInput[] = [];

  ngAfterViewInit(): void {
    this.shortcuts.push(
      {
        key: "f8",
        command: (output: ShortcutEventOutput) => {
          //console.log(output);
            this.onClickButton();

        },
        preventDefault: true
      },
      {
        key: "shift+ctrl+"+ this.id%5,
        command: (output: ShortcutEventOutput) => {
          //console.log(output);
            this.onClickButton();

        },
        preventDefault: true
      },
    );

  }
}
