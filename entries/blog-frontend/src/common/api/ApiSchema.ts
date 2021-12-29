import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios'; 

declare namespace Components {
    namespace Schemas {
        export interface TestSwaggerRequest {
            name: string;
        }
        export interface TestSwaggerResponse {
            id: string;
            test: string;
        }
    }
}
declare namespace Paths {
    namespace IndexTestSwagger {
        export type RequestBody = Components.Schemas.TestSwaggerRequest;
        namespace Responses {
            export type $201 = Components.Schemas.TestSwaggerResponse;
        }
    }
}

export interface OperationMethods {
  /**
   * indexTestSwagger
   */
  'indexTestSwagger'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.IndexTestSwagger.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.IndexTestSwagger.Responses.$201>
}

export interface PathsDictionary {
  ['/api/test-swagger']: {
    /**
     * indexTestSwagger
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.IndexTestSwagger.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.IndexTestSwagger.Responses.$201>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
