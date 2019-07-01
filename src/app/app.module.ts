import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatChipsModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatIconModule,
  MatMenuModule,
  MatDividerModule, MatBadgeModule, MatListModule, MatSortModule, MatAutocompleteModule

} from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BookComponent} from './books/book/book.component';
import {BooksComponent} from './books/books/books.component';
import {BookissueComponent} from './bookissue/bookissue.component';

import {ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './_shared/header/header.component';
import {RouterModule, Routes} from '@angular/router';
import {BookreturnComponent} from './bookreturn/bookreturn.component';
import {HttpClientModule} from '@angular/common/http';
import {TableComponent} from './table/table.component';
import {BookUploadComponent} from './uploads/book/bookupload.component';
import {ApproveFeesComponent} from './fees/approvefees/approvefees.component';
import {ApproveFeeComponent} from './fees/approvefee/approvefee.component'
import {ToastrModule} from 'ngx-toastr';

const routes: Routes = [
  {path: '', component: BooksComponent},
  {path: 'book', component: BookComponent},
  {path: 'issue', component: BookissueComponent},
  {path: 'return', component: BookreturnComponent},
  {path: 'table', component: TableComponent},
  {path: 'bulkupload', component: BookUploadComponent},
  {path: 'fees/apporvefees', component: ApproveFeesComponent},
  {path: 'fees/apporvefee', component: ApproveFeeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BooksComponent,
    BookissueComponent,
    BookreturnComponent,
    HeaderComponent,
    TableComponent,
    BookUploadComponent,
    ApproveFeesComponent,
    ApproveFeeComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatMenuModule, MatDividerModule,
    MatSelectModule, MatTableModule, MatChipsModule, MatPaginatorModule, MatSidenavModule, MatNativeDateModule, MatBadgeModule,
    MatDatepickerModule, MatSnackBarModule, HttpClientModule, MatListModule, MatSortModule
    , ToastrModule.forRoot(), MatAutocompleteModule,Ng2SearchPipeModule
  ],
  providers: [MatNativeDateModule, MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule {
}
