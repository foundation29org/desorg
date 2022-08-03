import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RaitoService } from 'app/shared/services/raito.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-community',
    templateUrl: './community.component.html',
    styleUrls: ['./community.component.scss'],
    providers: [RaitoService]
})

export class CommunityComponent implements OnInit, OnDestroy{

  patients: any = [];
  loadedUsers: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(public translate: TranslateService, private raitoService: RaitoService){

  }

  ngOnInit() {
    this.subscription.add(this.raitoService.getOnlyPatients().subscribe(
      data => {
        this.patients = data;
        this.loadedUsers = true;
      }
    ));
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
