import { Form, Select } from 'antd';
import { FC } from 'react';

import { IEnumOption } from 'admin-frontend/shared/ui/Table/types/IEnumOption';

interface IProps {
  dataIndex: string;
  onChange: () => void;
  options: IEnumOption[];
}

/**
 * Выпадающий список таблицы.
 */
export const EnumCell: FC<IProps> = ({ dataIndex, onChange, options }) => (
  <Form.Item style={{ margin: 0 }} name={dataIndex}>
    <Select onChange={onChange} options={options} />
  </Form.Item>
);
