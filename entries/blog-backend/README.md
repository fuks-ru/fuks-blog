# @fuks-ru/blog-backend

В npm пакете содержится open api-контракт для работы с бэкендом

Пример

```ts
import { getApi, TApiResponse } from '@fuks-ru/blog-backend';

const [categories, setCategories] = useState<TApiResponse<'categoryList'>>(
	[],
);

useEffect(() => {
	(async () => {
		const api = await getApi(BLOG_BACKEND_URL);

		const response = await api.categoryList();

		setCategories(response.data);
	})();
}, []);
```
