import { request } from '@/network/axios';
import { Article, ArticleType, Message, PageListReq, getCanvasData } from './api-params-moudle';
import { GetCityTotal, PageListRes } from './api-res-model';

/** 这里枚举定义所有接口 */
enum APIS {
  GET_CITY_TOTAL_NUMBER = '/xxxx/xxxx/xxxxx'
}

/** 一个示例 */
export const getCityTotalNumber = (params: getCanvasData) =>
  request.get<GetCityTotal>(APIS.GET_CITY_TOTAL_NUMBER, params);

export const queryArticlePage = (data: Article & PageListReq) =>
  request.post<PageListRes<Article>>('/article/page', data);

export const queryTypeList = (data: ArticleType) => request.post<ArticleType[]>('/articleType/list', data);

export const queryLifePage = (data: Article & PageListReq) => request.post<PageListRes<Article>>('/life/page', data);

export const queryArticleDetail = (id: number) => request.get<Article>(`/article/${id}`);

export const queryLifeDetail = (id: number) => request.get<Article>(`/life/${id}`);

export const queryMessagePage = (data: PageListReq) => request.post<PageListRes<Message>>('/message/page', data);

export const saveMessage = (data: Message) => request.post('/message/save', data);
