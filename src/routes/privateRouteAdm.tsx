import React from 'react';
import { Route } from 'react-router-dom';

export const PrivateRouteAdm = ({ ...rest }): any => {
  const user = sessionStorage.getItem('user');

  if ((!user)) return (window.location.href = '/login');

  return <Route {...rest} />;
};
