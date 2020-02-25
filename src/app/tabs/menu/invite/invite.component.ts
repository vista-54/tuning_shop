import { Validators } from '@angular/forms';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { InviteService } from './shared/services/invite.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
})
export class InviteComponent {

  private invite: FormGroup;

  constructor(
    private _invite: InviteService,
    fb: FormBuilder) {
    this.invite = fb.group({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  inviteForm() {
    this._invite.setInvite(this.invite.value).subscribe(res => {
      if (res['status']) {
        this.invite.reset();
      }
    });
  }
}
