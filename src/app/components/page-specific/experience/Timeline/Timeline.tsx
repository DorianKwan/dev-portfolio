import styled from '@emotion/styled';
import { useMemo } from 'react';
import { Heading } from '~/app/components/common';
import { hexToRGBA, pxToRem, theme } from '~/theme';
import { timelineData } from './timeline.data';

export const Timeline: React.FC = () => {
  const timeline = useMemo(() => {
    return timelineData.map(({ key, title, time, content }) => {
      return (
        <ExperienceWrapper key={key}>
          <ExperienceHeading>{title}</ExperienceHeading>
          <ExperienceTime>{time}</ExperienceTime>
          <ExperienceText>{content}</ExperienceText>
        </ExperienceWrapper>
      );
    });
  }, []);

  return <TimelineContainer>{timeline}</TimelineContainer>;
};

const experienceBreakpoint = theme.breakpoints.sm;

const TimelineContainer = styled.section`
  position: relative;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 3rem;
  margin-bottom: 1rem;
  max-width: ${pxToRem(1000)};

  @media only screen and (min-width: ${experienceBreakpoint}) {
    margin: 3rem 0;
    grid-template-columns: 1fr 1fr;
  }

  &::after {
    content: '';
    position: absolute;
    height: 75%;
    top: 12.5%;
    left: 0.75rem;
    width: ${pxToRem(8)};
    background: ${({ theme }) =>
      `linear-gradient(${theme.colors.experienceOne}, ${theme.colors.experienceFour})`};

    @media only screen and (min-width: ${experienceBreakpoint}) {
      width: ${pxToRem(9)};
      left: unset;
      place-self: center;
    }
  }
`;

const ExperienceWrapper = styled.div`
  position: relative;
  padding: 1.5rem 0;

  @media only screen and (min-width: ${experienceBreakpoint}) {
    padding: 1rem 0;
    grid-column: 1 / 3;
    width: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    border-radius: 100%;
    background-color: ${({ theme }) => theme.colors.white};
    width: 1.325rem;
    height: 1.325rem;
    border: 0.325rem solid;
    top: 45%;
    z-index: 1;

    @media only screen and (min-width: ${experienceBreakpoint}) {
      width: 1.5rem;
      height: 1.5rem;
      border: 0.4rem solid;
    }
  }

  &:nth-of-type(even) {
    place-self: flex-end;
    padding-left: 4rem;

    &::after {
      left: 0.325rem;

      @media only screen and (min-width: ${experienceBreakpoint}) {
        left: -0.75rem;
      }
    }
  }

  &:nth-of-type(odd) {
    padding-left: 4rem;

    @media only screen and (min-width: ${experienceBreakpoint}) {
      padding-left: 0;
      padding-right: 4rem;
    }

    &::after {
      left: 0.325rem;

      @media only screen and (min-width: ${experienceBreakpoint}) {
        left: unset;
        right: -0.75rem;
      }
    }
  }

  &:nth-of-type(1) {
    &::after {
      border-color: ${({ theme }) => theme.colors.experienceOne};
      top: 47.5%;

      @media only screen and (min-width: ${experienceBreakpoint}) {
        top: 45%;
      }
    }
  }

  &:nth-of-type(2) {
    &::after {
      border-color: ${({ theme }) => theme.colors.experienceTwo};
    }
  }

  &:nth-of-type(3) {
    &::after {
      border-color: ${({ theme }) => theme.colors.experienceThree};
    }
  }

  &:nth-of-type(4) {
    &::after {
      border-color: ${({ theme }) => theme.colors.experienceFour};

      @media only screen and (min-width: ${experienceBreakpoint}) {
        top: 40%;
      }
    }
  }
`;

const ExperienceHeading = styled(Heading)`
  font-size: 2rem;
`;

const ExperienceTime = styled.small`
  font-weight: 500;
  font-size: 0.875rem;
  color: ${({ theme }) => hexToRGBA(theme.colors.white, 0.6)};
`;

const ExperienceText = styled.p``;
