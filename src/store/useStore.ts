import { create } from 'zustand';
import { Doctor, Business, Report } from '../types';

interface Store {
  doctors: Doctor[];
  businesses: Business[];
  reports: Report[];
  setDoctors: (doctors: Doctor[]) => void;
  setBusinesses: (businesses: Business[]) => void;
  setReports: (reports: Report[]) => void;
}

export const useStore = create<Store>((set) => ({
  doctors: [],
  businesses: [],
  reports: [],
  setDoctors: (doctors) => set({ doctors }),
  setBusinesses: (businesses) => set({ businesses }),
  setReports: (reports) => set({ reports }),
}));