import { useCallback } from "react";
import type { AppProps } from "next/app";
import { CacheProvider } from "@emotion/react";
import { Center, ChakraProvider } from "@chakra-ui/react";

import { AuthProvider, PrivateRouteWrapper } from "auth-module";

import { Loading } from "@backoffice/Base/components";
import AppLayout from "@backoffice/Base/layout/AppLayout";
import styleCache from "@backoffice/Base/styles/styleCache";
import theme from "@backoffice/Base/theme";
import useRouteLoading from "@backoffice/Base/utils/hooks/useRouteLoading";

const isClientSide = typeof window !== "undefined";
const publicRoutes = [];

export default function App({ Component, pageProps, router }: AppProps) {
  const { loading: isRouteLoading } = useRouteLoading();

  const handleRedirectToLogin = useCallback(() => {
    if (isClientSide) {
      router.replace("/auth/login");
    }
  }, [router]);

  return (
    <AuthProvider>
      <CacheProvider value={styleCache}>
        <ChakraProvider theme={theme}>
          {router.pathname.startsWith("/auth") ||
          router.pathname.startsWith("/fixture") ||
          router.pathname.startsWith("/_error") ? (
            <Component {...pageProps} />
          ) : (
            <PrivateRouteWrapper
              loadingElement={() => <Loading h="100vh" />}
              redirectLogin={handleRedirectToLogin}
            >
              <AppLayout>
                {isRouteLoading ? (
                  <Center h="calc(100% - 70px)">
                    <Loading />
                  </Center>
                ) : (
                  <Component {...pageProps} />
                )}
              </AppLayout>
            </PrivateRouteWrapper>
          )}
        </ChakraProvider>
      </CacheProvider>
    </AuthProvider>
  );
}
