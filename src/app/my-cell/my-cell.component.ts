import { Component, OnInit } from '@angular/core';
import { ICellEditorAngularComp, ICellRendererAngularComp } from 'ag-grid-angular';
import { AgPromise, ICellEditorComp, ICellEditorParams, ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-my-cell',
  template: `
      <img src={{value}} class="img" style="width: 40px;">
  `,
  styles: [
  ]
})
export class MyCellComponent implements OnInit, ICellRendererAngularComp {
  value: any;

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.value = params.value;
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return false;
  }


  ngOnInit(): void {

  }




}
