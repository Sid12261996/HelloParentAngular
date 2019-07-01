import {Component,OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
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
/**
 * @title Table with expandable rows
 */
@Component({
  selector: 'table-expandable-rows-example',
  styleUrls: ['./approvefee.component.css'],
  templateUrl: './approvefee.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ApproveFeeComponent implements OnInit  {
  expandedElement: PeriodicElement | null;
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
  dataSource = new MatTableDataSource<FeeStudentModelView>(this.fees);
  sessions:Session[]=[];
  feeCycles:FeeCycle[]=[];
  schoolClass:SchoolClass[]=[];
  student:Student[]=[];
  formControl: FormGroup;
  filteredSessionsOptions: Observable<Session[]>;
  filteredFeeCyclesOptions: Observable<FeeCycle[]>;
  filteredSchoolClassOptions: Observable<SchoolClass[]>;
  filteredStudentOptions: Observable<Student[]>;
  displayedColumns: string[] = ['studentName', 'motherName', 'className', 'feeCycleSession', 'feefrequence', 'status','total','latefee','totalpaid','totalpayable','action'];
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
    this.dataSource.data = this.fees;
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

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`
  }, {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`
  }, {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`
  }, {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`
  }, {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`
  }, {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`
  }, {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`
  }, {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`
  }, {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`
  },
];
