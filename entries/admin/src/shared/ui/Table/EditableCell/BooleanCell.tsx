import { Checkbox, Form } from 'antd';
import { FC } from 'react';

interface IProps {
  dataIndex: string;
  onChange: () => void;
}

/**
 * Чекбокс таблицы.
 */
export const BooleanCell: FC<IProps> = ({ dataIndex, onChange }) => (
  <Form.Item style={{ margin: 0 }} name={dataIndex} valuePropName='checked'>
    <Checkbox onChange={onChange} />
  </Form.Item>
);
