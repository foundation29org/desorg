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
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { ComboChartComponent2, ComboSeriesVerticalComponent2 } from './community/combo-chart';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        NgbModule,
        MatchHeightModule,
        TranslateModule,
        FormsModule,
        UiSwitchModule,
        NgxDatatableModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatSelectModule,
        NgxChartsModule,
        MatNativeDateModule
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
        DataManagementComponent,
        ComboChartComponent2,
        ComboSeriesVerticalComponent2
    ],
    providers: [],
})
export class AdminModule { }
