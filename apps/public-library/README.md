# Public Library

## Overview

This is an internal library within our Nx monorepo structure that contains shared components, styles, and utilities for use across the workspace applications. It is built with Tailwind CSS and provides a consistent design system.

## Library Structure

```
apps/
  ├── public-library/
  │   ├── src/
  │   │   ├── lib/
  │   │   │   └── components/
  │   │   ├── styles/
  │   │   └── index.ts
  │   ├── tailwind.config.js
  │   └── project.json
```

## Global Styles

### Font Families

The library includes two main font families:

-   `sans`: Roboto (primary font)
-   `urbanist`: Urbanist (secondary font)

Usage:

```html
<div class="font-sans">Primary Font</div>
<div class="font-urbanist">Secondary Font</div>
```

### Brand Colors

The default brand color is defined in the library's `tailwind.config.js`:

```javascript
colors: {
    brand: '#993';
}
```

### Overriding Brand Colors

To override the brand color in your application:

1. In your application's `tailwind.config.js`, extend the theme:

```javascript
module.exports = {
    theme: {
        extend: {
            colors: {
                brand: '#ff7000', // Your custom brand color
            },
        },
    },
};
```

2. Since this is an Nx monorepo, Tailwind configurations cascade based on the dependency graph. The application's configuration will take precedence over the library's configuration.

## Components

### Card Component

The library's card component can be imported directly in your application:

```typescript
import { CardComponent } from '@crx/public-library';

@Component({
  // ...
  imports: [CardComponent]
})
```

## Using in Angular Task App

### Setup

The library is already configured in the workspace's `tsconfig.base.json`:

```json
{
    "paths": {
        "@crx/public-library": ["apps/public-library/src/index.ts"]
    }
}
```

### Usage Example

```typescript
import { CardComponent } from '@crx/public-library';

@Component({
  standalone: true,
  imports: [CardComponent],
  template: `
    <lib-card [user]="user" (favoriteToggled)="onFavoriteToggled($event)"></lib-card>
  `
})
```

## Best Practices

1. Always use Tailwind utility classes for styling
2. Avoid custom CSS unless absolutely necessary
3. Use the provided font families for consistency
4. Override brand colors at the application level, not component level

## Development

### Adding New Components

1. Create component in `apps/public-library/src/lib/`
2. Export component in `apps/public-library/src/index.ts`
3. Update documentation
4. Run tests: `nx test public-library`

### Commands

-   Test: `nx test public-library`
-   Lint: `nx lint public-library`
-   Build: `nx build public-library`

## Troubleshooting

### Common Issues

1. **Styles not applying:**

    - Check that your application's `project.json` includes the correct Tailwind configuration
    - Verify the component's style imports

2. **Component not found:**

    - Check the path mapping in `tsconfig.base.json`
    - Ensure the component is exported in `index.ts`

3. **Brand color not overriding:**
    - Verify your application's Tailwind config extends the theme correctly
    - Check that your application's styles are being loaded after the library's styles
    - Run `nx dep-graph` to verify the dependency order is correct
