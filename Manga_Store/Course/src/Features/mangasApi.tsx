import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Manga } from '../Interfaces/Manga';
import 'bootstrap/dist/css/bootstrap.min.css';



export const mangasApi = createApi({
  reducerPath: "mangasApi",
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  endpoints: (builder) => ({
    mangas: builder.query<Manga[], void>({
      query: () => "/mangas",
    }),

  }),
})
export const useMangasQuery = mangasApi.endpoints.mangas.useQuery;

export default mangasApi;