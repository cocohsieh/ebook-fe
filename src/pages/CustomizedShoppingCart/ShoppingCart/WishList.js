import { useCart } from '../utils/useCart'
import { useSecondCart } from '../utils/useSecondCart'
import LinkItems from './components/LinkItems'
import { useNavigate } from 'react-router-dom'
import ListItemsWithProps from './components/ListItemsWithProps'

function WishList(props) {
  const firstCart = useCart()
  const secondCart = useSecondCart()
  let navigate = useNavigate()
  const handleClick = (path) => () => {
    navigate(path)
  }

  return (
    <>
      <div className="mt-5">
        <ListItemsWithProps
          cart={secondCart.cart}
          items={secondCart.items}
          plusOne={secondCart.plusOne}
          minusOne={secondCart.minusOne}
          removeItem={secondCart.removeItem}
        />
      </div>
      <div className="d-flex justify-content-end mb-5">
        <button
          type="button"
          className="btn btn-primary-reverse me-3 ShoppingCart-btn-border-radius"
          onClick={handleClick('/Cart/product-list')}
        >
          繼續購物
        </button>
      </div>
    </>
  )
}

export default WishList
