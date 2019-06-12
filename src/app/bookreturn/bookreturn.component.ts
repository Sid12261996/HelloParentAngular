import {SelectionModel} from '@angular/cdk/collections';
import {Component} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

import {DatePipe} from '@angular/common';
import {IssueBookView} from '../views/issuebookview';


@Component({
  selector: 'app-bookreturn',
  templateUrl: './bookreturn.component.html',
  styleUrls: ['./bookreturn.component.css']
})
export class BookreturnComponent {

  mainDataSource: IssueBookView[] = issuedBooks;
  toReturnBooks: IssueBookView[] = [];
  // filterDatSource: IssueBookView[] = issuedBooks;
  issuedBooks: IssueBookView[] = [];
  filterDatSource: IssueBookView[] = issuedBooks;
  displayedColumns: string[] = ['select', 'id', 'category', 'name', 'authorName', 'publisherName', 'dateOfissue'];
  dataSource = new MatTableDataSource<IssueBookView>(this.filterDatSource);
  selection = new SelectionModel<IssueBookView>(true, []);
  studentId: string;

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
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
    const issuedBooks: IssueBookView[] = [
      {
        id: '111',
        studentId: '555aaa',
        category: 'Books',
        name: 'The Lord of the Rings',
        authorName: 'Hennie Aucamp',
        publisherName: 'Westland Publications',
        dateOfissue: new Date('2015-03-25'),
        isChecked: false
      },
      {
        id: '222',
        studentId: '123bbb',
        category: 'Novels',
        name: 'Believe in yourself',
        authorName: 'Jane Austen',
        publisherName: 'Roli Books',
        dateOfissue: new Date('2015-03-25'),
        isChecked: false
      },
      {
        id: '333',
        studentId: '111aaa',
        category: 'Journals',
        name: 'The Hite Report',
        authorName: 'Paul Auster',
        publisherName: 'Hachette India',
        dateOfissue: new Date('2015-03-25'),
        isChecked: false
      },
      {
        id: '444',
        studentId: '222aaa',
        category: 'Newspaper',
        name: 'Think and Grow Rich',
        authorName: 'Jane G. Austin',
        publisherName: 'Scholastic India',
        dateOfissue: new Date('2015-03-25'),
        isChecked: false
      },
      {
        id: '445',
        studentId: '222aaa',
        category: 'Books',
        name: 'Unlimited Power',
        authorName: 'Anthony Robbins',
        publisherName: 'Ballantine Books',
        dateOfissue: new Date('2011-03-25'),
        isChecked: false
      },
      {
        id: '555',
        studentId: '333aaa',
        category: 'Books',
        name: 'The Tale of Peter Rabbit',
        authorName: 'Mohammed Awzal',
        publisherName: 'FingerPrint Publishing',
        dateOfissue: new Date('2015-03-25'),
        isChecked: false
      }
    ];
    return issuedBooks;
  }

  searchByStudent() {
    console.log(this.studentId);

    var dataSource: IssueBookView[] = Object.assign(this.mainDataSource);

    if (this.studentId == '' || this.studentId == undefined) {
      this.dataSource.data = [];
    } else {
      dataSource = this.loadData();
      dataSource = dataSource.filter(x => x.studentId == this.studentId);
      this.filterDatSource = dataSource;
      this.dataSource.data = this.filterDatSource;
    }
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
  }
}

const issuedBooks: IssueBookView[] = [];
