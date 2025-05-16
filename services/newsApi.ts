// TODO: Just for the challenge, API Key should not be here
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ArticleItem, SearchArticleParams, SearchArticleResponse} from './types.ts';
import {transformSearchArticles} from './transformers/transformSearchArticles.ts';

const API_KEY = '183daca270264bad86fc5b72972fb82a';

// TODO: This should be put in env files
const BASE_URL = 'https://newsapi.org/v2/';

const newApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('X-Api-Key', API_KEY);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    searchArticles: builder.query<ArticleItem[], SearchArticleParams>({
      query: (params) => ({
        url: 'everything',
        params: {
          q: params.keyword,
        },
      }),
      transformResponse: transformSearchArticles,
    }),
  }),
});

export const {useSearchArticlesQuery} = newApi;

export default newApi;
