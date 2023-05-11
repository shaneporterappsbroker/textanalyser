import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { type HistoryItem } from '~/types';

export interface AnalysisHistoryState {
  historyItems: HistoryItem[];
  addHistoryItem: (historyItem: HistoryItem) => void;
  removeHistoryItem: (id: number) => void;
}

export const useAnalysisHistory = create<AnalysisHistoryState>()(
  devtools(
    persist(
      (set) => ({
        historyItems: [],
        addHistoryItem: (historyItem) => {
          set((state) => ({
            ...state,
            historyItems: [historyItem, ...state.historyItems],
          }));
        },
        removeHistoryItem: (id) => {
          set((state) => ({
            ...state,
            historyItems: state.historyItems.filter((item) => item.id !== id),
          }));
        },
      }),
      {
        name: 'appsbroker-textanalysis-store',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
