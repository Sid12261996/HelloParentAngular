import {Category, Status} from '../enum/enum';

export class BookViews {
  id?: string;
  accessionNo: string;
  bookName: string;
  authorName: string;
  publisherName: string;
  category: Category;
  cost: number;
  selfRackPosition: string;
  vendorName: string;
  yearOfPublication: string;
  subject: string;
  purchaseDate?: Date;
  status: Status;
  orderedDate?: Date;
  remarks: string;
  ISBNNo: string;
  DDC: string;
  keywords: string;
  pages: number;
  issuedTo:string;
  issuedOn:Date


}
