import React from 'react'
import Head from 'next/head'
import ApplyTeacher from '../../components/TeachersPage/ApplyTeacher'


const ApplyTeacherPage = () => {
  return (
    <div>
      <div>
        <Head>
          <title>Apply for Teacher</title>
        </Head>
        <main>
            <ApplyTeacher/>
        </main>
      </div>
    </div>
  )
}

export default ApplyTeacherPage