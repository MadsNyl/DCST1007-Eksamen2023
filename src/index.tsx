import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { Alert, Card, Row, Column, Button, Form, NavBar } from './widgets';
import { createHashHistory } from 'history';
import { pool } from './mysql-pool';
import { RowDataPacket } from 'mysql2';


// for å kunne bytte url med kode, må dette med.
// Hvis man skal bytte url med html tag så bruk <NavLink to="url"/>
// const history = createHashHistory();


// henter pool fra mysql-pool.ts

type Item = {
  id?: number;
  title: string;
  description: string;
  not_available?: boolean;
};


class ItemService {

  // Get all items
  getItems(): Promise<Item[]> {
    return new Promise<Item[]>((resolve, reject) => {
      pool.query('SELECT * FROM Items', (error, results) => {
        if (error) reject(error);
        else resolve(results as Item[]);
      });
    });
  }

  // create item
  createItem(item: Item): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      pool.query('INSERT INTO Items (title, description) VALUES (?, ?)', [item.title, item.description], error => {
        if (error) reject(error);
        else resolve();
      });
    });
  }

  // update available state
  updateAvailable(id: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      pool.query('UPDATE Items SET not_available = !not_available WHERE id = ?', [id], error => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
}

// Lager en instans av ItemService for å kunne bruke metodene
const itemService = new ItemService();


// Frontend (det man ser på nettsiden)
// Arv Component, ellers vil ingenting fungere
class Home extends Component {
 
  items: Item[] = [];
  title: string = '';
  description: string = '';

  render() {
    return (
      <Card title='Shopping list'>
        <Card title='Add item'>
          <Row>
            <h1>
              Title:
            </h1>
            <Form.Input
              value={this.title}
              type='text'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {this.title = event.target.value}} 
            />
          </Row>
          <Row>
            <h1>
              Description:
            </h1>
            <Form.Input
              value={this.description}
              type='text'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {this.description = event.target.value}} 
            />
          </Row>

          <Button.Success onClick={this.create}>Add item</Button.Success>
        </Card>

        <Card title='items'>
          {/* For hver item i items, lag en ny rad */}
          {this.items.map((item, index) => (
            <Row key={index}>
              <Column>
                <h1 style={{ color: item.not_available ? 'red' : 'black'  }}>{item.title}</h1>
                <p style={{ color: item.not_available ? 'red' : 'black'  }}>{item.description}</p>
              </Column>

              <Button.Success
                onClick={() => this.toggleAvailable(item.id!)}
              >
                { item.not_available ? 'Not picked up' : 'Pick up' }
              </Button.Success>
            </Row>
          ))}
        </Card>
      </Card>
    );
  }

  async mounted(): Promise<void> {
    this.items = await itemService.getItems(); 
  }

  // Lager en ny item
  async create() {
    if (this.title === '' || this.description === '') return;

    await itemService.createItem({title: this.title, description: this.description});
    // Oppdaterer items
    this.items = await itemService.getItems();
  };

  // Oppdaterer not_available
  async toggleAvailable(id: number) {
    await itemService.updateAvailable(id);
    // Oppdaterer items
    this.items = await itemService.getItems();
  };
};






























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
