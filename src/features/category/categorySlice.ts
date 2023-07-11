import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Category {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  description: string | null;
}


export const initialState = [
  {
    id: "1",
    name: 'Category 1',
    description: 'Category 1 description',
    is_active: false,
    deleted_at: null,
    created_at: '2021-01-01 00:00:00',
    updated_at: '2021-01-01 00:00:00',
  },
  {
    id: "2",
    name: 'Category 2',
    description: 'Category 2 description',
    is_active: true,
    deleted_at: null,
    created_at: '2021-01-01 00:00:00',
    updated_at: '2021-01-01 00:00:00',
  },
  {
    id: "3",
    name: 'Category 3',
    description: 'Category 3 description',
    is_active: true,
    deleted_at: null,
    created_at: '2021-01-01 00:00:00',
    updated_at: '2021-01-01 00:00:00',
  },
  {
    id: "4",
    name: 'Category 4',
    description: 'Category 4 description',
    is_active: true,
    deleted_at: null,
    created_at: '2021-01-01 00:00:00',
    updated_at: '2021-01-01 00:00:00',
  },
  {
    id: "5",
    name: 'Category 5',
    description: 'Category 5 description',
    is_active: true,
    deleted_at: null,
    created_at: '2021-01-01 00:00:00',
    updated_at: '2021-01-01 00:00:00',
  },
  {
    id: "6",
    name: 'Category 6',
    description: 'Category 6 description',
    is_active: false,
    deleted_at: null,
    created_at: '2021-01-01 00:00:00',
    updated_at: '2021-01-01 00:00:00',
  }
] as Category[]

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addCategory: (state, action) => { },
    removeCategory: (state, action) => { },
    updateCategory: (state, action) => { },
  },
});

export const selectCategory = (state: RootState) => state.category;
export const selectCategoryById = (state: RootState, id: string) => {
  const category = state.category.find((category) => category.id === id);
  return category || {
    id: '',
    name: '',
    description: '',
    is_active: false,
    deleted_at: null,
    created_at: '',
    updated_at: '',
  }
}

export default categorySlice.reducer;