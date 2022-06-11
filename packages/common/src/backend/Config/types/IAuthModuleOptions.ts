/**
 * Описывает конфиг модуля авторизации.
 */
export interface IAuthModuleOptions {
  /**
   * Маршрут до бэкенда авторизации.
   */
  authBackendUrl: string;
  /**
   * Маршрут до aронтенда авторизации.
   */
  authFrontendUrl: string;
}
