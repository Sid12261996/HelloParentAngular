import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BookViews} from '../views/bookViews';
import {Book} from '../model/book';
import {apiUrl} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {StudentView} from '../views/studentview';
import {student} from '../model/student';

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


  mapStudentToStudentView(students: student[]): StudentView[] {
    let studentViews: StudentView[] = [];
    students.forEach(element => {
      let studentView = new StudentView();
      studentView.id = element.studentId;
      studentView.admissionId = element.identifier;
      studentView.name = element.name;
      studentView.father = element.fatherName;
      studentView.mother = element.motherName;
      studentViews.push(studentView);
    });
    return studentViews;
  }



}
