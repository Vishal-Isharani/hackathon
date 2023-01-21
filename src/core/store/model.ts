import createCategoryListStore, {CategoryListModel} from './categoryListModel';

export interface StoreModel {
  category: CategoryListModel;
}

const store: StoreModel = {
  category: createCategoryListStore({
    categories: [],
  }),
};

export default store;
