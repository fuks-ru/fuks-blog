import { TableProps } from 'antd';

import { ICellMetadata } from 'admin/shared/ui/Table/EditableCell/EditableCell';

/**
 * Описывает тип колонки таблицы.
 */
export type TColumnTypes<RecordType extends object> = Array<
  Exclude<TableProps<RecordType>['columns'], undefined>[number] & {
    editable?: boolean;
    dataIndex: string;
    metadata?: ICellMetadata;
  }
>;
