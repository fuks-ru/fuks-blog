import { isDevelopment } from '@difuks/common/dist/constants';

/**
 * Id для авторизации через гугл.
 */
export const GOOGLE_CLIENT_ID = isDevelopment
  ? '14083046227-pseubj6r7te7mtl1t831jsgnaak1cn47.apps.googleusercontent.com'
  : process.env.FUKS_BLOG_AUTH_GOOGLE_CLIENT_ID as string;
