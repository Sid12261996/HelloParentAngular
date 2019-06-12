import {Category} from '../enum/enum';

export class BookIssuedView {
  id: string;
  studentId:string;
  studentName:string;
  bookId: string;
  category: Category;
  bookName: string;
  issuedDate: Date;
  issuedBy: string;
}
