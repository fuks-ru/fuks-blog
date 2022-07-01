# @difuks/auth-backend

В npm пакете содержится open api-контракт для работы с авторизацией

Пример

```ts
import { getApi } from '@difuks/auth-backend';

const client = await getApi(AUTH_BACKEND_URL);

await client.authGoogle(null, { token: response.tokenId });
```
