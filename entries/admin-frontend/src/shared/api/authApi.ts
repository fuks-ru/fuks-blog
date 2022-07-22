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

type TMethodData<
  Type extends 'update' | 'getList' | 'delete' | 'get' =
    | 'update'
    | 'getList'
    | 'delete'
    | 'get',
> = {
  type: Type;
};

type IEndpoints<Methods> = {
  [key in keyof Methods]: Methods[key] extends TMethodData<infer Type>
    ? key extends keyof OperationMethods
      ? Type extends 'getList'
        ? QueryDefinition<
            void,
            BaseQueryFn<IQueryArgs>,
            never,
            TApiResponse<key>,
            string
          >
        : Type extends 'delete'
        ? MutationDefinition<
            string,
            BaseQueryFn<IQueryArgs>,
            never,
            TApiResponse<key>,
            string
          >
        : Type extends 'update'
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
        : Type extends 'get'
        ? QueryDefinition<
            string,
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

type IMethods = {
  [key in keyof OperationMethods]?: TApiResponse<key> extends
    | { id: string }
    | { id: number }
    ? TApiArgs<key> extends { id: string } | { id: number }
      ? { type: 'update' } | { type: 'get' }
      : never
    : TApiResponse<key> extends Array<{ id: string }> | Array<{ id: number }>
    ? { type: 'getList' }
    : TApiArgs<key> extends { id: string } | { id: number }
    ? { type: 'delete' }
    : never;
};

/**
 * Возвращает rtk-query API для работы с API авторизацией.
 */
export const createAuthApi = <
  ReducerPath extends string,
  Methods extends IMethods,
>(options: {
  methods: Methods;
  reducerPath: ReducerPath;
}): Api<
  BaseQueryFn<IQueryArgs>,
  IEndpoints<Methods>,
  ReducerPath,
  never,
  typeof reactHooksModuleName | typeof coreModuleName
> => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const updateMutation = (
    method: string,
    build: EndpointBuilder<BaseQueryFn<IQueryArgs>, string, string>,
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
      onQueryStarted: async (
        { body, params },
        { dispatch, queryFulfilled },
      ) => {
        const listFunction = Object.entries(options.methods).find(
          ([, data]) => (data as TMethodData).type === 'getList',
        )?.[0];

        if (!listFunction) {
          await queryFulfilled;

          return;
        }

        const patchResult = dispatch(
          (api as unknown as IApi<ReducerPath>).util.updateQueryData(
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
  const deleteMutation = (
    method: string,
    build: EndpointBuilder<BaseQueryFn<IQueryArgs>, string, string>,
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
        const listFunction = Object.entries(options.methods).find(
          ([, data]) => (data as TMethodData).type === 'getList',
        )?.[0];

        if (!listFunction) {
          await queryFulfilled;

          return;
        }

        const patchResult = dispatch(
          (api as unknown as IApi<ReducerPath>).util.updateQueryData(
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

  const getCrudEndpoints =
    (
      methods: Methods,
    ): ((
      build: EndpointBuilder<BaseQueryFn<IQueryArgs>, string, string>,
    ) => IEndpoints<Methods>) =>
    (build) =>
      Object.fromEntries(
        Object.entries(methods).map(([method, data]) => {
          const { type } = data as TMethodData;

          if (type === 'update') {
            return updateMutation(method, build);
          }

          if (type === 'delete') {
            return deleteMutation(method, build);
          }

          return [
            method,
            build.query<TApiResponse<keyof OperationMethods>, string>({
              query: (id: string) => ({
                method: method as keyof OperationMethods,
                params: { id },
              }),
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
