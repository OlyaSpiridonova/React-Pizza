export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
  TITLE_ASC = '-title',
}

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: Sort;
}
