import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BookViews} from '../views/bookViews';
import {Book} from '../model/book';
import {apiUrl} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {StudentView} from '../views/studentview';
import {Student} from '../model/student';
import { BookIssuedView } from '../views/booksissuedview';
import { element } from '@angular/core/src/render3';
import { BookTransaction } from '../model/booktransaction';
import { BookIssue } from '../model/bookissue';

@Injectable({
  providedIn: 'root'
})
export class MapperService {


  constructor(private http: HttpClient) {
  }


  mapBookToBookView(books: Book[]): BookViews[] {
    let bookViews: BookViews[] = [];
    books.forEach(element => {
      let bookView = new BookViews();
      bookView.id = element.id;
      bookView.keywords = element.keywords;
      bookView.orderedDate = element.orderDate;
      bookView.bookName = element.name;
      bookView.authorName = element.authorName;
      bookView.publisherName = element.publisherName;
      bookView.category = element.category;
      bookView.cost = element.cost;
      bookView.selfRackPosition = element.shelfRackPosition;
      bookView.vendorName = element.vendorName;
      bookView.yearOfPublication = element.yearOfPublication;
      bookView.subject = element.subject;
      bookView.purchaseDate = element.purchaseDate;
      bookView.ISBNNo = element.isbnNo;
      bookView.DDC = element.ddc;
      bookView.pages = element.pages;
      bookView.remarks = element.remarks;
      bookView.status = element.status;
      bookView.issuedTo = element.issuedTo;
      bookView.issuedOn = element.issuedOn;
      bookViews.push(bookView);

    });
    return bookViews;
  }

  mapTxnBookToIssueBookView(bookTransaction:BookIssue[]):BookIssuedView[]
  {
    let txnBookView:BookIssuedView[]=[];
    bookTransaction.forEach(element=>{
        let bookIssueView = new BookIssuedView();
        bookIssueView.id=element.id;
        bookIssueView.studentId=element.studentId;
        bookIssueView.bookId=element.bookId;
        bookIssueView.bookName=element.name;
        bookIssueView.category=element.category;
        bookIssueView.author=element.authorName;
        bookIssueView.publisher=element.publisherName;
        bookIssueView.issuedDate = element.issueDate;
        txnBookView.push(bookIssueView);
    });
    return txnBookView;
  }


  mapStudentToStudentView(students: Student[]): StudentView[] {
    let studentViews: StudentView[] = [];
    students.forEach(element => {
      let studentView = new StudentView();
      studentView.id = element.id;
      studentView.admissionId = element.identifier;
      studentView.name = element.name;
      studentView.father = element.fatherName;
      studentView.mother = element.motherName;
      studentViews.push(studentView);
    });
    return studentViews;
  }



}
