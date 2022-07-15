import {
  getApi,
  Client,
  TApiArgs,
  TApiBody,
  OperationMethods,
  TApiResponse,
} from '@difuks/auth-backend';
import { urls } from '@difuks/common/dist/constants';
import {
  errorInterceptor,
  UnknownError,
  ValidationError,
} from '@difuks/common/dist/frontend';
import { coreModuleName } from '@reduxjs/toolkit/dist/query/core/module';
import {
  EndpointBuilder,
  QueryDefinition,
  MutationDefinition,
} from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { reactHooksModuleName } from '@reduxjs/toolkit/dist/query/react/module';
import { Api, BaseQueryFn } from '@reduxjs/toolkit/query';
import { message } from 'antd';
import { createApi as createApiBase } from '@reduxjs/toolkit/query/react';

/**
 * Клиент для работы с AuthApi.
 */
// eslint-disable-next-line import/no-mutable-exports
export let authApi: Client;

/**
 * Инициализирует Api.
 */
export const initAuthApi = async (): Promise<void> => {
  authApi = await getApi(urls.AUTH_BACKEND_URL);

  authApi.interceptors.response.use(undefined, errorInterceptor);
  authApi.defaults.headers.common.i18next = navigator.language;
};

interface IQueryArgs {
  method: keyof OperationMethods;
  params?: TApiArgs<keyof OperationMethods>;
  body?: TApiBody<keyof OperationMethods>;
}

/**
 * Возвращает функцию для генерации базового query rtk.
 */
export const authBaseQuery = (): BaseQueryFn<IQueryArgs> => async (args) => {
  const method = authApi[args.method].bind(authApi);

  try {
    const response = await method(args.params, args.body);

    return {
      data: response.data,
    };
  } catch (error) {
    if (error instanceof ValidationError || error instanceof UnknownError) {
      await message.error(error.message);

      return {
        error: error.message,
      };
    }

    await message.error('Unknown error');

    return {
      error: 'Unknown error',
    };
  }
};

/**
 * Генерирует rtk query endpoint'ы для Api.
 */

type TMethodData = { type: 'update' | 'getList' | 'delete' };

type IEndpoints<
  Methods extends Partial<Record<keyof OperationMethods, TMethodData>>,
> = {
  [key in keyof Methods]: Methods[key] extends TMethodData
    ? key extends keyof OperationMethods
      ? Methods[key]['type'] extends 'getList'
        ? TApiResponse<key> extends
            | Array<{ id: string }>
            | Array<{ id: number }>
          ? QueryDefinition<
              void,
              BaseQueryFn<IQueryArgs>,
              never,
              TApiResponse<key>,
              string
            >
          : never
        : Methods[key]['type'] extends 'delete'
        ? MutationDefinition<
            string,
            BaseQueryFn<IQueryArgs>,
            never,
            TApiResponse<key>,
            string
          >
        : TApiArgs<key> extends { id: string }
        ? MutationDefinition<
            {
              body: TApiBody<key>;
              params: TApiArgs<key>;
            },
            BaseQueryFn<IQueryArgs>,
            never,
            TApiResponse<key>,
            string
          >
        : never
      : never
    : never;
};

type IApi<ReducerPath extends string> = Api<
  BaseQueryFn<IQueryArgs>,
  IEndpoints<Record<keyof OperationMethods, TMethodData>>,
  ReducerPath,
  never,
  typeof reactHooksModuleName | typeof coreModuleName
>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const updateMutation = <
  Methods extends Partial<Record<keyof OperationMethods, TMethodData>>,
  ReducerPath extends string,
>(
  method: string,
  build: EndpointBuilder<BaseQueryFn<IQueryArgs>, string, string>,
  methods: Methods,
  api: IApi<ReducerPath>,
) => [
  method,
  build.mutation<
    TApiResponse<keyof OperationMethods>,
    {
      body: TApiBody<keyof OperationMethods>;
      params: TApiArgs<keyof OperationMethods>;
    }
  >({
    query: ({ body, params }) => ({
      method: method as keyof OperationMethods,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      body,
      params,
    }),
    onQueryStarted: async ({ body, params }, { dispatch, queryFulfilled }) => {
      const listFunction = Object.entries(methods).find(
        ([, data]) => data.type === 'getList',
      )?.[0];

      if (!listFunction) {
        await queryFulfilled;

        return;
      }

      const patchResult = dispatch(
        api.util.updateQueryData(
          listFunction as never,
          undefined as never,
          (draft) => {
            if (!('id' in params)) {
              return;
            }

            const updatedData = (
              draft as Array<{
                id: string;
              }>
            ).find((item) => item.id === params.id);

            if (!updatedData) {
              return;
            }

            Object.assign(updatedData, body);
          },
        ),
      );

      try {
        await queryFulfilled;
      } catch {
        patchResult.undo();
      }
    },
  }),
];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const deleteMutation = <
  Methods extends Partial<Record<keyof OperationMethods, TMethodData>>,
  ReducerPath extends string,
>(
  method: string,
  build: EndpointBuilder<BaseQueryFn<IQueryArgs>, string, string>,
  methods: Methods,
  api: IApi<ReducerPath>,
) => [
  method,
  build.mutation<void, string>({
    query: (id: string) => ({
      method: method as keyof OperationMethods,
      body: {},
      params: {
        id,
      },
    }),
    onQueryStarted: async (id: string, { dispatch, queryFulfilled }) => {
      const listFunction = Object.entries(methods).find(
        ([, data]) => data.type === 'getList',
      )?.[0];

      if (!listFunction) {
        await queryFulfilled;

        return;
      }

      const patchResult = dispatch(
        api.util.updateQueryData(
          listFunction as never,
          undefined as never,
          (draft) =>
            (
              draft as Array<{
                id: string;
              }>
            ).filter((item) => item.id !== id),
        ),
      );

      try {
        await queryFulfilled;
      } catch {
        patchResult.undo();
      }
    },
  }),
];

interface IOptions<
  Methods extends Partial<Record<keyof OperationMethods, TMethodData>>,
  ReducerPath extends string,
> {
  methods: Methods;
  reducerPath: ReducerPath;
}

/**
 * Возвращает rtk-query API для работы с API авторизацией.
 */
export const createAuthApi = <
  Methods extends Partial<Record<keyof OperationMethods, TMethodData>>,
  ReducerPath extends string,
>(
  options: IOptions<Methods, ReducerPath>,
): Api<
  BaseQueryFn<IQueryArgs>,
  IEndpoints<Methods>,
  ReducerPath,
  never,
  typeof reactHooksModuleName | typeof coreModuleName
> => {
  const getCrudEndpoints =
    (
      methods: Methods,
    ): ((
      build: EndpointBuilder<BaseQueryFn<IQueryArgs>, string, string>,
    ) => IEndpoints<Methods>) =>
    (build) =>
      Object.fromEntries(
        Object.entries(methods).map(([method, { type }]) => {
          if (type === 'update') {
            return updateMutation(
              method,
              build,
              methods,
              api as unknown as IApi<ReducerPath>,
            );
          }

          if (type === 'delete') {
            return deleteMutation(
              method,
              build,
              methods,
              api as unknown as IApi<ReducerPath>,
            );
          }

          return [
            method,
            build.query<TApiResponse<keyof OperationMethods>, void>({
              query: () => ({ method: method as keyof OperationMethods }),
            }),
          ];
        }),
      ) as IEndpoints<Methods>;

  const api = createApiBase<
    BaseQueryFn<IQueryArgs>,
    IEndpoints<Methods>,
    ReducerPath
  >({
    reducerPath: options.reducerPath,
    baseQuery: authBaseQuery(),
    endpoints: getCrudEndpoints(options.methods),
  });

  return api;
};
