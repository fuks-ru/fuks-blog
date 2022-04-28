/**
 * Описывает конфиг модуля логирования.
 */
export interface ILoggerModuleOptions {
  /**
   * Отключает логирование в консоль.
   */
  isToConsoleDisable?: boolean;
  /**
   * Отключает логирование в файл.
   */
  isToFileDisable?: boolean;
}
