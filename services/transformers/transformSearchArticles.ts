import {get} from 'lodash';
import {ArticleItem} from '../types.ts';

export const transformSearchArticles = (data: unknown): ArticleItem[] => {
  return get(data, 'articles', []);
};
