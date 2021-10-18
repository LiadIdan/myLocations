export interface Category {
  id: string;
  name: string;
}

export type CreateCategoryDto = Omit<Category, 'id'>;
