import { Component, EventEmitter, Input, OnInit, Output, effect } from '@angular/core';
import { ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { UserService } from '../../gen/api/user.service';
import { ShortcutService } from '../shortcut.service';

@Component({
  selector: 'paradise-deletebutton',
  templateUrl: './deletebutton.component.html',
  styleUrls: ['./deletebutton.component.scss']
})
export class DeletebuttonComponent implements OnInit {

  @Input({ required: true }) id!: number;

  @Input() fullname: string = '' + this.id;

  @Input({ required: true }) keyboardkey!: string;


  @Output('isConfirmed') isConfirmed = new EventEmitter<boolean>();

  constructor(
    private userService: UserService,
    private shortcutService: ShortcutService,
  ) {
    console.log("this.keyboardkey:" + this.keyboardkey);

    effect(() => {
      const keySignal = shortcutService.keyboardkey();
      console.log("keySignal:" + keySignal);
      if(this.keyboardkey===keySignal){
        this.onClickButton();
      }
    });

  }

  ngOnInit(): void {

  }

  onClickButton() {
    this.shortcutService.reset();
    const confirmed = confirm("Biztosan törölni akarja a '" + this.fullname + ' usert?');

    if (confirmed) {
      this.userService.deleteUser(this.id).subscribe(() => {
        //console.log("user deleted");
        this.isConfirmed.emit(confirmed);
      });
    } else {
      this.isConfirmed.emit(confirmed);
    }

  }
}
