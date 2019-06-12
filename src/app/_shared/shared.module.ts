import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from './shared.material';
/// Component ///
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [CommonModule, FormsModule, SharedMaterialModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class SharedModule { }
