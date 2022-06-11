/**
 * Модуль, обеспечивающий логирование в консоль и файл.
 */
export { LoggerModule } from 'common/backend/Logger/LoggerModule';
/**
 * Сервис для логирования.
 */
export { Logger } from 'common/backend/Logger/services/Logger';
/**
 * Опции для модуля логирования.
 */
export { ILoggerModuleOptions } from 'common/backend/Logger/types/ILoggerModuleOptions';
/**
 * Модуль для работы со swagger.
 */
export { SwaggerModule } from 'common/backend/Swagger/SwaggerModule';
/**
 * Сервис для работы со swagger.
 */
export { SwaggerService } from 'common/backend/Swagger/services/SwaggerService';
/**
 * Модуль для установки кук.
 */
export { CookieSetterModule } from 'common/backend/CookieSetter/CookieSetterModule';
/**
 * Сервис для установки кук.
 */
export { CookieSetterService } from 'common/backend/CookieSetter/services/CookieSetterService';
/**
 * Модуль для генерации системных ошибок.
 */
export { SystemErrorModule } from 'common/backend/SystemError/SystemErrorModule';
/**
 * Сервис для генерации системных ошибок.
 */
export { SystemErrorFactory } from 'common/backend/SystemError/services/SystemErrorFactory';
/**
 * Описывает коды базовых ошибок.
 */
export { CommonErrorCode } from 'common/backend/SystemError/enums/CommonErrorCode';
/**
 * Модуль для обработки ошибок.
 */
export { ErrorFilterModule } from 'common/backend/ErrorFilter/ErrorFilterModule';
/**
 * HTTP ответ при ошибке.
 */
export { IErrorResponse } from 'common/backend/ErrorFilter/dto/IErrorResponse';
/**
 * Модуль для генерации ошибок валидации.
 */
export { ValidationModule } from 'common/backend/Validation/ValidationModule';
/**
 * Модуль для хеширования.
 */
export { EncodingModule } from 'common/backend/Encoding/EncodingModule';
/**
 * Сервис для хеширования.
 */
export { EncodingService } from 'common/backend/Encoding/services/EncodingService';
/**
 * Базовый абстрактный класс для работы с конфигом.
 */
export { ConfigGetterBase } from 'common/backend/Config/services/ConfigGetterBase';
/**
 * Токен для подключения сервиса с конфигом.
 */
export { CONFIG } from 'common/constants';
/**
 * Модуль для конфигов.
 */
export { ConfigModule } from 'common/backend/Config/ConfigModule';
/**
 * Модуль для редиректов.
 */
export { RedirectModule } from 'common/backend/Redirect/RedirectModule';
/**
 * Сервис для генерации ошибок редиректа.
 */
export { RedirectErrorFactory } from 'common/backend/Redirect/services/RedirectErrorFactory';

export { ApiErrorsService } from 'common/backend/ApiErrors/services/ApiErrorsService';
export { ApiErrorsModule } from 'common/backend/ApiErrors/ApiErrorsModule';
export { IErrorFilterModuleOptions } from 'common/backend/ErrorFilter/types/IErrorFilterModuleOptions';
export { RequestRefModule } from 'common/backend/RequestRef/RequestRefModule';
export { RequestRefService } from 'common/backend/RequestRef/services/RequestRefService';
export { User } from 'common/backend/User/decorators/User';
export { ValidationErrorFactory } from 'common/backend/Validation/services/ValidationErrorFactory';
export { Match } from 'common/backend/Validation/decorators/Match';
