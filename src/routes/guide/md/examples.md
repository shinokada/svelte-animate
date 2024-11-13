// Basic Hover Animation
<Animate>
<button>Hover to bounce!</button>
</Animate>

// Click Animation with Delay and Speed
<Animate animations="rubberBand" trigger="click" delay="2s" speed="slow">

  <div>Click for a slow, delayed effect!</div>
</Animate>

// Repeating Animation Sequence with Custom Duration
<Animate animations={['pulse', 'tada']} trigger="both" duration="0.5s" repeat="3">
<span>I'll pulse and tada three times!</span>
</Animate>

// Entrance and Exit Animations with Hide Options
<Animate animations={['fadeInUp', 'fadeOutDown']} trigger="click" hideBetween={true} hideEnd={true} duration="1.5s">

  <div>I'll fade in, then out!</div>
</Animate>
