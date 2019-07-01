import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {IssueBookView} from '../views/issuebookview';
import {StudentView} from '../views/studentview';
import {StudentService} from '../services/student.service';
import {MapperService} from '../mapper/mapper.service';
import {map, startWith} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {Student} from '../model/student';
import {BookTransactionService} from '../services/book-transaction.service';
import {BookIssuedView} from '../views/booksissuedview';
import {Category} from '../enum/enum';
import {BookTransaction} from '../model/booktransaction';
import {element} from '@angular/core/src/render3';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-bookreturn',
  templateUrl: './bookreturn.component.html',
  styleUrls: ['./bookreturn.component.css']
})
export class BookreturnComponent implements OnInit {

  mainDataSource: BookIssuedView[] = [];
  toReturnBooks: BookIssuedView[] = [];
  // filterDatSource: IssueBookView[] = issuedBooks;
  issuedBooks: BookIssuedView[] = [];
  filterDatSource: BookIssuedView[] = [];
  displayedColumns: string[] = ['select', 'id', 'category', 'name', 'authorName', 'publisherName', 'dateOfissue'];
  dataSource = new MatTableDataSource<BookIssuedView>(this.filterDatSource);
  selection = new SelectionModel<BookIssuedView>(true, []);
  studentId: string;
  isLoading = false;
  studentView: StudentView[];
  Student: FormControl;
  private filteredOptions: Observable<StudentView[]>;

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  constructor(private  toastr: ToastrService, private  studentService: StudentService, private mapperService: MapperService, private bookTransactionService: BookTransactionService) {
  }


  displayFn(stud?: Student): string | undefined {
    // console.log('displayFn', stud.name);
    return stud ? stud.name : undefined;
  }

  ngOnInit(): void {
    this.Student = new FormControl('');
    this.isLoading = true;
    this.studentService.getStudentsBySchool('56e45c3af289df1048faced3').subscribe(students => {
      this.studentView = this.mapperService.mapStudentToStudentView(students);
      this.filteredOptions = this.Student.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? this._filter(value) : this._filter(value.Student)),
          // map(name => name ? this._filter(name) : this.studentView.slice())
          // map(value => this._filter(value))
        );
      this.isLoading = false;
    });

  }

  private _filter(name: any): StudentView[] {
    // console.log(this.filteredOptions, name);
    if (name !== undefined && name !== null) {
      // console.log(name, typeof name);
      const filterValue = typeof name == 'object' ? name.name : name.toLowerCase();
      // console.log(this.studentView.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0));
      return this.studentView.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }


  onOptionsSelected(event) {
    this.studentId = event.target.value;
  }

  isAll($event) {
    if ($event.checked) {
      this.mainDataSource.forEach((ele) => {
        ele.isChecked = true;
        this.toReturnBooks.push(ele);
      });
    } else {
      this.mainDataSource.forEach((ele) => {
        ele.isChecked = false;
        this.toReturnBooks = [];
      });
    }
  }

  loadData() {

  }

  searchByStudent() {
    this.bookTransactionService.getIssuedBooks(this.Student.value.id).subscribe(data => {
        if (data != null) {
          console.log(data);
          var viewData = this.mapperService.mapTxnBookToIssueBookView(data);
          console.log(viewData);
          this.mainDataSource = viewData;
          this.filterDatSource = viewData;
          this.dataSource.data = this.filterDatSource;

        }
      },
      (error) => {

      }
    );


    // var dataSource: IssueBookView[] = Object.assign(this.mainDataSource);

    // if (this.studentId == '' || this.studentId == undefined) {
    //   this.dataSource.data = [];
    // } else {
    //   dataSource = this.loadData();
    //   dataSource = dataSource.filter(x => x.studentId == this.studentId);
    //   this.filterDatSource = dataSource;
    //   this.dataSource.data = this.filterDatSource;
    // }
  }

  private selectRow($event, row) {
    if ($event.checked) {
      row.isChecked = true;
    }
    if (!$event.checked) {
      row.isChecked = false;
    }
  }

  returnBook() {
    this.toReturnBooks = this.dataSource.data.filter(x => x.isChecked);
    console.log(this.toReturnBooks);

    var returnBooksArray: BookTransaction[] = [];
    var returnBook = new BookTransaction();
    this.toReturnBooks.forEach(element => {
      returnBook.id = element.id;
      returnBook.bookId = element.bookId;
      returnBooksArray.push(returnBook);
    });

    this.bookTransactionService.returnBook(returnBooksArray).subscribe(data => {
        if (data) {
          const len = this.toReturnBooks.filter(x => x.isChecked);
          var length = len.length;
          this.searchByStudent();
          this.toastr.success(`${this.Student.value.name} has returned ${length} book(s) back`);
        } else {
          this.toastr.success(`Error failed`);
        }
      },
      (eror) => {
        this.toastr.success(`Error failed`);
      });

  }


  public getCategoryEnumText(cat: number): string {
    const category = Object.getOwnPropertyNames(Category);
    return category[cat];
  }
}

const issuedBooks: BookIssuedView[] = [];
