import React, { useContext, createContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useSelector((state) => state.user.isAuthUser);
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useAuth() {
  return useContext(authContext);
}

export default function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
