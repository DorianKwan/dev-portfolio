import { BaseIcon } from './BaseIcon';

interface IconProps {
  hoverColor?: React.CSSProperties['color'];
  size?: React.CSSProperties['height'] | React.CSSProperties['width'];
}

export const EmailSVG: React.FC = () => {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 8l-8 5-8-5V6l8 5 8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z" />
    </svg>
  );
};

export const EmailIcon: React.FC<IconProps> = props => {
  return <BaseIcon icon={<EmailSVG />} {...props} />;
};
