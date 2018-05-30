import * as React from 'react';
import './App.scss';
import Login from './components/login';

class App extends React.Component {
  public render() {
    return (
        <div className="container">
          <Login/>
        </div>
    );
  }
}

export default App;
