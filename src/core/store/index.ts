import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore, persist} from 'easy-peasy';
import category from './category';

const storage = {
  async getItem(key: string) {
    return JSON.parse((await AsyncStorage.getItem(key)) as string);
  },
  async setItem(key: string, data: unknown) {
    console.log({[key]: data});
    return AsyncStorage.setItem(key, JSON.stringify(data));
  },
  async removeItem(key: string) {
    AsyncStorage.removeItem(key);
  },
};

export interface StoreModel {
  category: typeof category;
}

const store = createStore<StoreModel>(
  persist(
    {
      category,
    },
    {
      storage,
      allow: ['category'],
    },
  ),
);

store.persist.clear();
export default store;
