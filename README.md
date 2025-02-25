# NX-Angular Design System Template

An NX based template that uses Angular & Tailwind to create a boiler-plate design system architecture. It allows for cascading global styles that can be overwritten at the application level.

-   Install packages with `npm i`
-   Serve the application using `npx nx serve angular-task`
-   Verify that your changes lint, test, and build correctly: `npx nx affected -t lint test build`.

## Useful NX tips and tricks
-   [@nx/angular:component Documentation](https://nx.dev/nx-api/angular/generators/component) Create an angular component using `npx nx g @nx/angular:component <component-name> --directory=apps/angular-task/src/app`
-   Create an angular service using `npx nx g @nx/angular:service`
-   [@nx/angular:pipe Documentation](https://nx.dev/nx-api/angular/generators/pipe) Create an angular pipe using `npx nx g @nx/angular:pipe`
-   [@nx/angular:directive Documentation](https://nx.dev/nx-api/angular/generators/directive) Create an angular directive using `npx nx g @nx/angular:directive`
-   [@nx/angular:library Documentation](https://nx.dev/nx-api/angular/generators/library) Create an angular library using `npx nx g @nx/angular:library`
