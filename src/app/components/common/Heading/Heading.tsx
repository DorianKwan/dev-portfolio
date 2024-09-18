import React from 'react';
import styled from '@emotion/styled';

type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps {
  readonly children: React.ReactNode;
  readonly type?: HeadingType;
  readonly className?: string;
  readonly fontSize?: React.CSSProperties['fontSize'];
  readonly marginBottom?: React.CSSProperties['marginBottom'];
}

export const Heading: React.FC<HeadingProps> = ({
  type,
  children,
  ...rest
}) => {
  switch (type) {
    case 'h1':
      return <H1 {...rest}>{children}</H1>;
    case 'h2':
      return <H2 {...rest}>{children}</H2>;
    case 'h3':
      return <H3 {...rest}>{children}</H3>;
    case 'h4':
      return <H4 {...rest}>{children}</H4>;
    case 'h5':
      return <H5 {...rest}>{children}</H5>;
    case 'h6':
      return <H6 {...rest}>{children}</H6>;
    default:
      return <H1 {...rest}>{children}</H1>;
  }
};

interface HeadingTextProps {
  readonly fontSize?: React.CSSProperties['fontSize'];
  readonly marginBottom?: React.CSSProperties['marginBottom'];
}

const H1 = styled.h1<HeadingTextProps>`
  font-size: ${({ fontSize }) => fontSize ?? '5rem'};
  margin-bottom: ${({ marginBottom }) => marginBottom ?? 'initial'};
`;

const H2 = styled.h2<HeadingTextProps>`
  font-size: ${({ fontSize }) => fontSize ?? '2.5rem'};
  margin-bottom: ${({ marginBottom }) => marginBottom ?? 'initial'};
`;

const H3 = styled.h3<HeadingTextProps>`
  font-size: ${({ fontSize }) => fontSize ?? '1.5rem'};
  margin-bottom: ${({ marginBottom }) => marginBottom ?? 'initial'};
`;

const H4 = styled.h4<HeadingTextProps>`
  font-size: ${({ fontSize }) => fontSize ?? '1.25rem'};
  margin-bottom: ${({ marginBottom }) => marginBottom ?? 'initial'};
`;

const H5 = styled.h5<HeadingTextProps>`
  font-size: ${({ fontSize }) => fontSize ?? '1rem'};
  margin-bottom: ${({ marginBottom }) => marginBottom ?? 'initial'};
`;

const H6 = styled.h6<HeadingTextProps>`
  font-size: ${({ fontSize }) => fontSize ?? '1rem'};
  margin-bottom: ${({ marginBottom }) => marginBottom ?? 'initial'};
`;
