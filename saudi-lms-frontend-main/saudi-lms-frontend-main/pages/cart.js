import React from 'react'
import Head from 'next/head'
import CartComponent from '../components/Cart'

const CartPage = () => {
  return (
    <div>
        <Head>
          <title>Cart Page</title>
        </Head>
        <main>
          <CartComponent/>
        </main>
    </div>
  )
}

export default CartPage