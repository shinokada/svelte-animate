import type { TransitionConfig, FadeParams, BlurParams, FlyParams, SlideParams, ScaleParams, DrawParams } from "svelte/transition";

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
  transition?: TransitionFunc;
  params?: ParamsType;
  params2?: ParamsType;
}

export interface Props extends BaseProps {
  title?: TitleType;
  desc?: DescType;
  ariaLabel?: string;
}

export type TransitionTypes = "draw" |"fade" | "fly" | "slide" | "blur" | "in:fly" | "out:fly" | "in:slide" | "out:slide" | "in:fade" | "out:fade" | "in:blur" | "out:blur";

export interface TransitionParamTypes {
  delay?: number;
  duration?: number;
  easing?: (t: number) => number;
  css?: (t: number, u: number) => string | undefined | null;
  tick?: (t: number, u: number) => void;
}

export type ParamsType = FadeParams | BlurParams | FlyParams | SlideParams | ScaleParams | DrawParams ;

export type TransitionFunc = (node: HTMLElement, params: ParamsType) => TransitionConfig;

export type AnimationType = 
  | 'bounce' 
  | 'flash'
  | 'pulse' 
  | 'rubberBand'
  | 'shakeX'
  | 'shakeY'
  | 'headShake'
  | 'swing'
  | 'tada'
  | 'wobble'
  | 'jello'
  | 'heartBeat'
  | 'backInDown'
  | 'backInLeft'
  | 'backInRight'
  | 'backInUp'
  | 'backOutDown'
  | 'backOutLeft'
  | 'backOutRight'
  | 'backOutUp'
  | 'bounceIn'
  | 'bounceInDown'
  | 'bounceInLeft'
  | 'bounceInRight'
  | 'bounceInUp'
  | 'bounceOut'
  | 'bounceOutDown'
  | 'bounceOutLeft'
  | 'bounceOutRight'
  | 'bounceOutUp'
  | 'fadeIn'
  | 'fadeInDown'
  | 'fadeInDownBig'
  | 'fadeInLeft'
  | 'fadeInLeftBig'
  | 'fadeInRight'
  | 'fadeInRightBig'
  | 'fadeInUp'
  | 'fadeInUpBig'
  | 'fadeInTopLeft'
  | 'fadeInTopRight'
  | 'fadeInBottomLeft'
  | 'fadeInBottomRight'
  | 'fadeOut'
  | 'fadeOutDown'
  | 'fadeOutDownBig'
  | 'fadeOutLeft'
  | 'fadeOutLeftBig'
  | 'fadeOutRight'
  | 'fadeOutRightBig'
  | 'fadeOutUp'
  | 'fadeOutUpBig'
  | 'fadeOutTopLeft'
  | 'fadeOutTopRight'
  | 'fadeOutBottomRight'
  | 'fadeOutBottomLeft'
  | 'flip'
  | 'flipInX'
  | 'flipInY'
  | 'flipOutX'
  | 'flipOutY'
  | 'lightSpeedInRight'
  | 'lightSpeedInLeft'
  | 'lightSpeedOutRight'
  | 'lightSpeedOutLeft'
  | 'rotateIn'
  | 'rotateInDownLeft'
  | 'rotateInDownRight'
  | 'rotateInUpLeft'
  | 'rotateInUpRight'
  | 'rotateOut'
  | 'rotateOutDownLeft'
  | 'rotateOutDownRight'
  | 'rotateOutUpLeft'
  | 'rotateOutUpRight'
  | 'hinge'
  | 'jackInTheBox'
  | 'rollIn'
  | 'rollOut'
  | 'zoomIn'
  | 'zoomInDown'
  | 'zoomInLeft'
  | 'zoomInRight'
  | 'zoomInUp'
  | 'zoomOut'
  | 'zoomOutDown'
  | 'zoomOutLeft'
  | 'zoomOutRight'
  | 'zoomOutUp'
  | 'slideInDown'
  | 'slideInLeft'
  | 'slideInRight'
  | 'slideInUp'
  | 'slideOutDown'
  | 'slideOutLeft'
  | 'slideOutRight'
  | 'slideOutUp'

export type TriggerType = 'hover' | 'click' | 'both';

export interface AnimationProps {
  animation?: AnimationType;
  trigger?: TriggerType;
  duration?: string;
}