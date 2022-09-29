import { FC, ReactNode, useContext } from 'react';

import { IEnumOption } from 'admin/shared/ui/Table/types/IEnumOption';
import { EnumCell } from 'admin/shared/ui/Table/EditableCell/EnumCell';
import { BooleanCell } from 'admin/shared/ui/Table/EditableCell/BooleanCell';
import { StringCell } from 'admin/shared/ui/Table/EditableCell/StringCell';
import { EditableContext } from 'admin/shared/ui/Table/EditableRow/EditableRow';

/**
 * Описывает дополнительные данные для редактируемой ячейки.
 */
export type ICellMetadata =
  | {
      type: 'string';
    }
  | {
      type: 'enum';
      options: IEnumOption[];
    }
  | {
      type: 'boolean';
    };

interface IEditableCellProps {
  metadata?: ICellMetadata;
  children: ReactNode;
  dataIndex: string;
}

/**
 * Ячейка таблицы.
 */
export const EditableCell: FC<IEditableCellProps> = ({
  children,
  dataIndex,
  metadata,
}) => {
  const form = useContext(EditableContext);

  const save = (): void => {
    form?.submit();
  };

  return (
    <td>
      <EditableComponent metadata={metadata} save={save} dataIndex={dataIndex}>
        {children}
      </EditableComponent>
    </td>
  );
};

const EditableComponent: FC<IEditableCellProps & { save: () => void }> = ({
  metadata,
  dataIndex,
  save,
  children,
}) => {
  switch (metadata?.type) {
    case 'boolean':
      return <BooleanCell dataIndex={dataIndex} onChange={save} />;
    case 'enum':
      return (
        <EnumCell
          options={metadata.options}
          onChange={save}
          dataIndex={dataIndex}
        />
      );
    case 'string':
      return <StringCell dataIndex={dataIndex} onBlur={save} />;
    default:
      return <div>{children}</div>;
  }
};
