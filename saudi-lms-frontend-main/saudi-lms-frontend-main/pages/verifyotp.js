import Head from 'next/head'
import React from 'react'
import { Verify } from '../components'
import { useRouter } from 'next/router'

const Verifyotp = () => {

  const router = useRouter()
  const [userLog, setuserLog] = React.useState(false)

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/');
    } else {
      setuserLog(true)
    }
  }, [])

  return (
    <>
      {
        userLog && <div>
          <Head>
            <title>OTP verification</title>
          </Head>
          <main>
            <Verify />
          </main>
        </div>
      }
    </>
  )
}

export default Verifyotp