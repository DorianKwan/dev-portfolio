import { BaseIcon } from './BaseIcon';

interface IconProps {
  hoverColor?: React.CSSProperties['color'];
  size?: React.CSSProperties['height'] | React.CSSProperties['width'];
}

export const DownloadSVG: React.FC = () => {
  return (
    <svg
      width="21"
      height="23"
      viewBox="0 0 21 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.374939 20.575H20.6249V22.825H0.374939V20.575ZM11.6249 9.325H19.4999L10.4999 18.325L1.49994 9.325H9.37494V0.324997H11.6249V9.325Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const DownloadIcon: React.FC<IconProps> = props => {
  return <BaseIcon icon={<DownloadSVG />} {...props} />;
};
