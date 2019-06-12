import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  
  constructor(private  fB: FormBuilder,public _bookService:BookService) {
  }

  BookForm: FormGroup;
  buttondisabled = true;

  ngOnInit() {
    this.BookForm = this.fB.group({
      category: [''],
      BookName: [''],
      AuthorName: [''],
      PublisherName: [''],
      pages: [''],
      status: ['', Validators.required],
      createdDate: ['', Validators.required],
      orderedDate: [''],
      remarks: ['', Validators.required],
      cost: ['', Validators.required],
      selfRackPosition: ['', Validators.required],
      vendorName: ['', Validators.required],
      yearOfPublication: [''],
      subject: ['', Validators.required],
      purchaseDate: [''],
      ISBNNo: ['', Validators.required],
      DDC: ['', Validators.required],
      keywords: ['', Validators.required],
      accessionNo: ['', Validators.required],
      quantity: [1, Validators.required]
    });
  }

  Save() {
    this._bookService.addBook(this.BookForm.value, this.BookForm.value.quantity).subscribe(data => {
      console.log(data);
    });
  }

  GenerateUniqueCode() {
    let text = '';
    const length = 10;
    const possible = 'ABwertgvvdrc44fC';

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
      status: '',
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
      quantity:1,
    });
  }
}
