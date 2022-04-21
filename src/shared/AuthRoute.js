import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";

const AuthRoute = props => {
  const { type, isAuthUser} = props;
  if (type === "guest" && isAuthUser) return <Redirect to="/home" />;
  else if (type === "private" && !isAuthUser) return <Redirect to="/" />;
return <Route   {...props} />;
 
};

const mapStateToProps = (state) => {
    return {
      isAuthUser: state.user.isAuthUser
    };
  };

export default connect(mapStateToProps)(AuthRoute);