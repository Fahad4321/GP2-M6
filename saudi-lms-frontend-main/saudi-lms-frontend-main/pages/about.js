import React from 'react'
import Head from 'next/head'
import { Aboutpage } from '../components'


const About = () => {
  return (
    <div>
      <div>
        <Head>
          <title>About Us</title>
        </Head>
        <main>
          <Aboutpage />
        </main>
      </div>
    </div>
  )
}

export default About