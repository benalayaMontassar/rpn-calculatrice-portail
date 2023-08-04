import React, { Component } from 'react';
import './style.css';
import { Provider } from 'react-redux';
import store from './store';
import PilesList from './components/piles-List';
import PileForm from './components/pile-form';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className='calculator'>
          <PileForm></PileForm>
          <hr />
          <PilesList></PilesList>
        </div>
      </Provider>
    )
  }
}


export default App;