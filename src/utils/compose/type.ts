import React from 'react';

export interface ComposeProps {
  Provider: React.JSXElementConstructor<React.PropsWithChildren<any>>;
  props?: any;
}
