import styled from '@emotion/styled';
import { BebasNeue } from '~/app/fonts';
import { hexToRGBA, pxToRem } from '~/theme';

export enum AvailabilityStatus {
  Available = 'available',
  NotAvailable = 'not-available',
}

interface AvailabilityProps {
  availability: AvailabilityStatus;
}

export const Availability: React.FC<AvailabilityProps> = ({ availability }) => {
  const availabilityText =
    availability === AvailabilityStatus.Available
      ? 'Available For Work'
      : 'Not Available For Work';

  return (
    <AvailabilityWrapper>
      <StatusCircle availability={availability} />
      <AvailabilityText>{availabilityText}</AvailabilityText>
    </AvailabilityWrapper>
  );
};

const AvailabilityWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: fit-content;
  padding: 0.75rem 1.325rem;
  border-radius: 2rem;
  background-color: ${({ theme }) =>
    hexToRGBA(theme.colors.availabilityBg, 0.5)};
  border: solid ${pxToRem(1.5)};
  border-color: ${({ theme }) => theme.colors.availabilityBorder};
  color: ${({ theme }) => theme.colors.white};
`;

const StatusCircle = styled.span<{ availability: AvailabilityStatus }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 100%;
  background-color: ${({ availability, theme }) =>
    availability === AvailabilityStatus.NotAvailable
      ? theme.colors.statusNotAvailable
      : theme.colors.statusAvailable};
  filter: drop-shadow(
    0 0 0.325rem
      ${({ availability, theme }) =>
        availability === AvailabilityStatus.NotAvailable
          ? theme.colors.statusNotAvailable
          : theme.colors.statusAvailable}
  );
`;

const AvailabilityText = styled.p`
  font-size: 1.25rem;
  font-family: ${BebasNeue.style.fontFamily};
  color: ${({ theme }) => theme.colors.white};
`;
