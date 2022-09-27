import { HttpStatus } from '@nestjs/common';
import { AxiosError } from 'axios';
import { ParsedUrlQuery } from 'node:querystring';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from 'next/types';
import { IErrorResponse } from '@difuks/common';

import { IPageProps } from 'blog-frontend/shared/types/page/IPageProps';
import { api } from 'blog-frontend/shared/api/api';
import { API_PAGE_PREFIX } from 'blog-frontend/shared/lib/constants';

/**
 * Описание кастомной функции getServerSideProps.
 */
export interface IGetServerSidePropsContext<
  P = unknown,
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
> extends Omit<GetServerSidePropsContext<Q, D>, 'query'> {
  /**
   * В этом параметре приходят данные от сервера в режиме SSR.
   */
  query: P | IErrorResponse;
}

type IGetServerSideProps<
  P = unknown,
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
> = (
  context: IGetServerSidePropsContext<P, Q, D>,
) => Promise<GetServerSidePropsResult<P>> | GetServerSidePropsResult<P>;

const getErrorPageProps = (
  errorResponse?: IErrorResponse,
): GetServerSidePropsResult<IPageProps> => {
  if (!errorResponse) {
    return {
      props: {
        title: 'Произошла ошибка',
        error: {
          message: 'Нет ответа от Api',
        },
      },
    };
  }

  if (errorResponse.redirect) {
    return {
      redirect: {
        permanent: false,
        destination: errorResponse.redirect.location,
      },
    };
  }

  return {
    props: {
      title: 'Произошла ошибка',
      error: {
        message: errorResponse.message,
      },
    },
  };
};

/**
 * Фабрика для getSerSideProps функции, осуществляющая прокидывание пропсов в
 * компоненты и получение новых пропсов с бэкенда в случае с SPA переходом.
 */
export const getSsp =
  (): IGetServerSideProps<IPageProps> => async (contextDraft) => {
    if (contextDraft.req.url?.includes('.json')) {
      const client = api.getInstance();

      client.defaults.headers.common.cookie =
        contextDraft.req.headers.cookie || '';

      try {
        const response = await client.get(
          `${API_PAGE_PREFIX}${contextDraft.resolvedUrl}`,
        );

        return {
          props: response.data as IPageProps,
        };
      } catch (error) {
        const errorResponse = (error as AxiosError).response
          ?.data as IErrorResponse;

        return getErrorPageProps(errorResponse);
      }
    }

    if (contextDraft.res.statusCode >= HttpStatus.AMBIGUOUS) {
      const errorResponse = contextDraft.query as IErrorResponse;

      return getErrorPageProps(errorResponse);
    }

    return {
      props: contextDraft.query as IPageProps,
    };
  };
