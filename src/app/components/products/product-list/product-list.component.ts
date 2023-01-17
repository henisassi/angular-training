import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes } from './../../../state/state';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() productsInput$: Observable<AppDataState<Product[]>>|null=null;
  @Output() productEventEmitter:EventEmitter<ActionEvent> =new EventEmitter<ActionEvent>();
  readonly DataStateEnum = DataStateEnum;
  constructor() { }

  ngOnInit(): void {
  }

  onSelect(p:Product){
    this.productEventEmitter.emit({type:ProductActionsTypes.SELECT_PRODUCTS,payload:p});

  }

  onDelete(p:Product){
    this.productEventEmitter.emit({type:ProductActionsTypes.DELETE_PRODUCTS,payload:p});
  }

  onEdit(p:Product){
    this.productEventEmitter.emit({type:ProductActionsTypes.EDIT_PRODUCTS,payload:p});
  }

  onActionEvent($event: ActionEvent){
    this.productEventEmitter.emit($event);
  }

}
