import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Book} from '../../model/book';
import {MapperService} from '../../mapper/mapper.service';
import {BookService} from '../../services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(private  fB: FormBuilder, private bookService: BookService) {
  }

  BookForm: FormGroup;
  buttondisabled = true;
  booksToPost: Book[];

  ngOnInit() {
    this.BookForm = this.fB.group({
      category: [''],
      name: [''],
      authorName: [''],
      publisherName: [''],
      pages: [''],
      createdDate: ['', Validators.required],
      orderDate: [''],
      remarks: ['', Validators.required],
      cost: ['', Validators.required],
      shelfRackPosition: ['', Validators.required],
      vendorName: ['', Validators.required],
      yearOfPublication: [''],
      subject: ['', Validators.required],
      purchaseDate: [''],
      isbnNo: ['', Validators.required],
      ddc: ['', Validators.required],
      keywords: ['', Validators.required],
      accessionNo: ['', Validators.required],
      quantity: ['1', Validators.required]
    });
  }

  Save() {
    this.bookService.addBook(this.BookForm.value, this.BookForm.value.quantity).subscribe(data => {
      console.log(data);
    });
    console.log(this.booksToPost);
  }

  GenerateUniqueCode() {
    let text = '';
    const length = 15;
    const possible = 'ABwertgvvdrc421DGRvdhgmieHTRZxeGr354762320kgmsFTTTgcs#5313g85nf7d58jns8e49fj59t594mrr43XZegi4fC';


    for (let i = 0; i < length; i++) {

      text += possible.charAt(Math.floor(Math.random() * possible.length));

    }
    this.BookForm.patchValue({

      accessionNo: text
    });
  }

  Reset() {
    this.BookForm.setValue({
      category: '',
      BookName: '',
      AuthorName: '',
      PublisherName: '',
      pages: '',
      createdDate: '',
      orderedDate: '',
      remarks: '',
      cost: '',
      selfRackPosition: '',
      vendorName: '',
      yearOfPublication: '',
      subject: '',
      purchaseDate: '',
      ISBNNo: '',
      DDC: '',
      keywords: '',
      accessionNo: '',
      quantity: '1'
    });
  }

}
