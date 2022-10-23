import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import Input from '@components/common/Input';

describe('Input', () => {
  it('컴포넌트가 올바르게 렌더링되어야 합니다.', () => {
    const { container } = render(<Input value="default value" />);
    const input = screen.getByDisplayValue('default value');

    expect(input).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('placeholder가 올바르게 렌더링되어야 합니다.', () => {
    render(<Input placeholder="default placeholder" />);

    const input = screen.getByPlaceholderText('default placeholder');
    expect(input).toBeInTheDocument();
  });

  it('컴포넌트의 값이 올바르게 변경되어야 합니다.', () => {
    render(<Input placeholder="default placeholder" />);

    const input: HTMLInputElement = screen.getByPlaceholderText(
      'default placeholder',
    );
    fireEvent.change(input, { target: { value: 'test value' } });
    expect(input.value).toBe('test value');
  });
});
