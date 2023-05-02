import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { Alert, Card, Row, Column, Button, Form, NavBar } from './widgets';
import { createHashHistory } from 'history';
import { shopService } from './services';


// for å kunne bytte url med kode, må dette med.
// Hvis man skal bytte url med html tag så bruk <NavLink to="url"/>
const history = createHashHistory();

type Item = {
  id: number,
  name: string,
  description: string,
  price: number,
  count: number,
  itemCount?: number
}

type Order = {
  id: number,
  name: string,
  itemId: number,
  itemCount: number,
  price: number
}


class Dice extends Component {

  firstNumbers: number[] = [];
  secondNumbers: number[] = [];
  thirdNumbers: number[] = [];
  throw: number = 1;
  keep?: number;
  disabled: boolean = false;

  render() {
    return(
      <div>
        <div>
          <h1>
            Terningkast 1:
          </h1>
          <div style={{display: "flex"}}>
            {
              this.firstNumbers.length 
                ? this.firstNumbers.map((number, index) => {
                  return <p key={index}>{ number }</p>
                })
                : <></>
            }
          </div>
        </div>
        <div>
          <h1>
            Terningkast 2:
          </h1>
          <div style={{display: "flex"}}>
            {
              this.secondNumbers.length
                ? this.secondNumbers.map((number, index) => {
                  return <p key={index}>{ number }</p>
                })
                : <></>
            }
          </div>
        </div>
        <div>
          <h1>
            Terningkast 3:
          </h1>
          <div style={{display: "flex"}}>
            {
              this.thirdNumbers.length
                ? this.thirdNumbers.map((number, index) => {
                  return <p key={index}>{ number }</p>
                })
                : <></>
            }
          </div>
        </div>
        <div>
          <h1>
            Score:
          </h1>
          <p>
            {  this.thirdNumbers.length ? this.calculateScore() : 0 }
          </p>
        </div>
        <div style={{display: "flex"}}>
            <button
              disabled={this.disabled}
              onClick={() => {
                this.keep = 1;
                this.throwDice();
              }}
            >
              Enere
            </button>
            <button
              disabled={this.disabled}
              onClick={() => {
                this.keep = 2;
                this.throwDice();
              }}
            >
              Toere
            </button>
            <button
              disabled={this.disabled}
              onClick={() => {
                this.keep = 3;
                this.throwDice();
              }}
            >
              Treere
            </button>
            <button
              disabled={this.disabled}
              onClick={() => {
                this.keep = 4;
                this.throwDice();
              }}
            >
              Firere
            </button>
            <button
              disabled={this.disabled}
              onClick={() => {
                this.keep = 5;
                this.throwDice();
              }}
            >
              Femere
            </button>
            <button
              disabled={this.disabled}
              onClick={() => {
                this.keep = 6;
                this.throwDice();
              }}
            >
              Seksere
            </button>
        </div>
      </div>
    );
  }

  calculateScore(): number {
    let score = 0;

    for (const number of this.thirdNumbers) score += number;

    return score;
  }

  throwDice() { 

    const newNumbers: number[] = [];
    let keepCount = 0;

    switch (this.throw) {
      case 1:
        for (let i = 0; i < 5; i++) this.firstNumbers.push(Math.floor(Math.random() * 6) + 1);
        break;
    
      case 2:
        for (const number of this.firstNumbers) {
          if (number === this.keep) keepCount++;
        }
        if (keepCount === 5) {
          if (this.keep) for (let i = 0; i < keepCount; i++) newNumbers.push(this.keep);
          this.secondNumbers = newNumbers;
          this.thirdNumbers = newNumbers;
          this.disabled = true;
          return;
        }

        for (let i = 0; i < 5 - keepCount; i++) newNumbers.push(Math.floor(Math.random() * 6) + 1);
        if (this.keep) for (let i = 0; i < keepCount; i++) newNumbers.push(this.keep);
        this.secondNumbers = newNumbers;
        break;
      
      case 3:
        for (const number of this.secondNumbers) {
          if (number === this.keep) keepCount++;
        }

        if (keepCount === 5) {
          if (this.keep) for (let i = 0; i < keepCount; i++) newNumbers.push(this.keep);
          this.thirdNumbers = newNumbers;
          this.disabled = true;
          return;
        }

        for (let i = 0; i < 5 - keepCount; i++) newNumbers.push(Math.floor(Math.random() * 6) + 1);
        if (this.keep) for (let i = 0; i < keepCount; i++) newNumbers.push(this.keep);
        this.thirdNumbers = newNumbers;
        break;
    }

    this.throw++;

  }

  mounted(): void {
    this.throwDice();
  }
}

class Items extends Component {

  items: Item[] = [];

  render() {
    return (
      <Card title="Items">
        <Row>
          <Column width={4}>
            Items
          </Column>
          <Column width={4}>
            Added / Available
          </Column>
        </Row>
        {
          this.items.map((item, index) => {
            return <Row key={index}>
                      <Column width={4}>
                        <h3>
                          { item.name }
                        </h3>
                        <p>
                          { item.description }
                        </p>
                      </Column>
                      <Column width={4}>
                        { item.itemCount ? item.itemCount : 0 }/{ item.count }
                      </Column>
                      <Column width={4}>
                        <Button.Light
                          onClick={() => this.addToCart(item)}
                        >
                          Add to cart
                        </Button.Light>
                      </Column>
                    </Row>
          })
        }
      </Card>
    );
  }

  async addToCart(item: Item): Promise<void> {
    if (item.itemCount && item.itemCount >= item.count) return;

    try {
      if (!item.itemCount) await shopService.addOrder(item.id);
      else await shopService.updateOrder(item.itemCount + 1, item.id);

      this.items = await shopService.getItems();
    } catch (e) {
      console.log(e);
    } 
  } 

  async mounted(): Promise<void> {
    try {
      this.items = await shopService.getItems();
    } catch(e) {
      console.log(e);
    }
  }
}

class Cart extends Component {

  orders: Order[] = [];

  render() {
    return (
      <Card title="Shopping cart">
        <Row>
          <Column width={2}>
            Name
          </Column>
          <Column width={3}>
            Price per item
          </Column>
          <Column width={3}>
            Count
          </Column>
          <Column width={2}>
            Sum
          </Column>
        </Row>
        {
          this.orders.map((order, index) => {
            return <Row key={index}>
                      <Column width={2}>
                        { order.name }
                      </Column>
                      <Column width={3}>
                        { order.price } kr
                      </Column>
                      <Column width={3}>
                        { order.itemCount }
                      </Column>
                      <Column width={2}>
                        { order.itemCount * order.price }
                      </Column>
                  </Row>
          })
        }
        <Row>
          <Column width={8}>
            Sum
          </Column>
          <Column>
            { this.calculateSum() }
          </Column>
        </Row>
      </Card>
    );
  }

  calculateSum(): number {
    let sum = 0;

    if (this.orders.length) {
      for (let i = 0; i < this.orders.length; i++) {
        sum += this.orders[i].itemCount * this.orders[i].price;
      }
    }

    return sum;
  }

  async mounted(): Promise<void> {
    try {
      this.orders = await shopService.getOrders();
    } catch (e) {
      console.log(e);
    }
  }
}

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
          <Route exact path="/" component={Dice} />
          <Route exact path="/items" component={Items} />
          <Route exact path="/cart" component={Cart} />
        </div>
      </HashRouter>
    </div>
  );
