# Svelte-Animate

[Doc/demo](https://svelte-animate.codewithshin.com/)

Svelte Animate is a lightweight, accessible Svelte component that wraps Animate.css, simplifying animation integration in Svelte applications. It offers advanced features like: Sequential animation effects, Configurable trigger modes (hover, click, auto), Accessibility-first design, Reduced motion support, Flexible repeat and timing controls.
Designed for Svelte's latest features, it provides more sophisticated animation capabilities than standard Svelte transitions.

## Feature Details

- 🎯 Easy to use wrapper for Animate.css
- 🎨 95+ animation effects out of the box
- 🔄 Ability to chain multiple animations in a sequence
- 🔄 Multiple trigger options (hover, click, auto, or both)
- ♿ Comprehensive accessibility features including:
  - Keyboard support (Enter/Space for click triggers)
  - Screen reader announcements
  - Respects prefers-reduced-motion
  - ARIA attributes and live regions
- ⚙️ Extensive animation customization:
  - Customizable duration
  - Animation delays
  - Per-animation configuration
  - Repeat functionality
- 🎭 Optional hide-after-animation and hide-between-animations features
- 🔄 Optional replay button for ended animations
- 🐛 Debug mode for development

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
<Animate animations="fadeIn" trigger="click" duration={2000} delay={1000} repeat="2">
  <div>Click me for a customized animation experience!</div>
</Animate>

<Animate
  animations={[
    { action: 'fadeIn', duration: 1000, delay: 500 },
    { action: 'zoomOut', duration: 2000, pause: 1000 }
  ]}
  trigger="click"
  hideBetween={true}
  hideEnd={true}
  showReplayButton={true}
>
  <div>Click me for a customized animation sequence!</div>
</Animate>
```

## Props

| Prop               | Type                                                        | Default    | Description                                      |
| ------------------ | ----------------------------------------------------------- | ---------- | ------------------------------------------------ |
| `children`         | `Snippet`                                                   | _Required_ | The content to be animated                       |
| `animations`       | `AnimationConfig[]` \| `AnimationType[]` \| `AnimationType` | `'bounce'` | The animation effects to apply                   |
| `trigger`          | `'hover'` \| `'click'` \| `'both'` \| `'auto'`              | `'hover'`  | What triggers the animation                      |
| `duration`         | `number`                                                    | `1000`     | Default animation duration (ms)                  |
| `hideBetween`      | `boolean`                                                   | `false`    | Whether to hide element between animations       |
| `hideEnd`          | `boolean`                                                   | `false`    | Whether to hide element after animation sequence |
| `delay`            | `number`                                                    | `0`        | Default delay before animations start (ms)       |
| `repeat`           | `'1'` \| `'2'` \| `'3'` \| `'infinite'`                     | `'1'`      | Number of times to repeat the animation          |
| `pauseDuration`    | `number`                                                    | `0`        | Default pause between animations (ms)            |
| `class`            | `string`                                                    | `''`       | Additional CSS classes for the container         |
| `debug`            | `boolean`                                                   | `false`    | Enable debug mode with visible status updates    |
| `showReplayButton` | `boolean`                                                   | `false`    | Show replay button after animation ends          |

### AnimationConfig Interface

When using the `animations` prop with detailed configuration:

```typescript
interface AnimationConfig {
  action: AnimationType; // The animation effect to apply
  duration?: number; // Duration for this specific animation
  delay?: number; // Delay before this animation starts
  pause?: number; // Pause after this animation
}
```

## Examples

### Basic Hover Animation

```svelte
<Animate>
  <button>Hover to bounce!</button>
</Animate>
```

### Click Animation with Delay

```svelte
<Animate animations="rubberBand" trigger="click" delay={2000} duration={1000}>
  <div>Click for a delayed effect!</div>
</Animate>
```

### Complex Animation Sequence

```svelte
<Animate
  animations={[
    { action: 'fadeIn', duration: 1000 },
    { action: 'pulse', duration: 500, pause: 1000 },
    { action: 'fadeOut', duration: 1000 }
  ]}
  trigger="both"
  repeat="3"
  showReplayButton={true}
>
  <span>Complex animation sequence!</span>
</Animate>
```

### Debug Mode Example

```svelte
<Animate animations="bounce" trigger="click" debug={true}>
  <div>Watch the debug info in the corner!</div>
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
