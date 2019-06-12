import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-bookupload',
  templateUrl: './bookupload.component.html',
  styleUrls: ['./bookupload.component.css']
})
export class BookUploadComponent  {
  constructor() {
  }

  onSubmit() {
console.log('On submit');
  }

  onDownload() {
    console.log('On Download');
  }

  upload($event: MouseEvent) {
    console.log('On upload', $event);
  }
}


