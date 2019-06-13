import {Component, OnInit} from '@angular/core';
import {ValidationService} from '../../_shared/validation.service';

@Component({
  selector: 'app-bookupload',
  templateUrl: './bookupload.component.html',
  styleUrls: ['./bookupload.component.css']
})
export class BookUploadComponent {
  fileError = true;
  validationErrors: string[];
  fileUploadQueue: any;

  constructor(private _validationService: ValidationService) {
  }

  onSubmit() {
    console.log('On submit');
  }

  onDownload() {
    console.log('On Download');
  }


  upload($event: any) {

    const validate = this._validationService.fileValidation($event.target.files[0]);

    if (!validate.isValid) {
      this.fileError = true;
      this.validationErrors = validate.Errors;
    } else {
      this.fileError = false;
    }
    console.log('valid Status:', validate);
  }
}


