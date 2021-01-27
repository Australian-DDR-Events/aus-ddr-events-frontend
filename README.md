## Getting started

Make sure you have the following installed:

- Yarn
- Parcel

### Yarn

Install Yarn with `npm install -g yarn`

### Parcel

Install Parcel with `yarn global add parcel-bundler`

### dotenv

The set up of `.env` file is required in order to configure Firebase.

### Running POC

To start, simple do

```
yarn start
```

## Project structure

```
src/
    ├── features/
    │   └── feature-name/
    │       ├── __tests__/
    │       │   ├── index.test.ts
    │       │   └── feature-specific-component-name.test.ts
    │       ├── components/
    │       │   └── feature-specific-component-name/
    │       │       ├── index.tsx
    │       │       └── ...
    │       ├── index.tsx
    │       ├── styled.tsx
    │       └── types.tsx
    ├── context/
    │   └── context-name/
    │       ├── __tests__/
    │       │   └── index.test.ts
    │       ├── index.tsx
    │       ├── types.tsx
    │       ├── context.tsx
    │       └── provider.tsx
    ├── components/
    │   └── component-name/
    │       ├── __tests__/
    │       │   └── index.test.ts
    │       ├── index.tsx
    │       └── ...
    └── types/
        └── type-name/
            ├── __test__/
            │   └── index.test.ts
            └── index.tsx
```

- `features`
  - Anything that the users may interact with goes under this folder
- `context`
  - Stores all the custom context that can be used with `React.useContext`
- `components`
  - Shared components that can be reused across multiple `features`
- `types`
  - Common types that can be used across the entire project
- `assets`
  - Stores static assets like images

## Tests

To run test

```
yarn test
```

## Troubleshooting

- Usually, when renaming occurs, Parcel gets quite confused. To resolve, just delete the `.cache` and `dist` folder.
