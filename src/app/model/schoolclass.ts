export class SchoolClass
{
    constructor()
    {
        this.classTeacherIds=new Array<string>();
        this.feeComponets=[];
        this.gradedDisciplines=[];
    }
    id:string;
    createdAt:Date;
    updatedAt?:Date;
    deletedAt?:Date
    name:string;
    session:string;
    sessionId:string;
    classTeacherIds:Array<string>;
    schoolId:string;
    feeComponets:FeeComponent[];
    deactivateDate?:Date;
    subjects:Subject[];
    gradedDisciplines:GradedDiscipline[];
}
export class FeeComponent
{
    public id:string;
    public schoolFeeComponentId:string;
    public value:number;
}

export class Subject
{
   
    constructor()
    {
     this.teacherIds=[];
    }
    id:string;
    masterSubjectId:string;
    teacherIds:string[];
    description:string;
}
export class GradedDiscipline
{
    constructor()
    {
    this.teacherIds=[];
    }
    id:string;
    masterGradedDisciplineId:string;
    teacherIds:string[];
    description:string;
}