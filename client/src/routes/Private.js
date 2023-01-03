import React from "react";
import { Route, Redirect } from "react-router-dom";
// import { useAuthState } from "../context/auth";

function PrivateRoute({ component: Component, ...rest }) {
    const cookie = window.document.cookie.replace(/(?:(?:^|.*;\s*)_user_session\s*\=\s*([^;]*).*$)|^.*$/, "$1")
    const [hasCookie, setHasCookie] = React.useState(!!cookie);
    // const { user } = useAuthState();
    React.useEffect(()=>{
        setHasCookie(!!cookie)
    }, [cookie])


  return (
    <Route
      {...rest}
      render={(props) =>
        hasCookie ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
