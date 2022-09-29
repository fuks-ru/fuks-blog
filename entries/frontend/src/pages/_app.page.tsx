import { FC } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { IPageProps } from 'frontend/shared/types/page/IPageProps';
import { ErrorPage } from 'frontend/pages/_500/index.page';
import { GlobalStyle } from 'frontend/shared/ui/GlobalStyles';

const App: FC<
  Omit<AppProps<IPageProps>, 'pageProps'> & { pageProps: IPageProps }
> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>{pageProps.title}</title>
      <link rel='apple-touch-icon' sizes='57x57' href='/apple-icon-57x57.png' />
      <link rel='apple-touch-icon' sizes='60x60' href='/apple-icon-60x60.png' />
      <link rel='apple-touch-icon' sizes='72x72' href='/apple-icon-72x72.png' />
      <link rel='apple-touch-icon' sizes='76x76' href='/apple-icon-76x76.png' />
      <link
        rel='apple-touch-icon'
        sizes='114x114'
        href='/apple-icon-114x114.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='120x120'
        href='/apple-icon-120x120.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='144x144'
        href='/apple-icon-144x144.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='152x152'
        href='/apple-icon-152x152.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/apple-icon-180x180.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='192x192'
        href='/android-icon-192x192.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='96x96'
        href='/favicon-96x96.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/favicon-16x16.png'
      />
      <link rel='manifest' href='/manifest.json' />
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta name='msapplication-TileImage' content='/ms-icon-144x144.png' />
      <meta name='theme-color' content='#ffffff' />
    </Head>
    <GlobalStyle />
    {pageProps.error ? (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <ErrorPage {...pageProps} />
    ) : (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Component {...pageProps} />
    )}
  </>
);

/**
 * Переопределяет базовый шаблон Next страницы.
 */
export default App;
