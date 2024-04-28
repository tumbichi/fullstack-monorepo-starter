import { FC, PropsWithChildren, ElementType } from 'react';
interface PrivateRouteWrapperProps {
    redirectLogin: () => void;
    loadingElement: ElementType;
}
declare const PrivateRouteWrapper: FC<PropsWithChildren<PrivateRouteWrapperProps>>;
export default PrivateRouteWrapper;
