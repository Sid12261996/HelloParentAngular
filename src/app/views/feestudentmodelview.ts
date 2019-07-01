import { FeeStatus } from '../enum/enum';

export class FeeStudentModel
{
    maxdata:FeeStudentModelView;
    feeStudents:FeeStudentModelView[];
    feeComponentWithDictinctValueDict:Map<string,number>;
}
export class FeeStudentModelView
{
    studentId:string;
    admNumber:string;
    studentMotherName:string;
    studentClass:string;
    totalFeeForStudent:number;
    studentAllFee:FeeModel[];
    transactions:TransactionForFeeModel[];
    feeId:string;
    approvedById:string;
    cancelledById:string;
    totalPayable:number;
    totalPaid:number;
    feeStatus:string;
    feeStatusEnum:FeeStatus;
    studentName:string;

//     public FeeCycleSingleModel FeeCycle { get; set; }
    remark:string;
    createAt:Date;
    lateFee?:number;
    componetDict:Map<string,number>;
    studentFeeFrequency:string;
    feeCycleName:string;
    checked:boolean;
}

export class FeeModel
    {
        componentName:string;
        componentValue:number;
        schoolFeeComponentId:string;
        
    }
    
export class Component
{
    componetId:string;
    name:string;
    value:number;
}
export class TransactionForFeeModel
{
    constructor()
    {
        this.components=[];
    }
    transactionId:string;
    amount:number;
    components:Component[];
}
 