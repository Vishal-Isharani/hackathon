import {action, Action, computed, Computed} from 'easy-peasy';
import {Category, CategoryItem} from '../../shared/models';

interface CategoryListModelState {
  categories: Category[];
}

export interface CategoryListModel extends CategoryListModelState {
  // category actions
  addCategory: Action<this, Category>;
  updateCategory: Action<this, Partial<Category>>;
  removeCategory: Action<this, string>;

  // computed category
  categoryDetails: Computed<this, (id: string) => Category | undefined>;

  // items actions
  addCategoryItem: Action<this, {categoryId: string; item: CategoryItem}>;
  updateCategoryItem: Action<
    this,
    Partial<{categoryId: string; item: CategoryItem}>
  >;
  removeCategoryItem: Action<this, {categoryId: string; itemId: string}>;
}

const createCategoryListStore = (
  initialState: CategoryListModelState,
): CategoryListModel => ({
  ...initialState,

  // category actions
  addCategory: action((state, category) => {
    state.categories.push(category);
  }),
  updateCategory: action((state, category) => {
    const categoryIndex = state.categories.findIndex(c => c.id === category.id);
    if (categoryIndex > -1) {
      const clonedState = [...state.categories];
      clonedState[categoryIndex] = {
        ...clonedState[categoryIndex],
        ...category,
      };
      state.categories = clonedState;
    } else {
      state.categories.push(category as Category);
    }
  }),
  removeCategory: action((state, id) => {
    state.categories = state.categories.filter(t => t.id !== id);
  }),

  // computed category
  categoryDetails: computed(
    state => (id: string) => state.categories.find(c => c.id === id),
  ),

  // category items actions
  addCategoryItem: action((state, payload) => {
    const categoryIndex = state.categories.findIndex(
      category => category.id === payload.categoryId,
    );
    if (categoryIndex > -1) {
      const clonedState = [...state.categories];
      clonedState[categoryIndex].items.push(payload.item);
      state.categories = clonedState;
    }
  }),
  updateCategoryItem: action((state, payload) => {
    const categoryIndex = state.categories.findIndex(
      category => category.id === payload.categoryId,
    );
    if (categoryIndex > -1) {
      const clonedState = [...state.categories];

      const categoryItemIndex = clonedState[categoryIndex].items.findIndex(
        item => item.id === payload.item?.id,
      );

      if (categoryItemIndex > -1) {
        clonedState[categoryIndex].items[categoryItemIndex] = {
          ...clonedState[categoryIndex].items[categoryItemIndex],
          ...payload.item,
        };
      } else {
        clonedState[categoryIndex].items.push(payload.item as CategoryItem);
      }
      state.categories = clonedState;
    }
  }),
  removeCategoryItem: action((state, payload) => {
    const categoryIndex = state.categories.findIndex(
      category => category.id === payload.categoryId,
    );
    if (categoryIndex > -1) {
      const clonedState = [...state.categories];
      clonedState[categoryIndex].items = clonedState[
        categoryIndex
      ].items.filter(item => item.id !== payload.itemId);
      state.categories = clonedState;
    }
  }),
});

export default createCategoryListStore;
