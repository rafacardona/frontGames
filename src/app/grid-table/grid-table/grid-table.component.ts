import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Observable, Subscription } from 'rxjs';
import { CellClickedEvent, ColDef, ColumnApi, GridReadyEvent } from 'ag-grid-community';
import { MyCellComponent } from 'src/app/my-cell/my-cell.component';
import { IFloatingFilterAngularComp, ICellRendererAngularComp } from "ag-grid-angular";
import { IFloatingFilterParams, ICellRendererParams } from "ag-grid-community";
import { FloatingFilterComponent } from 'ag-grid-community/dist/lib/components/framework/componentTypes';
import { DeleteBtnComponent } from 'src/app/delete-btn/delete-btn.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/modal/modal.component';



@Component({
  selector: 'app-grid-table',
  templateUrl: './grid-table.component.html',
  styleUrls: ['./grid-table.component.css']
})
export class GridTableComponent implements OnInit {

  public columnDefs: ColDef[];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
  }

  public context: any;
  public results: any[] = [];
  public info: any[] = [];

  //variable es de tipo Observable y espera que los elementos 
  //emitidos sean de tipo any[] (es decir, un array de cualquier tipo de datos).
  public rowData$!: Observable<any[]>;

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  url: string = "https://rickandmortyapi.com/api/character";
  sub!: Subscription;
  frameworkComponents: any;

  private gridColumnApi!: ColumnApi;
  constructor(private http: HttpClient, public modalService: NgbModal) {
    this.context = { componentParent: this }
    this.columnDefs = [

      { headerName: 'Eliminar', floatingFilter: false, cellRenderer: 'btnCellRender' },
      { headerName: 'Imagen', field: 'image', cellRenderer: 'imgCellRender', floatingFilter: false },
      { headerName: 'Nombre', field: 'name' },
      { headerName: 'identificador', field: 'id' },
      {
        headerName: 'Estado', field: 'status', cellStyle: params => {
          if (params.value === 'Alive') {
            return { color: 'green' }
          } else if (params.value === 'Dead') {
            return { color: 'red' }
          } else {
            return { color: 'gray' }
          }
        }
      },
      { headerName: 'Especie', field: 'species' },
      { headerName: 'Tipo', field: 'type' },
      { headerName: 'Sexo', field: 'gender' },
      { headerName: 'Origen', field: 'origin.name' },
      { headerName: 'Localización', field: 'location.name' },
      { headerName: 'Creado', field: 'created' },
    ];
    this.frameworkComponents = {
      'btnCellRender': DeleteBtnComponent,
      'imgCellRender': MyCellComponent
    }
  }

  ngOnInit(): void {
    this.sub = this.onGridReady().subscribe({
      next: response => {
        this.results = response.results,
          this.info = response.info
      }
    });
  }

  ngDestroy(): void {
    this.sub.unsubscribe();
  }

  // nextPage(): void{
  //   this.sub = this.newPage(this.info.next).subscribe({
  //     next: response => {
  //       this.results = response.results,
  //       this.info = response.info
  //     }
  //   });
  // }

  // newPage(url: string):Observable<any> {
  //   return this.rowData$ =  this.http.get<any[]>(url);
  // }

  onGridReady(): Observable<any> {
    return this.rowData$ = this.http.get<any[]>(this.url);
  }

  onCellClicked(e: CellClickedEvent): void {
    console.log('cellcicked: ', e)
  }

  clearSelection() {
    this.agGrid.api.deselectAll();
  }

  deleteMethod(id: number) {
    const modal = this.modalService.open(ModalComponent);
    modal.componentInstance.title = "Eliminar Rercurso";
    modal.componentInstance.mainText = "¿Estas segur@ de eliminar el recurso?";
    modal.componentInstance.subText = "Esto es el subtextBORDA";
    modal.componentInstance.dangerText = 'Esta acción no puede ser deshecha.';
    modal.componentInstance.buttonLeft = 'No';
    modal.componentInstance.buttonRight = 'Sí, eliminar';
    modal.result.then((data) => {
      if (data === "delete") {
        this.results = this.results.filter(item => item.id !== id);  
      }
    })
  }
}
