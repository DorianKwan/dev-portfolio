import { useLayoutEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { Heading } from '~/app/components/common/Heading/Heading';
import { theme } from '~/theme/theme';
import { hexToRGBA, interpolateHex, pxToRem } from '~/theme/utils';
import { timelineData } from './timeline.data';

export const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const container = containerRef.current;

    const nodes = nodeRefs.current.filter(
      (n): n is HTMLDivElement => n !== null,
    );

    if (!container || nodes.length < 2) return;

    const update = () => {
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const barTop = first.offsetTop + first.offsetHeight / 2;
      const barBottom = last.offsetTop + last.offsetHeight / 2;

      container.style.setProperty('--bar-top', `${barTop}px`);
      container.style.setProperty('--bar-height', `${barBottom - barTop}px`);
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(container);

    nodes.forEach(node => ro.observe(node));

    return () => ro.disconnect();
  }, []);

  const total = timelineData.length;

  return (
    <TimelineContainer ref={containerRef}>
      {timelineData.map(({ key, title, time, content }, i) => {
        const dotColor = interpolateHex(
          theme.colors.experienceOne,
          theme.colors.experienceFive,
          total > 1 ? i / (total - 1) : 0,
        );
        return (
          <ExperienceWrapper
            key={key}
            ref={node => {
              nodeRefs.current[i] = node;
            }}
            style={{ '--dot-color': dotColor } as React.CSSProperties}>
            <ExperienceHeading>{title}</ExperienceHeading>
            <ExperienceTime>{time}</ExperienceTime>
            <ExperienceText>{content}</ExperienceText>
          </ExperienceWrapper>
        );
      })}
    </TimelineContainer>
  );
};

const experienceBreakpoint = theme.breakpoints.md;

const TimelineContainer = styled.section`
  position: relative;
  display: grid;
  grid-template-rows: repeat(5, auto);
  gap: 2rem 1rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  max-width: ${pxToRem(1000)};

  @media only screen and (min-width: ${experienceBreakpoint}) {
    margin: 2rem 0;
    grid-template-columns: 1fr 1fr;
  }

  &::after {
    content: '';
    position: absolute;
    height: var(--bar-height, 80%);
    top: var(--bar-top, 7.5%);
    left: 0.75rem;
    width: ${pxToRem(8)};
    background: ${({ theme }) =>
      `linear-gradient(${theme.colors.experienceOne}, ${theme.colors.experienceFive})`};

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
    border: 0.325rem solid var(--dot-color);
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;

    @media only screen and (min-width: ${experienceBreakpoint}) {
      width: 1.5rem;
      height: 1.5rem;
      border-width: 0.4rem;
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
