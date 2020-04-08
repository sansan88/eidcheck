import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestgridPageRoutingModule } from './testgrid-routing.module';

import { TestgridPage } from './testgrid.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestgridPageRoutingModule
  ],
  declarations: [TestgridPage]
})
export class TestgridPageModule {}
