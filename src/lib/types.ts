import type { HTMLButtonAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';
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
  | 'slideOutUp';

export type TriggerType = 'hover' | 'click' | 'both' | undefined;
export type AutoTriggerType = 'hover' | 'click' | 'both' | 'auto' | undefined;

export type DurationType = '1s' | '2s' | '3s' | '800ms' | '500ms';
export type DelayType = '0s' | '1s' | '2s' | '3s' | '4s' | '5s';
export type RepeatType = '1' | '2' | '3' | 'infinite';
export type PauseDurationType = '0s' | '500ms' | '800ms' | '1s' | '2s';

export interface AnimationProps extends HTMLButtonAttributes {
  animation?: AnimationType;
  trigger?: TriggerType;
  duration?: DurationType;
  children: Snippet;
  hideAfter?: boolean;
  delay?: DelayType;
  repeat?: RepeatType;
}

export interface EnhancedAnimationProps extends HTMLButtonAttributes {
  animations?: AnimationType[] | AnimationType;
  trigger?: AutoTriggerType;
  duration?: string;
  children: Snippet;
  hideBetween?: boolean;
  hideEnd?: boolean;
  delay?: number;
  repeat?: RepeatType;
  pauseDuration?: number;
  class?: string;
}
