import type { SVGAttributes } from 'svelte/elements';
type TitleType = {
  id?: string;
  title?: string;
};

type DescType = {
  id?: string;
  desc?: string;
};

export interface BaseProps extends SVGAttributes<SVGElement> {
  size?: string | number;
  role?: string;
  color?: string;
  strokeWidth?: string;
  duration?: number;
  pauseDuration?: number;
  rotationDegrees?: number;
  swingCount?: number;
}

export interface Props extends BaseProps {
  title?: TitleType;
  desc?: DescType;
  ariaLabel?: string;
}
