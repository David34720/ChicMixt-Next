import React, { ComponentType, ForwardedRef } from "react";

type RemoveNetworkName<T> = "networkName" extends keyof T ? Omit<T, "networkName"> : T;

export function withoutNetworkName<P>(Component: ComponentType<P>) {
  type Props = RemoveNetworkName<P>;
  
  const WrappedComponent = React.forwardRef<any, Props>((props, ref: ForwardedRef<any>) => {
   

    // Retirer networkName
    const { networkName, ...filteredProps } = props as any;



    return <Component {...(filteredProps as P)} ref={ref} />;
  });
  
  const name = Component.displayName || Component.name || "Component";
  WrappedComponent.displayName = `withoutNetworkName(${name})`;
  
  return WrappedComponent;
}
