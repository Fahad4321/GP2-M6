import React from 'react'
import Head from 'next/head'
import CartComponent from '../components/Cart'
import Checkout from '../components/checkout/Checkout'

const CheckoutPage = () => {
  return (
    <div>
        <Head>
          <title>Checkout Page</title>
        </Head>
        <main>
          <Checkout/>
        </main>
    </div>
  )
}

export default CheckoutPage