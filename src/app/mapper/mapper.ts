import {Book} from '../model/book';
import {BookViews} from '../views/bookViews';

export class Mapper {
  public MapBookToBookView(books: Book[]): BookViews[] {
    let bookViews: BookViews[] = [];
    books.forEach(element => {
      let bookView = new BookViews();
      bookView.id = element.id;
      bookView.keywords = element.keywords;
      bookView.orderedDate = element.orderDate;
      bookView.bookName = element.name;
      bookView.authorName = element.authorName;
      bookView.publisherName = element.publisherName;
      bookView.category = element.category;
      bookView.cost = element.cost;
      bookView.selfRackPosition = element.shelfRackPosition;
      bookView.vendorName = element.vendorName;
      bookView.yearOfPublication = element.yearOfPublication;
      bookView.subject = element.subject;
      bookView.purchaseDate = element.purchaseDate;
      bookView.ISBNNo = element.isbnNo;
      bookView.DDC = element.ddc;
      bookView.pages = element.pages;
      bookView.remarks = element.remarks;
      bookView.status = element.status;
      bookViews.push(bookView);
    });

    return bookViews;
  }
}
