## Getting started

Make sure you have the following installed:

- Yarn
- Parcel

### Yarn

Install Yarn with `npm install -g yarn`

### Parcel

Install Parcel with `yarn global add parcel@nightly`

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
    │       │   ├── feature-name.test.ts
    │       │   └── feature-specific-component-name.test.ts
    │       ├── feature-specific-component-name/
    │       │       ├── index.tsx
    │       │       └── ...
    │       ├── index.tsx
    │       ├── styled.tsx
    │       ├── operation.graphql
    │       ├── operation.generated.ts
    │       └── types.tsx
    ├── context/
    │   └── context-name/
    │       ├── __tests__/
    │       │   └── dao.test.ts
    │       ├── index.tsx
    │       ├── types.tsx
    │       ├── context.tsx
    │       └── provider.tsx
    ├── components/
    │   └── component-name/
    │       ├── __tests__/
    │       │   └── component-name.test.ts
    │       ├── index.tsx
    │       └── ...
    └── types/
    │   ├── type-name.ts
        └── graphql.generated.ts
```

- `features`
  - Anything that the users may interact with goes under this folder
  - In a feature, you'll most likely need to use graphql to perform data query or changes. We use a code generator to generate types and hooks related to the graphql query or mutation or subscription you wrote in the `operation.graphql` file which is per feature folder
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
