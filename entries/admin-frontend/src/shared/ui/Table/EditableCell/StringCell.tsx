import { Form, Input } from 'antd';
import { FC } from 'react';

interface IProps {
  dataIndex: string;
  onBlur: () => void;
}

/**
 * Строковый элемент таблицы.
 */
export const StringCell: FC<IProps> = ({ dataIndex, onBlur }) => (
  <Form.Item style={{ margin: 0 }} name={dataIndex}>
    <Input onBlur={onBlur} />
  </Form.Item>
);
