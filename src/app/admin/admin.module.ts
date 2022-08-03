import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from "./admin-routing.module";
import { TranslateModule } from '@ngx-translate/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import { UiSwitchModule } from 'ngx-ui-switch';

import { DashboardAdminComponent } from "./dashboard-admin/dashboard-admin.component";
import { PromsComponent } from './proms/proms.component';
import { CommunityComponent } from './community/community.component';
import { SeizuresComponent } from './seizures/seizures.component';
import { DrugsComponent } from './drugs/drugs.component';
import { FeelsComponent } from './feels/feels.component';
import { SymptomsComponent } from './symptoms/symptoms.component';
import { DataManagementComponent } from './datamanagement/datamanagement.component';


import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        NgbModule,
        MatchHeightModule,
        TranslateModule,
        FormsModule,
        UiSwitchModule,
        NgxDatatableModule
    ],
    exports: [TranslateModule],
    declarations: [
        DashboardAdminComponent,
        PromsComponent,
        CommunityComponent,
        SeizuresComponent,
        DrugsComponent,
        FeelsComponent,
        SymptomsComponent,
        DataManagementComponent
    ],
    providers: [],
})
export class AdminModule { }
