import type { AnimationConfig } from './types.ts';

export const predefined = {
  // Emotional Journey
  hesitantConfidence: [
    { action: 'shakeX', duration: 1000 },
    { action: 'swing', duration: 1000 },
    { action: 'tada', duration: 1000 }
  ],
  surprisedDelight: [
    { action: 'shakeY', duration: 1000 },
    { action: 'bounce', duration: 1000 },
    { action: 'heartBeat', duration: 1000 }
  ],

  // Physical Struggle
  wrestlingGravity: [
    { action: 'fadeOutDown', duration: 1000 },
    { action: 'bounce', duration: 1000 },
    { action: 'rollIn', duration: 1000 }
  ],
  stumblingTriumph: [
    { action: 'wobble', duration: 1000 },
    { action: 'pulse', duration: 1000 },
    { action: 'jackInTheBox', duration: 1000 }
  ],

  // Tension and Release
  nervousBuild: [
    { action: 'headShake', duration: 1000 },
    { action: 'pulse', duration: 1000 },
    { action: 'tada', duration: 1000 }
  ],
  suspensefulUnveiling: [
    { action: 'fadeIn', duration: 1000 },
    { action: 'zoomIn', duration: 1000 },
    { action: 'swing', duration: 1000 }
  ],

  // Dramatic Transformation
  brokenToReborn: [
    { action: 'hinge', duration: 1000 },
    { action: 'bounce', duration: 1000 },
    { action: 'heartBeat', duration: 1000 }
  ],
  chaosToOrder: [
    { action: 'shakeX', duration: 1000 },
    { action: 'rubberBand', duration: 1000 },
    { action: 'swing', duration: 1000 }
  ],

  // Emotional Resilience
  fallingApart: [
    { action: 'fadeOutDown', duration: 1000 },
    { action: 'shakeY', duration: 1000 },
    { action: 'bounce', duration: 1000 }
  ],
  overwhelmedToCalm: [
    { action: 'wobble', duration: 1000 },
    { action: 'pulse', duration: 1000 },
    { action: 'lightSpeedInRight', duration: 1000 }
  ],

  // Journey of Discovery
  cautious: [
    { action: 'headShake', duration: 1000 },
    { action: 'fadeIn', duration: 1000 },
    { action: 'tada', duration: 1000 }
  ],
  revelation: [
    { action: 'fadeInLeft', duration: 1000 },
    { action: 'zoomIn', duration: 1000 },
    { action: 'swing', duration: 1000 }
  ],

  // Life Stages
  growthCycle: [
    { action: 'backInDown', duration: 1000 },
    { action: 'pulse', duration: 1000 },
    { action: 'fadeOutUp', duration: 1000 }
  ],
  adventureQuest: [
    { action: 'fadeInRight', duration: 1000 },
    { action: 'tada', duration: 1000 },
    { action: 'zoomOutDown', duration: 1000 }
  ],

  // Emotional Arcs
  resilientSpirit: [
    { action: 'fadeInLeft', duration: 1000 },
    { action: 'shakeY', duration: 1000 },
    { action: 'bounceOut', duration: 1000 }
  ],
  passionateEncounter: [
    { action: 'zoomIn', duration: 1000 },
    { action: 'swing', duration: 1000 },
    { action: 'lightSpeedOutRight', duration: 1000 }
  ],

  // Performance Dynamics
  stagePresence: [
    { action: 'backInUp', duration: 1000 },
    { action: 'heartBeat', duration: 1000 },
    { action: 'fadeOutDown', duration: 1000 }
  ],
  dramaticTension: [
    { action: 'fadeInDownBig', duration: 1000 },
    { action: 'wobble', duration: 1000 },
    { action: 'hinge', duration: 1000 }
  ],

  // Natural Metaphors
  stormCycle: [
    { action: 'slideInLeft', duration: 1000 },
    { action: 'shakeX', duration: 1000 },
    { action: 'fadeOutRight', duration: 1000 }
  ],
  phoenixRise: [
    { action: 'fadeInUp', duration: 1000 },
    { action: 'pulse', duration: 1000 },
    { action: 'rotateOutDownRight', duration: 1000 }
  ],

  // Psychological Journey
  innerStruggle: [
    { action: 'backInRight', duration: 1000 },
    { action: 'headShake', duration: 1000 },
    { action: 'rollOut', duration: 1000 }
  ],
  transformativeMoment: [
    { action: 'zoomInDown', duration: 1000 },
    { action: 'rubberBand', duration: 1000 },
    { action: 'lightSpeedOutLeft', duration: 1000 }
  ],

  // Interaction Narratives
  socialDance: [
    { action: 'slideInRight', duration: 1000 },
    { action: 'swing', duration: 1000 },
    { action: 'zoomOutUp', duration: 1000 }
  ],
  conflictResolution: [
    { action: 'fadeInLeft', duration: 1000 },
    { action: 'wobble', duration: 1000 },
    { action: 'bounceOutRight', duration: 1000 }
  ]
} satisfies Record<string, AnimationConfig[]>;
