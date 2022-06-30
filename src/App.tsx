import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import Login from './views/login/Login';
import Main from './views/main/Main';

function App() {

  const { loginStatus } = useSelector((store: RootState) => store.login);

  const view = loginStatus
    ? <Main />
    : <Login />

  return (
    <div>
      {view}
    </div>
  );
}

export default App;
