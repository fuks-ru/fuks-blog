import { Button, Table as TableBase, TableProps } from 'antd';
import { ReactElement, ThHTMLAttributes, useMemo } from 'react';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';

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
  handleDetail?: (id: string) => void | Promise<void>;
  dataSource: Array<RecordType & { key: string }>;
}

/**
 * Обертка над antd таблицей с функцией изменения и удаления столбцов.
 */
export const Table = <RecordType extends object>({
  columns: defaultColumns,
  handleSave,
  handleDelete,
  handleDetail,
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

    if (!handleDelete && !handleDetail) {
      return result;
    }

    return [
      ...result,
      {
        title: 'Actions',
        render: (
          _: unknown,
          record: RecordType & {
            key: string;
          },
        ) => (
          <>
            {handleDetail && (
              <Button
                onClick={() => {
                  void handleDetail(record.key);
                }}
                icon={<EyeOutlined />}
              />
            )}
            {handleDelete && (
              <Button
                onClick={() => {
                  void handleDelete(record.key);
                }}
                icon={<DeleteOutlined />}
              />
            )}
          </>
        ),
      },
    ];
  }, [defaultColumns, handleDelete, handleDetail]);

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
