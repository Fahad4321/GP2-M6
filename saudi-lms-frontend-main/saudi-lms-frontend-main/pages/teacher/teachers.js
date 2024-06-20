import React from 'react'
import Head from 'next/head'
import AllTeachers from '../../components/TeachersPage/AllTeachers'


const Teachers = () => {
  return (
    <div>
      <div>
        <Head>
          <title>All Teachers</title>
        </Head>
        <main>
            <AllTeachers/>
        </main>
      </div>
    </div>
  )
}

export default Teachers