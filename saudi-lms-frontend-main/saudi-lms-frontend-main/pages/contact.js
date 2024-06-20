import Head from 'next/head'
import React from 'react'
import { Contactpage } from '../components'



const Contact = () => {
    return (
        <div>
            <div>
                <Head>
                    <title>Contact us</title>
                </Head>
                <main>
                    <Contactpage />
                </main>
            </div>
        </div>
    )
}

export default Contact