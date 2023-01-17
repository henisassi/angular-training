export enum ProductActionsTypes{
   GET_ALL_PRODUCTS="[Product] Get All product",
   GET_SELECTED_PRODUCTS="[Product] Get Selected product",
   GET_AVAILABLE_PRODUCTS="[Product] Get Available product",
   SEARCH_PRODUCTS="[Product] Search product",
   NEW_PRODUCTS="[Product] New product",
   SELECT_PRODUCTS="[Product] Select product",
   EDIT_PRODUCTS="[Product] Edit product",
   DELETE_PRODUCTS="[Product] Delete product",
}

export interface ActionEvent{
  type:ProductActionsTypes,
  payload?:any,
}

export enum DataStateEnum {
  LOADING,
  LOADED,
  ERROR,
}

export interface AppDataState<T> {
  dataState:DataStateEnum,
  data?:T,
  errorMessage?:string;
}
