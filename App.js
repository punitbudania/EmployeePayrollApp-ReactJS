import { Component } from 'react';
import './App.css';
import { BrowserRouter, Route} from "react-router-dom";
import Form from './components/form/Form';
import Home from './components/home/Home';

class App extends Component
{
  render()
  {
    return(
      <div>
        <BrowserRouter>
          <div>
            <Route path="/" component={Form} exact></Route>
            <Route path="/Home" component={Home}></Route>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
