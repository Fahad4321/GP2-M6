import React from 'react'
import { Homepage } from '../components'
import Head from 'next/head'


const Home = () => {


  return (
    <>
      <div>
        <Head>
          <title>Home</title>
        </Head>
        <main>
          <Homepage />
        </main>
      </div>
    </>
  )
}

export default Home

