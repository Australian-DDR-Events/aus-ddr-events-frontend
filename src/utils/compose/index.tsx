import React from 'react';
import { ComposeProps } from 'utils/compose/type';

const compose = (
  providers: Array<ComposeProps>,
  children: React.ReactElement,
) =>
  providers.reduceRight(
    (
      acc: React.ReactElement,
      { Provider, props }: ComposeProps,
    ): React.ReactElement => <Provider {...props}>{acc}</Provider>,
    children,
  );

export { ComposeProps };
export default compose;
