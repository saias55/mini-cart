import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(eachItem => {
        total += eachItem.quantity * eachItem.price
      })

      return (
        <div>
          <h1>{`Rs ${total}`}</h1>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
