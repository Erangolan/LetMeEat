/* eslint-disable no-unused-vars */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => {

  console.log('rest: ', rest)

  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem('token') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/ingredients', state: { from: props.location } }}
          />
        )
      }
    />
  )
}
