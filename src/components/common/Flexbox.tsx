import React from 'react';
import styled from 'styled-components';

type FlexDirectionOption = 'row' | 'col' | 'row-reverse' | 'col-reverse';
type AlignItemsOption = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
type JustifyContentOption =
  | 'start'
  | 'end'
  | 'center'
  | 'between'
  | 'around'
  | 'evenly';

const flexDirectionValue = {
  row: 'row',
  col: 'column',
  'row-reverse': 'row-reverse',
  'col-reverse': 'column-reverse',
};

const justifyContentValue = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

const alignItemsValue = {
  baseline: 'baseline',
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch',
};

interface ContainerProps {
  flex: FlexDirectionOption;
  justify: JustifyContentOption;
  items: AlignItemsOption;
  gap: string;
  padding: string;
  width?: string;
  height?: string;
  flexWrap: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: ${({ flex }) => flexDirectionValue[flex]};
  justify-content: ${({ justify }) => justifyContentValue[justify]};
  align-items: ${({ items }) => alignItemsValue[items]};
  gap: ${({ gap }) => gap};
  padding: ${({ padding }) => padding};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  flex-wrap: ${({ flexWrap }) => flexWrap && 'wrap'};
`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  flex?: FlexDirectionOption;
  justify?: JustifyContentOption;
  items?: AlignItemsOption;
  gap?: string;
  padding?: string;
  width?: string;
  height?: string;
  flexWrap?: boolean;
}

const Flexbox: React.FC<Props> = ({
  children,
  flex = 'row',
  justify = 'center',
  items = 'center',
  gap = '0',
  padding = '0',
  width,
  height,
  flexWrap = false,
  ...props
}) => {
  return (
    <Container
      flex={flex}
      justify={justify}
      items={items}
      gap={gap}
      padding={padding}
      width={width}
      height={height}
      flexWrap={flexWrap}
      {...props}
    >
      {children}
    </Container>
  );
};

export default React.memo(Flexbox);
