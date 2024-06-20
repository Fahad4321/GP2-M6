import React from 'react'
import Head from 'next/head'
import Welcome from '../components/checkout/Welcome';

const Success = () => {
  return (
    <div>
        <Head>
          <title>Purchase Success</title>
        </Head>
        <main>
          <Welcome/>
        </main>
    </div>
  )
}

export default Success;