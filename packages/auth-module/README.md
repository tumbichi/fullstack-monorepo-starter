# Kushi portal auth module

Kushi auth module is a React library for dealing with authentication on Kushi apps.

## Installation

Use the package manager [npm] to install Kushi portal auth module.

```bash
npm i Kushi-portal-auth-module
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file

`NEXT_PUBLIC_AUTH_API_URL`: authentication service url

`NEXT_PUBLIC_AUTH_PORTAL_URL`: authentication app url

`NEXT_PUBLIC_DOMAIN`: domain where the cookie is stored

For development:

```
NEXT_PUBLIC_AUTH_API_URL=https://auth-backbend.kushi.dev/

NEXT_PUBLIC_AUTH_PORTAL_URL=https://kushi.dev/

NEXT_PUBLIC_DOMAIN=kushi.dev
```

For production: 

```
NEXT_PUBLIC_AUTH_API_URL=https://auth-backbend.kushi.com/api/v1/

NEXT_PUBLIC_AUTH_PORTAL_URL=https://kushi.com/

NEXT_PUBLIC_DOMAIN=kushi.com
```
## Usage

On your _app.tsx

```typescript
import { AuthProvider, PrivateRouteWrapper } from "Kushi-portal-auth-module";

function MyApp({ Component, pageProps }: AppProps) {
    
  const handleRedirectLogin = () => {
    if (window !== undefined) {
      window.location.href = `${process.env.NEXT_PUBLIC_AUTH_PORTAL_URL}?app="${window.location.href}"`;
    }
  };

  return (
    <AuthProvider>
        <PrivateRouteWrapper
          redirectLogin={handleRedirectLogin}
          loadingElement={() => <div> This is a loading component ... </div>}
        >
            <Component {...pageProps} />
        </PrivateRouteWrapper>
    </AuthProvider>
  );
}
```

And you can access to the state with de useAuthState hook, this hook returns

```
  const { user, authenticate, loading, logout } = useAuthStatus()
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user` | `User` |  User info |
| `token` | `string` |  Google JWT |
| `authenticate` | `boolean` | determines if the user is authenticated |
| `loading` | `boolean` |  It is loading if you have not yet received a response from the service. |
| `logout` | `() => void` |  Function to logout |

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
