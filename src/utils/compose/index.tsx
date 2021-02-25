import React from 'react';
import { ComposeProps } from 'utils/compose/type';

const compose = (
  providers: Array<ComposeProps>,
  children: React.ReactElement,
) =>
  providers.reduceRight(
    (acc: React.ReactElement, { Provider, instance }: ComposeProps): React.ReactElement =>
      Boolean(instance) ? (
        <Provider instance={instance}>{acc}</Provider>
      ) : (
        <Provider>{acc}</Provider>
      ),
    children,
  );

export { ComposeProps };
export default compose;
