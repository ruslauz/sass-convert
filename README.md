# Sass/scss files converter for node.js

A small utility for converting `sass` files to `scss` or `scss` files to `sass` with `node.js`.

The implementation based on the code from the [sass-scss-converter](https://github.com/ManuelSch/sass-scss-converter) repository

## Installation and Usage

### Installation

Npm

```
npm i @ruslanuz/sass-convert
```

Yarn

```
yarn add @ruslanuz/sass-convert
```

Pnpm

```
pnpm add @ruslanuz/sass-convert
```

### Usage

```js
const { convert } = require('@ruslanuz/sass-convert');

// Convert all sass files in src folder including subfolders the to scss

convert('./src/**/*.sass', { syntax: 'scss' });

// Convert index.scss file from scss to sass

convert('./style/index.scss', {syntax: 'sass'});

```
