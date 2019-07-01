import {Category} from '../enum/enum';

export class BookIssuedView {
  id: number;
  studentId:string;
  studentName:string;
  bookId: string;
  category: Category;
  bookName: string;
  issuedDate: Date;
  issuedBy: string;
  author:string;
  publisher:string
  isChecked:boolean;

}
