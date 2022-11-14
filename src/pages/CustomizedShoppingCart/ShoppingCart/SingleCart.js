import { useCart } from '../utils/useCart'
import { Link } from 'react-router-dom'
import ListItemsWithHook from './components/ListItemsWithHook'
import LinkItems from './components/LinkItems'
import Bar from './components/Bar'
import Checkout from './components/Checkout'
import Pay from './components/Pay'
import { useState } from 'react' //要用useState的話，要先用這句

import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import './SingleCart.scss'

function SingleCart(props, couponAmount0) {
  const {
    cart,
    items,
    addItem,
    removeItem,
    updateItem,
    clearCart,
    isInCart,
    plusOne,
    minusOne,
  } = useCart()

  //購物車/我的收藏 setState
  const [tab, setTab] = useState('cart')

  const onClickTab = (tab) => () => {
    setTab(tab)
  }

  const [step, setStep] = useState(1)

  const handleStep = (step, couponAmount) => () => {
    setStep(step)
    if (couponAmount != null) {
      setCouponAmount(couponAmount)
    }
  }

  const [couponAmount, setCouponAmount] = useState(couponAmount0)

  return (
    <>
      <Bar step={step} />
      <p className="text-nowrap bd-highlight"></p>

      {step === 1 ? (
        <>
          <ListItemsWithHook
            tab={tab}
            handleStep={handleStep}
            couponAmount={couponAmount}
          />
        </>
      ) : step === 2 ? (
        <div>
          <Checkout handleStep={handleStep} setCouponAmount={setCouponAmount} />
        </div>
      ) : (
        <div>
          <Pay handleStep={handleStep} />
        </div>
      )}
    </>
  )
}

export default SingleCart
