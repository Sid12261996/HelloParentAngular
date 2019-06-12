import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';

import {BookFilter} from 'src/app/views/filters/bookfilter';
import {BookViews} from 'src/app/views/bookViews';
import {Category, Status} from 'src/app/enum/enum';



import { BookService } from 'src/app/services/book.service';
import { MapperService } from 'src/app/mapper/mapper.service';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit {
  selectedBook:BookViews;
  mainDataSource: BookViews[] = [];
  filterDatSource: BookViews[] = [];
  filter: BookFilter = new BookFilter();
  displayedColumns: string[] = ['category', 'bookName', 'authorName', 'publisherName', 'shelfRackPostion',  'status'];
  dataSource = new MatTableDataSource<BookViews>(this.filterDatSource);
  @ViewChild(MatSort) sort: MatSort;


  constructor(public _bookService:BookService,private mapService: MapperService){}

  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit() {
    this.dataSource.paginator = this.paginator;
     this.getBooks();   
     this.selectedBook=new BookViews();
     this.selectedBook.issuedOn=new Date();
    this.selectedBook.issuedTo="";  
    this.dataSource.sort = this.sort;
  }

  getBooks(){   
    this._bookService.getBooks('5515343fea3434f').subscribe(data => {
      // var viewData = mapper.MapBookToBookView(data);
      var viewData = this.mapService.mapBookToBookView(data);
        console.log(viewData);
         this.mainDataSource = viewData;
         this.filterDatSource=viewData;
         this.dataSource.data=this.mainDataSource;
         console.log(this.dataSource.data);
    },
    error=>{

    });
    }
  
  public getCategoryEnumText(cat: number): string {
    const category = Object.getOwnPropertyNames(Category);
    return category[cat];
  }

  public getStatusEnumText(status: Status): string {
    return Status[status];
  }

  onSearchBooks() {
    
    let dataSource: BookViews[] = Object.assign(this.mainDataSource);
    if (this.filter.status != null) {
      dataSource = dataSource.filter(x => x.status == this.filter.status);
    }
    if (this.filter.category != null) {
      dataSource = dataSource.filter(x => x.category == this.filter.category);
    }
    if (this.filter.bookName != null && this.filter.bookName.length > 0) {
      dataSource = dataSource.filter(x => x.bookName.toLocaleLowerCase().trim().includes(this.filter.bookName.toLocaleLowerCase().trim()));
    }
    if (this.filter.authorName != null && this.filter.authorName.length > 0) {
      dataSource = dataSource.filter(x => x.authorName.toLocaleLowerCase().includes(this.filter.authorName.toLocaleLowerCase()));
    }
    this.filterDatSource = dataSource;
    console.log(dataSource);
    this.dataSource.data = this.filterDatSource;

  }

  onClear(): void {
    this.filter = new BookFilter();
    this.onSearchBooks();
  }
  openMenu(book:BookViews): void {
    //this.clickHoverMenuTrigger.openMenu();
    this.selectedBook=book;
  }
}
