import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
/// Service ///
import { SchoolService } from '../../services/school.service';

import { Observable } from 'rxjs';
import { Session, FeeCycle } from 'src/app/model/school';
import { SchoolClassService } from 'src/app/services/schoolclass.service';
import { SchoolClass } from 'src/app/model/schoolclass';
import {Student} from '../../model/student';
import { StudentService } from 'src/app/services/student.service';
import { CommonService } from 'src/app/services/common.service';
import { FeesService } from 'src/app/services/fees.service';
import { FeeFilterView } from 'src/app/views/filters/feeFilter';
import { FeeStudentModelView, FeeStudentModel } from 'src/app/views/feestudentmodelview';

@Component({
  selector: 'app-approvefees',
  templateUrl: './approvefees.component.html',
  styleUrls: ['./approvefees.component.css']
})
export class ApproveFeesComponent implements OnInit {
  globalSearch:string;
  mainFees:FeeStudentModelView[];
  isLoader:boolean=false;
  checked = false;
  indeterminate = false;
  activeSession:string;
  fees:FeeStudentModelView[];
  filter:FeeFilterView=new FeeFilterView();
  feeFrequency:Map<string,string>[]=[];
  feeStudent:FeeStudentModel;
  feeStatus:Map<string,string>[]=[];

  sessions:Session[]=[];
  feeCycles:FeeCycle[]=[];
  schoolClass:SchoolClass[]=[];
  student:Student[]=[];
  formControl: FormGroup;
  filteredSessionsOptions: Observable<Session[]>;
  filteredFeeCyclesOptions: Observable<FeeCycle[]>;
  filteredSchoolClassOptions: Observable<SchoolClass[]>;
  filteredStudentOptions: Observable<Student[]>;
  
  constructor(private schoolService:SchoolService, private  fB: FormBuilder,
    private schoolclassService:SchoolClassService,
    private studentService:StudentService,private commonService:CommonService,
    private feeService:FeesService) { }

  ngOnInit() {
    this.formControl = this.fB.group({
      Session: null,
      FeeCycle: null,
      SchoolClas:null,
      Student:null,
      FeeFrequency:null,
      FeeStatus:null
    });
    this.onGetSessions();
    this.getFeeFrequency();
    this.getFeeStatus();
    
  }
  public getFeeFrequency()
  {
    this.commonService.getFeeFrequency().subscribe(result => {
      this.feeFrequency=Object.assign(result);
      this.formControl.get("FeeStatus").setValue(['PendingApproval']);
     
    });
  }
  public getFeeStatus()
  {
    this.commonService.getFeeStatus().subscribe(result => {
      this.feeStatus=Object.assign(result);
     });
  }
  displayFn(choice?: any): string | undefined {
    // console.log('displayFn', stud.name);
    return choice ? choice.name : undefined;
  }
  public isAllSelected():boolean
  {
    if(this.fees!=null)
    {
     var isBool= this.fees.filter(x=>x.checked==false).length==0?true:false;
     if(isBool)
       {
       this.indeterminate=(this.fees.length==this.fees.filter(x=>x.checked==true).length)?false:true;
       }
       else
       {
         this.indeterminate=false;
       }
     return isBool;

     } else
     return false;
  }
  public onGetSessions(): void {
    
    this.schoolService.getSessions().subscribe(result => {
      
      this.sessions=Object.assign(result);
    
      this.filteredSessionsOptions = this.formControl.get("Session").valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? this._filter(value) : this._filter(value.Session)),
        // map(name => name ? this._filter(name) : this.studentView.slice())
        // map(value => this._filter(value))
      );
        this.formControl.get("Session").setValue(this.sessions.filter(x=>x.isActive==true)[0]);
        this.onSessionChange();
        this.onApplyFilter();
    });
  }
  public onSessionChange():void 
  {

   
    this.loadFeeCycles();
    this.loadSchoolClass(); 
  }
  public loadFeeCycles():void{

    this.schoolService.getFeeCyclesBySession(this.formControl.value.Session.id).subscribe(result => {
      this.feeCycles=Object.assign(result);
 
      this.filteredFeeCyclesOptions = this.formControl.get("FeeCycle").valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? this._feeCyclefilter(value) : this._feeCyclefilter(value.FeeCycle)),
        // map(name => name ? this._filter(name) : this.studentView.slice())
        // map(value => this._filter(value))
      );
    });
  }
  public loadSchoolClass():void{
    this.schoolclassService.getclassesBysession(this.formControl.value.Session.id).subscribe(result => {
      this.schoolClass=Object.assign(result);
   
      this.filteredSchoolClassOptions = this.formControl.get("SchoolClas").valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? this._feeSchoolClassfilter(value) : this._feeSchoolClassfilter(value.SchoolClas)),
        // map(name => name ? this._filter(name) : this.studentView.slice())
        // map(value => this._filter(value))
      );
    });
  }
  public onClassChange():void
  {
   
    this.loadStudents();
  }
  private loadStudents():void
  {
   
    this.studentService.getStudentsByClass(this.formControl.value.SchoolClas.id).subscribe(result => {
      this.student=Object.assign(result);
    
      this.filteredStudentOptions = this.formControl.get("Student").valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? this._feeStudentfilter(value) : this._feeStudentfilter(value.Student)),
        // map(name => name ? this._filter(name) : this.studentView.slice())
        // map(value => this._filter(value))
      );
    });
  }
  public onApplyFilter()
  {
    if(this.fees!=null)
    this.fees.length=0;
    this.isLoader=true;
     this.filter.sessionId=(this.formControl.value.Session==null)?null:this.formControl.value.Session.id;
     this.filter.classId=(this.formControl.value.SchoolClas==null)?null:this.formControl.value.SchoolClas.id;
     this.filter.feeCycleId=(this.formControl.value.FeeCycle==null)?null:this.formControl.value.FeeCycle.id;
     this.filter.studentId=(this.formControl.value.Student==null)?null:this.formControl.value.Student.id;
     this.filter.studentFeeFrequency=(this.formControl.value.FeeFrequency==null)?null:this.formControl.value.FeeFrequency;
     this.filter.feeStatus=(this.formControl.value.FeeStatus==null)?null:this.formControl.value.FeeStatus;
     this.activeSession= (this.formControl.value.Session==null)?null:this.formControl.value.Session.name;
    this.feeService.getFees(this.filter).subscribe(result => {
    this.feeStudent=result;
    console.log(this.feeStudent);
    this.mainFees=this.fees=this.feeStudent.feeStudents;
    console.log(this.mainFees);
    this.isLoader=false;
    });
  }
  public onExport()
  {
  
    console.log('sadfasdf');
  }
  public onApporveFee()
  {
    console.log('Apporve');
  }
  
  public onClick(event)
  {
 
   this.checked=event.checked;
   if(this.fees!=null)
   {
     this.fees.forEach(function(val){
        val.checked=event.checked
     });
   }
  }
  
private _filter(name: any): Session[] {

    // console.log(this.filteredOptions, name);
    if (name !== undefined && name !== null) {
      // console.log(name, typeof name);
      const filterValue = typeof name == 'object' ? name.name : name.toLowerCase();
      // console.log(this.studentView.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0));
      return this.sessions.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    }
  }
  private _feeCyclefilter(name: any): FeeCycle[] {

    // console.log(this.filteredOptions, name);
    if (name !== undefined && name !== null) {
      // console.log(name, typeof name);
      const filterValue = typeof name == 'object' ? name.name : name.toLowerCase();
      // console.log(this.studentView.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0));
      return this.feeCycles.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    }
  }
  private _feeSchoolClassfilter(name: any): SchoolClass[] {

    // console.log(this.filteredOptions, name);
    if (name !== undefined && name !== null) {
      // console.log(name, typeof name);
      const filterValue = typeof name == 'object' ? name.name : name.toLowerCase();
      // console.log(this.studentView.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0));
      return this.schoolClass.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    }
  }
  private _feeStudentfilter(name: any): Student[] {

    // console.log(this.filteredOptions, name);
    if (name !== undefined && name !== null) {
      // console.log(name, typeof name);
      const filterValue = typeof name == 'object' ? name.name : name.toLowerCase();
      // console.log(this.studentView.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0));
      return this.student.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    }
  }
}
