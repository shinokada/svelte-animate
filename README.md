# Svelte-Animate

A lightweight, accessible Svelte component wrapper for Animate.css that makes adding animations to your Svelte applications simple and intuitive. Built with accessibility in mind and designed to work seamlessly with Svelte's latest features, including the ability to animate multiple effects in a sequence.

## Features

- 🎯 Easy to use wrapper for Animate.css
- 🎨 75+ animation effects out of the box
- 🔄 Ability to chain multiple animations in a sequence
- 🔄 Multiple trigger options (hover, click, or both)
- ⚡ Zero dependencies (except Animate.css)
- ♿ Comprehensive accessibility features including:
  - Keyboard support (Enter/Space for click triggers)
  - Screen reader announcements
  - Respects prefers-reduced-motion
  - ARIA attributes and live regions
- ⚙️ Extensive animation customization:
  - Customizable duration
  - Animation delays
  - Animation speed control
  - Repeat functionality
- 🎭 Optional hide-after-animation and hide-between-animations features

## Installation

```bash
npm install -D svelte-animate
# or
pnpm install -D svelte-animate
# or
yarn add -D svelte-animate
```

## Usage

1. Import the component:

```svelte
import {Animate} from 'svelte-animate';
```

2. Basic usage:

```svelte
<Animate>
  <div>This will bounce on hover!</div>
</Animate>
```

3. Advanced usage:

```svelte
<Animate animation="fadeIn" trigger="click" duration="2s" delay="1s" speed="slow" repeat={2}>
  <div>Click me for a customized animation experience!</div>
</Animate>

<Animate animations={['fadeIn', 'zoomOut']} trigger="click" duration="2s" delay="1s" speed="slow" repeat="2" hideBetween={true} hideEnd={true}>
  <div>Click me for a customized animation sequence!</div>
</Animate>
```

## Props

| Prop            | Type                                              | Default      | Description                                      |
| --------------- | ------------------------------------------------- | ------------ | ------------------------------------------------ |
| `children`      | `Snippet`                                         | _Required_   | The content to be animated                       |
| `animations`    | `AnimationType[]` or `AnimationType`              | `['bounce']` | The animation effects to apply                   |
| `trigger`       | `'hover'` \| `'click'` \| `'both'` \| `'auto'`    | `undefined`  | What triggers the animation                      |
| `duration`      | `string`                                          | `'1s'`       | Animation duration (CSS time value)              |
| `hideBetween`   | `boolean`                                         | `false`      | Whether to hide element between animations       |
| `hideEnd`       | `boolean`                                         | `false`      | Whether to hide element after animation sequence |
| `delay`         | `string`                                          | `undefined`  | Delay before first animation starts              |
| `speed`         | `'slower'` \| `'slow'` \| `'fast'` \| `'faster'`  | `undefined`  | Animation speed modifier                         |
| `repeat`        | `string` (`'1'`, `'2'`, `'3'`, ..., `'infinite'`) | `'1'`        | Number of times to repeat the animation          |
| `pauseDuration` | `number`                                          | `0`          | Pause duration between animations (ms)           |
| `class`         | `string`                                          | `''`         | Additional CSS classes for the container         |

## Accessibility Features

### Keyboard Support

- Full keyboard navigation support
- Enter and Space keys trigger animations for click/both triggers
- Proper focus management
- Event prevention to avoid unexpected behavior

### Screen Reader Support

- Descriptive ARIA labels for animated elements
- Animation completion announcements using aria-live regions
- Clear state changes communication

### Motion Preferences

- Automatically detects and respects prefers-reduced-motion settings
- Gracefully degrades to no animation when reduced motion is preferred
- Maintains content visibility and functionality

## Examples

### Basic Hover Animation

```svelte
<Animate>
  <button>Hover to bounce!</button>
</Animate>
```

### Click Animation with Delay and Speed

```svelte
<Animate animations="rubberBand" trigger="click" delay="2s" speed="slow">
  <div>Click for a slow, delayed effect!</div>
</Animate>
```

### Repeating Animation Sequence with Custom Duration

```svelte
<Animate animations={['pulse', 'tada']} trigger="both" duration="0.5s" repeat="3">
  <span>I'll pulse and tada three times!</span>
</Animate>
```

### Entrance and Exit Animations with Hide Options

```svelte
<Animate animations={['fadeInUp', 'fadeOutDown']} trigger="click" hideBetween={true} hideEnd={true} duration="1.5s">
  <div>I'll fade in, then out!</div>
</Animate>
```

## Browser Support

Supports all modern browsers that support:

- Animate.css
- Svelte
- CSS animations
- Media queries (for reduced motion detection)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. When contributing, please:

1. Ensure your code follows the existing style
2. Add/update tests as needed
3. Update documentation to reflect any changes
4. Follow the existing commit message format

## License

MIT

## Credits

This component is powered by [Animate.css](https://animate.style/).
