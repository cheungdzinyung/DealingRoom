import * as React from 'react';
import Login from './components/login';
import './scss/App.scss';

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
