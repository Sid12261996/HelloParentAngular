export class Session
{
    id:string;
    name:string;
    isActive:boolean;
    createdAt:Date;
    startDate?:Date;
    endDate?:Date;
}

export class FeeCycle
{
    id:string;
    name:string;
    startDate:Date;
    endDate:Date;
    createdAt:Date;
    lastDueDate:Date;
    lateFee:number;
    sessionId:string;
}