import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Book} from '../../model/book';
import {BookService} from '../../services/book.service';
import {ToastrService} from 'ngx-toastr';
import {Location} from '@angular/common';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(private  fB: FormBuilder, private bookService: BookService, private toastr: ToastrService, private loc: Location) {
  }

  BookForm: FormGroup;
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
        if (data) {
          this.toastr.success('Book Added successfully!!', 'Book(s) Added');
          this.Reset();
        }
        console.log(data);
      },
      error1 => {
        this.toastr.error(`Books couldn't be added \n check the error: ${error1}`, 'Some error Occured');
      });

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
      pages: '',
      createdDate: '',
      remarks: '',
      cost: '',
      vendorName: '',
      yearOfPublication: '',
      subject: '',
      purchaseDate: '',
      keywords: '',
      accessionNo: '',
      quantity: '1',
      name: '',
      authorName: '',
      publisherName: '',
      orderDate: null,
      shelfRackPosition: null,
      isbnNo: '',
      ddc: ''
    });
  }

}
