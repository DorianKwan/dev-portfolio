import React from 'react';
import styled from '@emotion/styled';

type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps {
  readonly type?: HeadingType;
  readonly className?: string;
  readonly children: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({
  type,
  children,
  className,
}) => {
  switch (type) {
    case 'h1':
      return <H1 className={className}>{children}</H1>;
    case 'h2':
      return <H2 className={className}>{children}</H2>;
    case 'h3':
      return <H3 className={className}>{children}</H3>;
    case 'h4':
      return <H4 className={className}>{children}</H4>;
    case 'h5':
      return <H5 className={className}>{children}</H5>;
    case 'h6':
      return <H6 className={className}>{children}</H6>;
    default:
      return <H1 className={className}>{children}</H1>;
  }
};

interface HeadingTextProps {}

const H1 = styled.h1<HeadingTextProps>``;

const H2 = styled.h2<HeadingTextProps>``;

const H3 = styled.h3<HeadingTextProps>``;

const H4 = styled.h4<HeadingTextProps>``;

const H5 = styled.h5<HeadingTextProps>``;

const H6 = styled.h6<HeadingTextProps>``;
