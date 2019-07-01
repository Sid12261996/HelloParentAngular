import {Component, OnInit} from '@angular/core';
import {StudentView} from '../views/studentview';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category, Status} from '../enum/enum';
import {MatTableDataSource} from '@angular/material';
import {BookViews} from '../views/bookViews';
import {MatSnackBar} from '@angular/material/snack-bar';
import {StudentService} from '../services/student.service';
import {MapperService} from '../mapper/mapper.service';
import {BookService} from '../services/book.service';
import {ToastrService} from 'ngx-toastr';

import {Observable} from 'rxjs';
import {Student} from '../model/student';
import {map, startWith} from 'rxjs/operators';

import {BookTransactionService} from '../services/book-transaction.service';
import {BookTransaction} from '../model/booktransaction';


@Component({
  selector: 'app-bookissue',
  templateUrl: './bookissue.component.html',
  styleUrls: ['./bookissue.component.css']
})
export class BookissueComponent implements OnInit {
  category: string = null;
  containerView: BookViews[] = [];
  bookView: BookViews[] = [];
  studentView: StudentView[];
  books: BookViews[];
  disableStudentButton = true;


  constructor(private  toastr: ToastrService, private  fB: FormBuilder, private  snackBar: MatSnackBar, private studentService: StudentService, private mapperService: MapperService, private booksService: BookService,
              private bookTransactionService: BookTransactionService) {

  }


  public BOOK_ISSUE_LIMIT = 3;

  formControl: FormGroup;

  dataSource = new MatTableDataSource<BookViews>();

  // these are the columns of the dataTable
  displayedColumns: string[] = ['category', 'name', 'authorName', 'publisherName', 'action'];

  categoryOnDropdown = Category;

// Category is being converted to key value pair for iterating at the frontEnd
  keys = Object.keys(this.categoryOnDropdown);
  // For activating the loader accordingly
  isLoading = false;
  filteredOptions: Observable<StudentView[]>;

  displayFn(stud?: Student): string | undefined {
    // console.log('displayFn', stud.name);
    return stud ? stud.name : undefined;
  }


  ngOnInit() {
    this.formControl = this.fB.group({
      Student: ['', Validators.required],
      Category: null,
      Item: null
    });

    this.isLoading = true;
    this.studentService.getStudentsBySchool('56e45c3af289df1048faced3').subscribe(students => {
      this.studentView = this.mapperService.mapStudentToStudentView(students);
      this.filteredOptions = this.formControl.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? this._filter(value) : this._filter(value.Student)),
          // map(name => name ? this._filter(name) : this.studentView.slice())
          // map(value => this._filter(value))
        );
      this.isLoading = false;
    });

    this.booksService.getBooks().subscribe(books => {
      this.books = this.mapperService.mapBookToBookView(books);
      // console.log(this.books);
    });


  }

  public onCategoryChange(): void {
    // console.log(this.formControl.value.Student, 'I am called');
    const cat = Object.getOwnPropertyNames(Category);
    // console.log(cat);

    this.bookView = this.books.filter(x => cat[x.category] == this.formControl.value.Category);

  }


  public onAddToContainer(): void {
    // const studentName = this.formControl.get('Student').value.name;
    // console.log(studentName);

    if (this.formControl.value.Item !== '' && this.formControl.value.Student !== '') {
      const singleContainerView = this.books.find(x => x.id === this.formControl.value.Item);
      if (!this.containerView.includes(singleContainerView)) {
        this.containerView.push(singleContainerView);
        this.dataSource.data = this.containerView;
        this.toastr.success('Added to container');
      } else {
        this.toastr.error('You have already added this element in the container', 'Oh no Same elements',
        );
      }
    }
    this.clearFormGroup();
    this.bookView = [];
  }

  private clearFormGroup(all = false, name?: string) {
    if (all) {
      this.formControl.get('Student').enable();
      this.formControl.setValue({
        Student: null,
        Category: null,
        Item: null
      });
    } else {
      this.formControl.get('Student').disable();
      this.formControl.patchValue({
        //  Student: [{value: name, disabled: true}],
        Category: null,
        Item: null
      });
    }
  }

  // getOwnPropertyNames() return an array of keys present at the Category(Enum)
  public getCategoryEnumAsText(index: number): string {
    const catNames = Object.getOwnPropertyNames(Category);
    const correctIndex = catNames[index];
    return Category[correctIndex];
  }

  public onRemoveFromContainer(elem: BookViews): void {

    const index = this.containerView.indexOf(elem);
    this.containerView.splice(index, 1);

    this.dataSource.data = this.containerView;
    this.toastr.success('Removed the item from container');
    // this.openSnackBar('Remove item from list successfull', '');

  }

  // openSnackBar(message: string, action: string) {
  //   this.snackBar.open(message, action, {
  //     verticalPosition: 'top', horizontalPosition: 'end',
  //     duration: 2000,
  //   });
  // }

  public onIssue(): void {

    const books: BookTransaction[] = [];
    const bookToIssue = new BookTransaction();

    this.containerView.forEach(element => {
      bookToIssue.bookId = element.id;
      bookToIssue.studentId = this.formControl.get('Student').value.id;
      books.push(bookToIssue);
    });

    this.bookTransactionService.issueBook(books).subscribe(data => {
        if (data) {
          const length = this.containerView.length;
          this.containerView = [];
          this.dataSource.data = this.containerView;
          this.toastr.success(`Issued ${length} book(s) to ${this.formControl.get('Student').value.name}`);
          this.clearFormGroup(true);
        }
      },
      error => {

        this.toastr.error(`Error: ${error.message}`, 'Failed');
      }
    );
    // const length = this.containerView.length;
    // this.containerView = [];
    // this.dataSource.data = this.containerView;

    // this.toastr.success(`Issued ${length} book(s) to ${this.formControl.value.Student}`)
    // this.clearFormGroup(true);

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
}


