import {Component, OnInit} from '@angular/core';
import {StudentView} from '../views/studentview';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category, Status} from '../enum/enum';
import {MatTableDataSource} from '@angular/material';
import {BookViews} from '../views/bookViews';
import {MatSnackBar} from '@angular/material/snack-bar';
import { StudentService } from '../services/student.service';
import { MapperService } from '../mapper/mapper.service';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-bookissue',
  templateUrl: './bookissue.component.html',
  styleUrls: ['./bookissue.component.css']
})
export class BookissueComponent implements OnInit {
  category:string=null;
  containerView: BookViews[] = [];
  bookView: BookViews[] = [];
  studentView: StudentView[];
  books: BookViews[];

    
  constructor(private  fB: FormBuilder, private  snackBar: MatSnackBar,private studentService: StudentService,private mapperService:MapperService,private booksService:BookService) {
  }


  public BOOK_ISSUE_LIMIT = 3;

  formControl: FormGroup;

  dataSource = new MatTableDataSource<BookViews>();

  displayedColumns: string[] = ['category', 'name', 'authorName', 'publisherName', 'action'];

  categoryOnDropdown = Category;

  
  keys = Object.keys(this.categoryOnDropdown);


  ngOnInit() {
    this.formControl = this.fB.group({
      Student: null,
      Category: null,
      Item: null
    });


    this.studentService.getStudentsBy('56e45c3af289df1048faced3').subscribe(students => {
      this.studentView = this.mapperService.mapStudentToStudentView(students);       
  });

  this.booksService.getBooks('56e45c3af289df1048faced3').subscribe(books => {
    this.books = this.mapperService.mapBookToBookView(books);   
    // console.log(this.books);   
});

    
  }

  public onCategoryChange(): void {
    
let cat =Object.getOwnPropertyNames(Category) ;
    this.bookView = this.books.filter(x => cat[x.category] == this.formControl.value.Category);
  
  }

  public onAddToContainer(): void {

    if (this.formControl.value.Item !== '' && this.formControl.value.Student !== '') {
      const singleContainerView = this.books.find(x => x.id === this.formControl.value.Item);
      if (!this.containerView.includes(singleContainerView)) {
        this.containerView.push(singleContainerView);
        this.dataSource.data = this.containerView;
      } else {
        this.snackBar.open('Can\'t add the same elements', '', {
          duration: 5 * 1000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    }
    this.clearFormGroup();
    this.bookView = [];
  }

  private clearFormGroup(all = false) {
    if (all) {
      this.formControl.setValue({
        Student: null,
        Category: null,
        Item: null
      });
    } else {
      this.formControl.patchValue({
        Category: null,
        Item: null
      });
    }
  }

  public getCategoryEnumText(cat: Category): string {
    return Category[cat];
  }

  public onRemoveFromContainer(elem: BookViews): void {
   
    const index = this.containerView.indexOf(elem);
    this.containerView.splice(index, 1);
  
    this.dataSource.data = this.containerView;
    this.openSnackBar("Remove item from list successfull","");
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {verticalPosition: 'top', horizontalPosition: 'end',
      duration: 2000,
    });
  }
  public onIssue(): void {
    // console.log(this.containerView);
    this.containerView = [];
    this.dataSource.data = this.containerView;
    this.clearFormGroup(true);
  }
}


