import { Form, FormInstance, Input } from 'antd';
import { createContext, ReactElement } from 'react';

interface IEditableRowProps<RecordType extends { key: string }> {
  index: number;
  children: ReactElement[];
  handleSave?: (body: RecordType) => void | Promise<void>;
  'data-row-key': string;
  dataSource: RecordType[];
  record: RecordType;
}

/**
 * Контекст, содержащий antd форму для последующей работы с ней из ячеек.
 */
export const EditableContext = createContext<FormInstance | null>(null);

/**
 * Строка таблицы.
 */
export const EditableRow = <
  RecordType extends {
    key: string;
  },
>({
  index,
  children,
  handleSave,
  'data-row-key': dataRowKey,
  dataSource,
  record,
  ...props
}: IEditableRowProps<RecordType>): ReactElement => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      component={false}
      onFinish={handleSave}
      initialValues={record}
    >
      <EditableContext.Provider value={form}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <tr {...props} data-row-key={dataRowKey}>
          <td style={{ display: 'none' }}>
            <Form.Item hidden={true} name='id'>
              <Input hidden={true} />
            </Form.Item>
          </td>
          {children}
        </tr>
      </EditableContext.Provider>
    </Form>
  );
};
