import { useMemo } from 'react';

import { IEnumOption } from 'admin-frontend/shared/ui/Table';
import { roleApi } from 'admin-frontend/entities/role/model/roleApi';

/**
 * Возвращает данные для отрисовки ролей в виде опций селекта.
 */
export const useRoleEnumMetadata = (): IEnumOption[] => {
  const { data } = roleApi.useRoleListQuery();

  return useMemo(
    () =>
      data?.map((item) => ({
        label: item.name,
        value: item.id,
      })) || [],
    [data],
  );
};
