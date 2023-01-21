import {action, Action, computed, Computed} from 'easy-peasy';
import {ControlType} from '../../shared/models';

export interface Category {
  name: string;
  id: string;
  fields: Array<{
    id: string;
    name: string;
    type: ControlType;
  }>;
}

interface CategoryListModelState {
  categories: Category[];
}

export interface CategoryListModel extends CategoryListModelState {
  addCategory: Action<this, Category>;
  updateCategory: Action<this, Partial<Category>>;
  removeCategory: Action<this, string>;
  categoryDetails: Computed<this, (id: string) => Category | undefined>;
}

const createCategoryListStore = (
  initialState: CategoryListModelState,
): CategoryListModel => ({
  ...initialState,

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

  categoryDetails: computed(
    state => (id: string) => state.categories.find(c => c.id === id),
  ),
});

export default createCategoryListStore;
