import { useSelect, useValue } from 'react-cosmos/fixture';

import { Button } from 'ui/components/Button/Button';

export default {
  Base: () => {
    const [size] = useSelect('size', {
      options: ['md', 'sm', 'lg'],
    });
    const [children] = useValue('children', { defaultValue: 'Press me' });

    return <Button size={size}>{children}</Button>;
  },
  Small: <Button size='sm'>Small</Button>,
};
