import { Status, Category } from '../enum/enum';



export class Book
{
   id:string;
   schoolId:string;
   name:string;
   authorName:string;
   publisherName:string;
   status:Status;
   orderDate :Date;
   cost:number;
   shelfRackPosition:string;
   vendorName:string;
   yearOfPublication :string;
   subject :string;
   category:Category;
   purchaseDate:Date;
   isbnNo:string;
   ddc:string;
   keywords:string;
   pages:number;
   remarks:string;
   issuedTo:string;
   issuedOn:Date
}