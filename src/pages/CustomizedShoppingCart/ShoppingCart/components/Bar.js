import React from 'react'
import './Bar.scss'

function Bar({ step }) {
  return (
    <>
      <div className="container my-5">
        <ul className="progressbar">
          <li class="active">購物車</li>
          <li className={step === 2 || step === 3 ? 'active' : ''}>確認商品</li>
          <li className={step === 3 ? 'active' : ''}>付款</li>
        </ul>
      </div>
    </>
  )
}

export default Bar
