import styled from '@emotion/styled';
import { Heading } from '~/app/components/common';

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
      <section>{children}</section>
    </Card>
  );
};

const Card = styled.article`
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 1.25rem;
  background-color: ${({ theme }) => theme.colors.aboutCardBg};
  border-radius: 1rem;
  padding: 2rem;

  * {
    text-align: left;
  }
`;

const TitleWrapper = styled.header`
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
  color: ${({ theme }) => theme.colors.white};

  > svg {
    width: 100%;
    height: 100%;
  }
`;
