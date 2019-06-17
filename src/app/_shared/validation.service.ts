import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() {
  }

  fileValidation(file: any) {
    const validModel = {
      isValid: true,
      Errors: new Array()
    };


    if (file !== undefined && file !== null) {


      const fileType = file.name.split('.').pop();

      if (file.size >= 1024 * 1024 * 5) {
        validModel.isValid = false;
        validModel.Errors.push(`The file size should be less than 5 Mb, current size is ${Math.floor(file.size / (1024 * 1024))}Mb`);
      }
      console.log('FileType:', fileType);
      if (fileType !== 'xlsx' && fileType !== 'xls') {
        validModel.isValid = false;
        validModel.Errors.push(`File type should be xlsx or xls! Current type is "${fileType}"`);
      }

    } else {
      validModel.isValid = false;
      validModel.Errors.push(`No files uploaded`);
    }

    return validModel;
  }
}
