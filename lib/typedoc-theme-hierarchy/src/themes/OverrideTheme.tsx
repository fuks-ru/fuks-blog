import { DefaultTheme, DefaultThemeRenderContext, Options } from 'typedoc';

import { navigation } from '../partials/navigation';

class FuksOverrideThemeContext extends DefaultThemeRenderContext {
  public constructor(theme: DefaultTheme, options: Options) {
    super(theme, options);

    this.navigation = navigation(this.urlTo.bind(this));
  }
}

export class OverrideTheme extends DefaultTheme {
  private _contextCache?: FuksOverrideThemeContext;

  /**
   * Переопределяет стандартный контекст.
   */
  public override getRenderContext(): FuksOverrideThemeContext {
    this._contextCache ||= new FuksOverrideThemeContext(
      this,
      this.application.options,
    );

    return this._contextCache;
  }
}
