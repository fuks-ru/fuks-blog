import { AxiosError } from 'axios';
import { ParsedUrlQuery } from 'node:querystring';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from 'next/types';

import { IPageProps } from '../../types/page/IPageProps';
import { api } from '../../api/api';

interface IGetServerSidePropsContext<
  P = unknown,
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
> extends Omit<GetServerSidePropsContext<Q, D>, 'query'> {
  query: P;
}

type IGetServerSideProps<
  P = unknown,
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
> = (
  context: IGetServerSidePropsContext<P, Q, D>,
) => Promise<GetServerSidePropsResult<P>> | GetServerSidePropsResult<P>;

/**
 * Фабрика для getSerSideProps функции, осуществляющая прокидывание пропсов в
 * компонентов и получение новых пропсов с бэкенда в случае с SPA переходом.
 */
export const getSsp =
  (): IGetServerSideProps<IPageProps> => async (contextDraft) => {
    if (contextDraft.req.url?.includes('.json')) {
      const client = await api.getClient();

      try {
        const response = await client.get(
          `/api/page${contextDraft.resolvedUrl}`,
        );

        return {
          props: response.data as IPageProps,
        };
      } catch (error) {
        if ('isAxiosError' in (error as AxiosError)) {
          return {
            props: (error as AxiosError).response?.data as IPageProps,
          };
        }

        return {
          props: {
            title: 'Произошла ошибка',
            error: {
              message: 'Нет ответа от Api',
            },
          },
        };
      }
    }

    return {
      props: contextDraft.query,
    };
  };
