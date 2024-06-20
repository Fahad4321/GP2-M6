import React from 'react'
import Head from 'next/head'
import { Coursepage } from '../../components'


const About = () => {
  return (
    <div>
      <div>
        <Head>
          <title>Course</title>
        </Head>
        <main>
          <Coursepage />
        </main>
      </div>
    </div>
  )
}

export default About