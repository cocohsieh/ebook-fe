import { useCart } from '../../utils/useCart'
import { useNavigate } from 'react-router-dom'
import { useNavigate2 } from 'react-router-dom'
import ProductList from '../../Product/ProductList'
import CouponModal from '../components/CouponModal'
import { useState } from 'react'
import { useSecondCart } from '../../utils/useSecondCart'
import { Link } from 'react-router-dom'
function ListItemsWithHook({ tab, handleStep, couponAmount0 }) {
  // 使用hooks 解出所需的狀態與函式(自context)
  const { cart, items, plusOne, minusOne, removeItem } = useCart()
  let navigate = useNavigate()

  /// 9/29優惠券
  const [couponAmount, setCouponAmount] = useState(couponAmount0)
  ///

  const handleClick = (path) => () => {
    navigate(path)
  }

  const { addSecondItem } = useSecondCart()

  return (
    <div>
      <table
        className="table"
        cellPadding="0"
        border="0"
        width="100%"
        cellSpacing="0"
      >
        <thead className="SingleCart-topnav">
          <tr>
            <th style={{ width: 160 }} className="SingleCart-tr">
              商品明細
            </th>
            <th></th>
            <th>小計</th>
            <th className="SingleCart-tr2"></th>
          </tr>
        </thead>
        <tbody className="co-text-color">
          {items.map((v, i) => {
            return (
              <>
                <tr key={v.id}>
                  <td>
                    <Link to={'/Cart/ProductDetail/' + v.id}>
                      <img
                        style={{ width: 120, height: 160 }}
                        src={v.book_img}
                        className="card-img-top ProductList-card-img-top"
                        alt="..."
                      />
                    </Link>
                  </td>
                  <td>{v.book_name}</td>
                  <td>${v.price}</td>
                  <td className="ShoppingCart-BtnInMid">
                    <button
                      type="button"
                      className="btn btn-primary-reverse me-3 ListItemsWithHook-mobile-btn-margin ShoppingCart-btn-border-radius"
                      onClick={() => {
                        removeItem(v.id)
                      }}
                    >
                      移除
                    </button>
                    {tab === 'cart' ? (
                      <button
                        type="button"
                        className="btn btn-primary-reverse ShoppingCart-btn-border-radius"
                        onClick={() => {
                          const item = { ...v, quantity: 1 }
                          removeItem(v.id)
                          addSecondItem(item)
                        }}
                      >
                        移入收藏
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary-reverse ShoppingCart-btn-border-radius"
                        onClick={() => {
                          removeItem(v.id)
                        }}
                      >
                        移入購物車
                      </button>
                    )}
                  </td>
                </tr>
              </>
            )
          })}
        </tbody>
      </table>

      <div>
        <div className="d-flex justify-content-end">
          <form>
            <CouponModal setCouponAmount={setCouponAmount} />
          </form>
        </div>

        <div className="d-flex justify-content-end co-text-color">
          共有&nbsp;&nbsp;
          <span className="ListItemsWithHook-text-em-color">
            {' '}
            {cart.totalItems}
          </span>{' '}
          &nbsp; 件商品
        </div>
        <div className="d-flex justify-content-end">
          訂單小計: ＄{cart.cartTotal}
        </div>

        <br />
        {cart.isEmpty && '購物車為空'}
        <hr />
      </div>
      <div className="d-flex justify-content-end mb-5">
        <button
          type="button"
          className="btn btn-primary-reverse me-3 ShoppingCart-btn-border-radius"
          onClick={handleClick('/Cart/product-list')}
        >
          繼續購物
        </button>
        <button
          type="button"
          className="btn btn-primary-reverse ShoppingCart-btn-border-radius"
          onClick={handleStep(2, couponAmount)}
        >
          結帳
        </button>
      </div>
    </div>
  )
}

export default ListItemsWithHook
