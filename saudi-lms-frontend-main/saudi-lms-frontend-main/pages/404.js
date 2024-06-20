import React from 'react'
import Link from 'next/link'

const Error = () => {
  return (
    <>
    <section className="font-roboto">
      <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
        <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
          <img src="https://creativelayers.net/themes/educrat-html/img/404/1.svg" alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
        </div>
        <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
          <h1 className="text-8xl font-bold leading-none sm:text-9xl text-[#140342]">4<span className='text-indigo-500'>0</span>4</h1>
          <span className="text-[#140342] text-4xl font-bold">Oops! It looks like you are lost.</span>
          <p className="mt-6 mb-6 text-gray-600 leading-7 ">The page you are looking for is not available. Try to search again or use the go to. </p>
          <div className="flex justify-center lg:justify-start">
            <Link href="/" className="px-6 py-2 text-lg font-normal text-center rounded-lg bg-[#140342] text-white hover:bg-transparent border-2 border-[#140342] hover:border-2 hover:border-[#140342] hover:text-[#140342] transition duration-500 ease-in-out">Go to Home Page</Link>
          </div>

        </div>
      </div>
    </section>
    </>
    // <div className='flex justify-center py-56'>
    //     <div className='text-3xl text-gray-700'>404 || Page Not Found</div>
        
    // </div>
  )
}

export default Error