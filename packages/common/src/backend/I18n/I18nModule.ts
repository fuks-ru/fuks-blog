import { Global, Module } from '@nestjs/common';
import {
  CookieResolver,
  HeaderResolver,
  I18nModule as I18nModuleBase,
} from 'nestjs-i18n';

import { I18nValidationTranslator } from 'common/backend/I18n/services/I18nValidationTranslator';
import { I18nResolver } from 'common/backend/I18n/services/I18nResolver';
import { I18nLoader } from 'common/backend/I18n/services/I18nLoader';
import { ConfigGetterBase } from 'common/backend/Config/services/ConfigGetterBase';
import { CONFIG } from 'common/constants';
import enUS from 'common/backend/__i18n__/enUS.json';
import ruRU from 'common/backend/__i18n__/ruRU.json';

@Global()
@Module({
  imports: [
    I18nModuleBase.forRootAsync({
      inject: [CONFIG],
      resolvers: [
        new CookieResolver(['i18next']),
        new HeaderResolver(['i18next']),
      ],
      loader: I18nLoader,
      useFactory: (configGetterBase: ConfigGetterBase) => {
        const translations = configGetterBase.getTranslations();

        return {
          fallbackLanguage: 'en-US',
          loaderOptions: {
            languages: ['en-US', 'ru-RU'],
            translations: {
              'en-US': { ...enUS, ...translations['en-US'] },
              'ru-RU': { ...ruRU, ...translations['ru-RU'] },
            },
          },
        };
      },
    }),
  ],
  providers: [I18nResolver, I18nValidationTranslator],
  exports: [I18nResolver, I18nValidationTranslator],
})
export class I18nModule {}
