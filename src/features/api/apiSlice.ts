import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = "https://demo1860037.mockable.io/api/"

export const apiSlice = createApi({
    reducerPath: 'api',
    tagTypes: ['Categories'],
    endpoints: (builder) => ({}),
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
})