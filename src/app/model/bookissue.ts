import { Category } from '../enum/enum';

export class BookIssue
{
    // id?:number;
    // studentId:string;
    // dateofIssue:string;
    // createdAt:Date;
    // updatedAt:Date;
    // deletedAt:Date;

    id:number;   
    studentId:string;
    bookId: string;
    issueDate:Date;
    name:string;
    authorName:string;
    publisherName:string;
    category:Category;
}