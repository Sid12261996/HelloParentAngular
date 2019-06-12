export class BookTransaction {
    studentId: string
    schoolId: string
    bookId: string
    dateOfIssue: Date
    issuedBy: string
    dateOfReturn?: Date
    returnBy?: string
    remarks: string
}