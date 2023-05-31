import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbDatepickerModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-enterprise';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {
  type: string | undefined;
  mainText = "";
  subText = "";
  dangerText = "";
  title = "";
  buttonRigth = "";
  buttonLeft = "";

  private params: any;
  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  delCell() {
    this.params.context.componentParent.deleteMethod(this.params.data.id);
  }

}
  