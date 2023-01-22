import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore, createTypedHooks, persist} from 'easy-peasy';
import storeDefinition, {StoreModel} from './model';

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

const store = createStore<StoreModel>(
  persist(storeDefinition, {
    // storage,
    // allow: ['category'],
  }),
);

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export default store;
