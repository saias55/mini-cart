import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const res = cartList.find(eachItem => eachItem.id === product.id)
    if (res) {
      this.setState(prevItem => ({
        cartList: prevItem.cartList.map(eachItem => {
          if (eachItem.id === product.id) {
            return {...eachItem, quantity: eachItem.quantity + product.quantity}
          }
          return eachItem
        }),
      }))
    } else {
      this.setState(prevItem => ({cartList: [...prevItem.cartList, product]}))
    }
  }

  incrementCartItemQuantity = id => {
    this.setState(prevQuantity => ({
      cartList: prevQuantity.cartList.map(eachQuantity => {
        if (eachQuantity.id === id) {
          return {...eachQuantity, quantity: eachQuantity.quantity + 1}
        }
        return eachQuantity
      }),
    }))
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const newList = cartList.filter(eachQuantity => eachQuantity.id !== id)
    this.setState({cartList: newList})
  }

  decrementCartItemQuantity = id => {
    this.setState(prevQuantity => ({
      cartList: prevQuantity.cartList.map(eachQuantity => {
        if (eachQuantity.id === id && eachQuantity.quantity > 1) {
          return {...eachQuantity, quantity: eachQuantity.quantity - 1}
        }
        return eachQuantity
      }),
    }))
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
