import { Button, Table as TableBase, TableProps } from 'antd';
import { ReactElement, ThHTMLAttributes, useMemo } from 'react';

import { EditableCell } from 'admin-frontend/shared/ui/Table/EditableCell/EditableCell';
import { EditableRow } from 'admin-frontend/shared/ui/Table/EditableRow/EditableRow';
import { TColumnTypes } from 'admin-frontend/shared/ui/Table/types/TColumnTypes';

const components = {
  body: {
    row: EditableRow,
    cell: EditableCell,
  },
};

interface IProps<RecordType extends object>
  extends Omit<TableProps<RecordType>, 'columns'> {
  columns: TColumnTypes<RecordType>;
  handleSave?: (data: RecordType) => void | Promise<void>;
  handleDelete?: (id: string) => void | Promise<void>;
  dataSource: Array<RecordType & { key: string }>;
}

/**
 * Обертка над antd таблицей с функцией изменения и удаления столбцов.
 */
export const Table = <RecordType extends object>({
  columns: defaultColumns,
  handleSave,
  handleDelete,
  dataSource,
  ...props
}: IProps<RecordType>): ReactElement => {
  const columns = useMemo(() => {
    const result = defaultColumns.map((column) => {
      if (!column.editable) {
        return column;
      }

      return {
        ...column,
        onCell: () => ({
          dataIndex: column.dataIndex,
          title: column.title as string,
          metadata: column.metadata,
        }),
      };
    });

    if (handleDelete) {
      return [
        ...result,
        {
          title: 'Delete',
          render: (
            _: unknown,
            record: RecordType & {
              key: string;
            },
          ) => (
            <Button
              onClick={() => {
                void handleDelete(record.key);
              }}
            >
              Delete
            </Button>
          ),
        },
      ];
    }

    return result;
  }, [defaultColumns, handleDelete]);

  const onRow = (record: RecordType): ThHTMLAttributes<unknown> =>
    ({
      record,
      handleSave,
    } as ThHTMLAttributes<unknown>);

  return (
    <TableBase<RecordType>
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      dataSource={dataSource}
      onRow={onRow}
      columns={columns as TColumnTypes<RecordType>}
      components={components}
    />
  );
};
