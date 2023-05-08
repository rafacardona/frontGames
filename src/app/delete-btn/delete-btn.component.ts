import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { GridApi, ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-delete-btn',
  templateUrl: './delete-btn.component.html',
  styleUrls: ['./delete-btn.component.css']
})

export class DeleteBtnComponent implements OnInit, ICellRendererAngularComp {

  private params: any;
  private gridApi!: GridApi;
  //constructor(public modalActive: NgbActiveModal){}

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
  }
  refresh(): boolean {
    return false;
  }


  ngOnInit(): void {
  }

  delCell() {
    console.log(this.params);
    this.params.context.componentParent.deleteMethod(this.params.data.id);
    console.log('me han clicakdo!!');
  }

  openModal(){
  }

}
