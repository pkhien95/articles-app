export type SearchArticleParams = {
  keyword: string
}

export type ArticleItem = {
  source: {
    id: string | null,
    name: string
  },
  author: null,
  title: string,
  description: string,
  url: string,
  urlToImage: string | null,
  publishedAt: string,
  content: string
}

export type SearchArticleResponse = {
  status: string,
  totalResults: number
  articles: ArticleItem[]
}
