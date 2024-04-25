import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { Alert, Card, Row, Column, Button, Form, NavBar } from './widgets';
import { createHashHistory } from 'history';


// for å kunne bytte url med kode, må dette med.
// Hvis man skal bytte url med html tag så bruk <NavLink to="url"/>
const history = createHashHistory();


class Menu extends Component {
  render() {
    return(
      <NavBar brand="Shop">
        <NavBar.Link to='/'>Dice</NavBar.Link>
        <NavBar.Link to='/items'>Items</NavBar.Link>
        <NavBar.Link to='/cart'>Cart</NavBar.Link>
      </NavBar>
    );
  }
}

let root = document.getElementById('root');
if (root)
  createRoot(root).render(
    <div>
      <HashRouter>
        <Menu />
        <div>
          {/* <Route exact path="/" component={Dice} />
          <Route exact path="/items" component={Items} />
          <Route exact path="/cart" component={Cart} /> */}
        </div>
      </HashRouter>
    </div>
  );
