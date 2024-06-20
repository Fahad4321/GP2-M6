import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import SignupPage from '../components/Signup'

const Signup = () => {

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
                    <div>
                        <Head>
                            <title>Signup</title>
                        </Head>
                        <main>
                            <SignupPage />
                        </main>
                    </div>
                </div>
            }
        </>
    )
}

export default Signup