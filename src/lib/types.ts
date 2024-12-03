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

export type AutoTriggerType = 'hover' | 'click' | 'both' | 'auto' | undefined;
export type RepeatType = '1' | '2' | '3' | 'infinite';

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

export interface AnimationConfig {
  action: AnimationType;
  duration?: number;
  delay?: number;
  pause?: number;
}

export interface AnimationProps extends HTMLButtonAttributes {
  animations?: AnimationConfig[] | AnimationType[] | AnimationType;
  trigger?: AutoTriggerType;
  duration?: number;
  children: Snippet;
  hideEnd?: boolean;
  delay?: number; // default delay for all animations
  repeat?: RepeatType;
  pauseDuration?: number; // default pause for all animations
  class?: string;
  debug?: boolean;
  showReplayButton?: boolean;
  hideFor?: number;
}

export interface AnimatorProps extends HTMLButtonAttributes {
  animations?: AnimationConfig[] | AnimationType[] | AnimationType;
  duration?: number;
  children: Snippet;
  hideEnd?: boolean;
  delay?: number; // default delay for all animations
  pauseDuration?: number; // default pause for all animations
  class?: string;
  debug?: boolean;
  hideFor?: number;
  action?: boolean;
}
