import { AppDataState,DataStateEnum, ProductActionsTypes, ActionEvent } from './../../state/state';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { catchError, map, startWith} from 'rxjs/operators'
import { Router } from '@angular/router';
import { EventDriverService } from 'src/app/services/event.driver.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<AppDataState<Product[]>>|null=null;
  readonly DataStateEnum = DataStateEnum;
  constructor(private productService: ProductsService,private router: Router,private eventDrivenService:EventDriverService) {}

  ngOnInit(): void {
    this.eventDrivenService.sourceEventSubjectObservable.subscribe((actionEvent:ActionEvent)=>{
      this.onActionEvent(actionEvent);
    });
  }

  onGetAllProducts() {
    this.products$ = this.productService.getAllProducts().pipe(
      map((data) => {
        console.log(data);
        return { dataState: DataStateEnum.LOADED, data: data };
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }

  onGetSelectedProducts() {
    this.products$ = this.productService.getSelectedProducts().pipe(
      map((data) => {
        console.log(data);
        return { dataState: DataStateEnum.LOADED, data: data };
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }

  onGetAvailableProducts() {
    this.products$ = this.productService.getAvailableProducts().pipe(
      map((data) => {
        console.log(data);
        return { dataState: DataStateEnum.LOADED, data: data };
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }

  onSearch(dataForm: any) {
    this.products$ = this.productService.searchProducts(dataForm.keyword).pipe(
      map((data) => {
        console.log(data);
        return { dataState: DataStateEnum.LOADED, data: data };
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }

  onSelect(p: Product) {
    this.productService.select(p).subscribe(data => {
      p.selected = data.selected;
    });
  }

  onDelete(p: Product){
    let v=confirm("Etes vous sure?");
    if(v==true)
    this.productService.delete(p).subscribe(data => {
      this.onGetAllProducts();
    });
  }

  onNewProduct(){
this.router.navigateByUrl("/newProduct");
  }

  onEdit(product: Product){
    this.router.navigateByUrl("/editProduct/"+product.id);
      }

  onActionEvent($event: ActionEvent){
    switch($event.type){
      case ProductActionsTypes.GET_ALL_PRODUCTS:this.onGetAllProducts();break;
      case ProductActionsTypes.GET_SELECTED_PRODUCTS:this.onGetSelectedProducts();break;
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS:this.onGetAvailableProducts();break;
      case ProductActionsTypes.SEARCH_PRODUCTS:this.onSearch($event.payload);break;
      case ProductActionsTypes.NEW_PRODUCTS:this.onNewProduct();break;
      case ProductActionsTypes.SELECT_PRODUCTS:this.onSelect($event.payload);break;
      case ProductActionsTypes.DELETE_PRODUCTS:this.onDelete($event.payload);break;
      case ProductActionsTypes.EDIT_PRODUCTS:this.onEdit($event.payload);break;
    }

  }
}
