import React from 'react'
import Link from 'next/link'



const page = () => {
  return (
    <div className='mt-30 '>
      <section className='border max-w-full ml-auto bg-subtle border'>
        <div className='flex flex-col md:flex-row max-w-4/5 ml-auto mr-auto p-3 items-center gap-3'>
          <div className='flex flex-col'>
            <h1 className='heading-1'>Kjøp byggematerialer eller <br />få jobben gjort av <br />fagfolk</h1>
          
            <div className='flex flex-row flex-1 gap-3 mt-3'>
              <Link href="/products">
                <button className='btn btn-outline bg-primary text-white'>Se på våre produkter!</button>
              </Link>
              <Link href="/projects">
                <button className='btn btn-outline bg-primary text-white hover:bg-primary-hover'>Bestill en av våre Elever!</button>
              </Link>
            </div>
          </div>
          <div className='w-full md:w-1/2 h-64 md:h-80 rounded-lg bg-muted flex items-center justify-center ml-auto'>
            <p>Add picture</p>
          </div>
        </div>
        </section>
        <section className='mt-30 mb-400'>
          <div className='text-center'>
            <h1 className='heading-2'>Vi tilbyr prosjekter og produkter fra to Linjer</h1>
          </div>
          <div className='flex flex-col w-4/5 border ml-auto mr-auto'>
            <div className='flex flex-row'>
              <h1 className='heading-3'>Bygg:</h1>

            </div>

            <div className='flex flex-row'>
              <h1 className='heading-3'>Annlegg:</h1>
            </div>
            
          </div>

        </section>
      </div>
   
  )
}

export default page