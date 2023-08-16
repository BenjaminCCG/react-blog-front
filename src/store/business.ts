import { ArticleType } from '@/network/api/api-params-moudle';
import { create } from 'zustand';

interface Business {
  typeList: ArticleType[];
  setTypeList: (typeList: ArticleType[]) => void;
}
export const useBusinessStore = create<Business>((set) => ({
  typeList: [],
  setTypeList: (typeList: ArticleType[]) => set(() => ({ typeList }))
}));
