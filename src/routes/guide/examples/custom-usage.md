<Animate animation="fadeIn" trigger="click" duration="2s" delay="1s" speed="slow" repeat={2}>
  <div>Click me for a customized animation experience!</div>
</Animate>

<Animate animations={['fadeIn', 'zoomOut']} trigger="click" duration="2s" delay="1s" speed="slow" repeat="2" hideBetween={true} hideEnd={true}>
  <div>Click me for a customized animation sequence!</div>
</Animate>
