# Svelte-Animate

A lightweight, accessible Svelte component wrapper for Animate.css that makes adding animations to your Svelte applications simple and intuitive. Built with accessibility in mind and designed to work seamlessly with Svelte's latest features.

## Features

- 🎯 Easy to use wrapper for Animate.css
- 🎨 75+ animation effects out of the box
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
- 🎭 Optional hide-after-animation feature

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
<Animate animation="fadeIn" trigger="click" duration="2s" delay="1s" speed="slow" repeat={2} hideAfter={true}>
  <div>Click me for a customized animation experience!</div>
</Animate>
```

## Props

| Prop        | Type                                             | Default     | Description                             |
| ----------- | ------------------------------------------------ | ----------- | --------------------------------------- |
| `children`  | `Snippet`                                        | _Required_  | The content to be animated              |
| `animation` | `AnimationType`                                  | `'bounce'`  | The animation effect to apply           |
| `trigger`   | `'hover'` \| `'click'` \| `'both'`               | `undefined` | What triggers the animation             |
| `duration`  | `string`                                         | `'1s'`      | Animation duration (CSS time value)     |
| `hideAfter` | `boolean`                                        | `false`     | Whether to hide element after animation |
| `delay`     | `'1s'` \| `'2s'` \| `'3s'` \| `'4s'` \| `'5s'`   | `undefined` | Delay before animation starts           |
| `speed`     | `'slower'` \| `'slow'` \| `'fast'` \| `'faster'` | `undefined` | Animation speed modifier                |
| `repeat`    | `number`                                         | `undefined` | Number of times to repeat the animation |

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
<Animate animation="rubberBand" trigger="click" delay="2s" speed="slow">
  <div>Click for a slow, delayed effect!</div>
</Animate>
```

### Repeating Animation with Custom Duration

```svelte
<Animate animation="pulse" trigger="both" duration="0.5s" repeat={3}>
  <span>I'll pulse three times!</span>
</Animate>
```

### Entrance Animation with Hide After

```svelte
<Animate animation="fadeInUp" trigger="click" hideAfter={true} duration="1.5s">
  <div>I'll fade in and then disappear!</div>
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

## Changelog

### 1.0.0

- Initial release
- Basic animation support
- Accessibility features
- Customization options

For a complete list of changes, please see the [CHANGELOG.md](./CHANGELOG.md) file.
