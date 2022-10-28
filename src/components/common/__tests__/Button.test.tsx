import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import Button from '@components/common/Button';

describe('Button', () => {
  it('컴포넌트가 올바르게 렌더링되어야 합니다.', () => {
    const { container } = render(<Button>버튼</Button>);
    const label = screen.getByText('버튼');
    expect(label).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('버튼을 클릭했을 때 onClick 이벤트 리스너가 호출되어야 합니다.', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>버튼</Button>);
    const label = screen.getByText('버튼');

    expect(handleClick).toHaveBeenCalledTimes(0);
    fireEvent.click(label);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
