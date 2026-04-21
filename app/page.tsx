import React from 'react'
import Link from 'next/link'



const page = () => {
  return (
    <div className='mt-30 '>
      <div className='border max-w-full ml-auto mr-auto bg-subtle'>
        <div className='flex flex-row max-w-4/5 ml-auto mr-auto'>
          <h1 className='heading-1'>Kjøp byggematerialer eller få jobben gjort av <br />fagfolk</h1>
          <div className='ml-auto'>
            <div className=''>Picture</div>
          </div>
        </div>
        <div className='flex flex-row gap-3'>
          <Link href="/products">
            <button className='btn btn-outline bg-primary text-white'>Se på våre produkter!</button>
          </Link>
          <Link href="/projects">
            <button className='btn btn-outline bg-primary text-white hover:bg-primary-hover'>Bestill en av våre Elever!</button>
          </Link>
        </div>
      </div>
      
      
      

    </div>
  )
}

export default page