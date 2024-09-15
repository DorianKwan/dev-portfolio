import styled from '@emotion/styled';
import { pxToRem } from '~/theme';
import { Heading } from '../../common';

interface AboutCardProps {
  readonly icon: React.ReactNode;
  readonly title: string;
  readonly children: React.ReactNode;
}

export const AboutCard: React.FC<AboutCardProps> = ({
  icon,
  title,
  children,
}) => {
  return (
    <Card>
      <TitleWrapper>
        <IconWrapper>{icon}</IconWrapper>
        <Heading type="h2" fontSize="1.75rem">
          {title}
        </Heading>
      </TitleWrapper>
      {children}
    </Card>
  );
};

const Card = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 1.25rem;
  background-color: rgba(255, 255, 255, 0.035);
  border-radius: 1rem;
  padding: 2rem;

  * {
    text-align: left;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  * {
    line-height: 1;
  }
`;

const IconWrapper = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  margin-top: -0.25rem;
  color: white;

  > svg {
    width: 100%;
    height: 100%;
  }
`;
