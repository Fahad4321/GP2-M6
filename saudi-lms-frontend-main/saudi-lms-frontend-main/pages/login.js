import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import LoginPage from '../components/Login'

const Login = () => {
    const router = useRouter()
    const [userLog, setuserLog] = React.useState(false)

 /*   React.useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push('/');
        } else {
            setuserLog(true)
        }
    }, [])*/

    return (
        <>
             <div>
                    <div>
                        <Head>
                            <title>Login</title>
                        </Head>
                        <>
                            <LoginPage />
                        </>
                    </div>
                </div>
        </>
    )
}

export default Login