import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaimService } from './shared/services/claim.service';

@Component({
    selector: 'app-claim',
    templateUrl: './claim.page.html',
    styleUrls: ['./claim.page.scss']
})
export class ClaimPage {

    public message: string;
    public id: number;

    constructor(
        public modalController: ModalController,
        public claimService: ClaimService,
        public route: ActivatedRoute,
        public router: Router) {
    }

    ionViewWillEnter() {
        this.id = this.route.snapshot.queryParams['user_id'];
    }

    send() {
        let obj = {
            id: this.id,
            text: this.message
        };
        if (this.message != null && this.message.length != 0) {
            this.claimService.claim(obj).subscribe(res => {
                if (res['status']) {
                    this.back();
                }
            });
        }
    }

    back() {
        this.router.navigate(['/app/tabs/menu']);
    }


}