const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
        join(__dirname, 'src/styles/**/*.scss'),
        ...createGlobPatternsForDependencies(__dirname),
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Roboto', 'Helvetica Neue', 'system-ui', 'sans-serif'],
                urbanist: ['Urbanist', 'Arial', 'sans-serif'],
            },
            colors: {
                brand: '#993',
            },
        },
    },
    plugins: [],
};
