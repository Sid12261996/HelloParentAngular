export class BookTransaction {
    id:number;
    studentId: string
    bookId: string
    issueDate: Date
    returnDate?: Date
    isReturned: boolean
    createdAt: Date
    updatedAt?: Date
    deletedAt?: Date
}