# Svelte-Animate

A lightweight, accessible Svelte component wrapper for Animate.css that makes adding animations to your Svelte applications simple and intuitive.

## Features

- 🎯 Easy to use wrapper for Animate.css
- 🎨 75+ animation effects out of the box 
- 🔄 Multiple trigger options (hover, click, or both)
- ⚡ Zero dependencies (except Animate.css)
- ♿ Accessibility features including:
  - Keyboard support (Enter/Space for click triggers)
  - Screen reader announcements
  - Respects prefers-reduced-motion
  - ARIA attributes
- ⚙️ Customizable animation duration
- 🎭 Optional hide-after-animation feature

## Installation

```bash
pnpm i -D svelte-animate
```

## Usage

1. Import the component:

```svelte
import { Animate } from 'svelte.animate';
```

2. Basic usage:

```svelte
<Animate>
  <div>This will bounce on hover!</div>
</Animate>
```

3. Customized usage:

```svelte
<Animate
  animation="fadeIn"
  trigger="click"
  duration="2s"
  hideAfter={true}
>
  <div>Click me to fade in, then I'll disappear!</div>
</Animate>
```

## Props

| Prop        | Type                               | Default    | Description                                 |
| ----------- | ---------------------------------- | ---------- | ------------------------------------------- |
| `children`  | `Snippet`                          | *Required* | The content to be animated                  |
| `animation` | `AnimationType`                    | `'bounce'` | The animation effect to apply               |
| `trigger`   | `'hover'` \| `'click'` \| `'both'` | `'hover'`  | What triggers the animation                 |
| `duration`  | `string`                           | `'1s'`     | Animation duration (CSS time value)         |
| `hideAfter` | `boolean`                          | `false`    | Whether to hide the element after animation |

## Accessibility Features

The component includes several accessibility enhancements:

1. **Keyboard Support**: 
   - Enter and Space keys trigger animations when using 'click' or 'both' triggers
   - Proper event prevention to avoid unexpected behavior

2. **Screen Reader Support**:
   - ARIA labels describe the animation purpose
   - Animation completion announcements
   - Uses `aria-live="polite"` for non-intrusive updates

3. **Motion Preferences**:
   - Respects user's prefers-reduced-motion settings
   - Animations are disabled when reduced motion is preferred

## Animation Types

The component supports all Animate.css animations. Here are some popular options:

### Attention Seekers
- bounce
- flash
- pulse
- rubberBand
- shakeX/Y
- swing
- tada
- wobble

### Entrances
- bounceIn
- fadeIn
- flipInX/Y
- lightSpeedInRight/Left
- rotateIn
- zoomIn
- slideIn

### Exits
- bounceOut
- fadeOut
- flipOutX/Y
- lightSpeedOutRight/Left
- rotateOut
- zoomOut
- slideOut

[See the full list of supported animations in the types definition](./types.ts)

## Keyboard Support

The component provides keyboard interaction based on the `trigger` prop:

- When `trigger` is set to `'click'` or `'both'`:
  - Users can Tab to focus the component
  - Pressing Enter or Space will trigger the animation
  - Space key's default scroll behavior is prevented

- When `trigger` is set to `'hover'`:
  - Users can Tab to focus the component
  - Keyboard keys won't trigger the animation

Example with keyboard support:
```svelte
<Animate trigger="click">
  <div>Tab to focus me, then press Enter or Space!</div>
</Animate>
```

Example with keyboard and hover triggers:
```svelte
<Animate animation="bounce" trigger="both">
  <div>Press Tab to focus, then Enter/Space to animate (also works with hover)</div>
</Animate>
```

Example without keyboard triggers:
```svelte
<Animate trigger="hover">
  <div>Keyboard keys won't animate me, only hover will work</div>
</Animate>
```

## Examples

### Basic Hover Animation
```svelte
<Animate>
  <button>Hover to bounce!</button>
</Animate>
```

### Click-Triggered Animation
```svelte
<Animate animation="rubberBand" trigger="click">
  <div>Click me!</div>
</Animate>
```

### Combined Trigger with Custom Duration
```svelte
<Animate
  animation="tada"
  trigger="both"
  duration="0.5s"
>
  <span>Hover or click me!</span>
</Animate>
```

### Entrance Animation with Hide After
```svelte
<Animate
  animation="fadeInUp"
  trigger="click"
  hideAfter={true}
>
  <div>I'll fade in and then disappear!</div>
</Animate>
```

## Browser Support

Supports all modern browsers that support Animate.css and Svelte.

## Documentation

For full documentation, visit [https://svelte-animate.codewithshin.com/](https://svelte-animate.codewithshin.com/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Credits

This component is powered by [Animate.css](https://animate.style/).