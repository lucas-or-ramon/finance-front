import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { apiSlice } from "../api/apiSlice";
import { Result, Results } from "../../types/Category";

export interface Category {
  id: string;
  name: string;
  total: number;
  budget: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  description: string | null;
}

const endpointUrl = "/v1/categories";

function deleteCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "DELETE",
  };
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategories: query<Results, void>({
      query: () => endpointUrl,
      providesTags: ["Categories"]
    }),
    deleteCategory: mutation<Result, { id: string }>({
      query: deleteCategoryMutation,
      invalidatesTags: ["Categories"]
    }),
  })
});

export const initialState = [
  {
    id: "1",
    name: 'Category 1',
    total: 100,
    budget: 50,
    description: 'Category 1 description',
    is_active: false,
    deleted_at: null,
    created_at: '2021-01-01 00:00:00',
    updated_at: '2021-01-01 00:00:00',
  },
  {
    id: "2",
    name: 'Category 2',
    total: 100,
    budget: null,
    description: 'Category 2 description',
    is_active: true,
    deleted_at: null,
    created_at: '2021-01-01 00:00:00',
    updated_at: '2021-01-01 00:00:00',
  },
  {
    id: "3",
    name: 'Category 3',
    total: 500,
    budget: 100,
    description: 'Category 3 description',
    is_active: true,
    deleted_at: null,
    created_at: '2021-01-01 00:00:00',
    updated_at: '2021-01-01 00:00:00',
  },
  {
    id: "4",
    name: 'Category 4',
    total: 100,
    budget: 200,
    description: 'Category 4 description',
    is_active: true,
    deleted_at: null,
    created_at: '2021-01-01 00:00:00',
    updated_at: '2021-01-01 00:00:00',
  },
  {
    id: "5",
    name: 'Category 5',
    total: 0,
    budget: 1000,
    description: 'Category 5 description',
    is_active: true,
    deleted_at: null,
    created_at: '2021-01-01 00:00:00',
    updated_at: '2021-01-01 00:00:00',
  },
  {
    id: "6",
    name: 'Category 6',
    total: 0,
    budget: 1000,
    description: 'Category 6 description',
    is_active: false,
    deleted_at: null,
    created_at: '2021-01-01 00:00:00',
    updated_at: '2021-01-01 00:00:00',
  }
] as Category[]

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    createCategory: (state, action) => {
      state.push(action.payload);
    },
    updateCategory: (state, action) => {
      const newCategory = action.payload;
      const categoryIndex = state.findIndex((category) => category.id === newCategory.id);
      state[categoryIndex] = newCategory;
    },
    deleteCategory: (state, action) => {
      const categoryIndex = state.findIndex((category) => category.id === action.payload.id);
      state.splice(categoryIndex, 1);
    },
  },
});

export const selectCategory = (state: RootState) => state.categories;
export const selectCategoryById = (state: RootState, id: string) => {
  const category = state.categories.find((category) => category.id === id);
  return category || {
    id: '',
    name: '',
    total: 0,
    budget: null,
    description: '',
    is_active: false,
    deleted_at: null,
    created_at: '',
    updated_at: '',
  }
}

export default categorySlice.reducer;
export const { createCategory, updateCategory, deleteCategory } = categorySlice.actions;

export const {
  useGetCategoriesQuery,
  useDeleteCategoryMutation
} = categoriesApiSlice;