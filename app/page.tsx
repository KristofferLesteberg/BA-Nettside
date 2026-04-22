import React from 'react'
import Link from 'next/link'

import { ArrowRight, ArrowDown } from 'lucide-react'



const page = () => {
  return (
    <div className='mt-30 '>
      <section className='border max-w-full ml-auto bg-subtle border'>
        <div className='flex flex-col md:flex-row max-w-4/5 ml-auto mr-auto p-3 items-center gap-3'>
          <div className='flex flex-col'>
            <h1 className='heading-1'>Kjøp byggematerialer eller <br />få jobben gjort av <br />fagfolk</h1>
          
            <div className='flex flex-row flex-1 gap-3 mt-3'>
              <Link href="/products">
                <button className='btn btn-primary hover:bg-primary-hover'>Se på våre produkter!</button>
              </Link>
              <Link href="/projects">
                <button className='btn btn-primary hover:bg-primary-hover'>Bestill en av våre Elever!</button>
              </Link>
            </div>
          </div>
          <div className='w-full md:w-1/2 h-64 md:h-80 rounded-lg bg-muted flex items-center justify-center ml-auto'>
            <p>Add picture</p>
          </div>
        </div>
        </section>
        <section className='mt-30'>
          <div className='text-center mb-20'>
            <h1 className='heading-1'>Vi tilbyr prosjekter og produkter fra to Linjer</h1>
            
          </div>
          {/*DESCRIPTION*/}
          <div className='flex flex-col w-4/5 ml-auto mr-auto'>
            <h1 className='heading-1 p-6'>Bygg:</h1>
            <hr />
            <div className='flex flex-col md:flex-row items-center'> 
              <p className='max-w-1/2 text-center'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta, minima repudiandae. Hic recusandae quam suscipit quisquam totam ex beatae ad quibusdam natus aliquid corrupti inventore perferendis sit, sed enim dolor. lor</p>
              <div className='w-full md:w-1/2 h-64 md:h-80 rounded-lg bg-muted flex items-center justify-center m-6'>
                <p>Add picture</p>
              </div>
            </div>
            <h1 className='heading-1 p-6'>Annlegg:</h1>
            <hr />
            <div className='flex flex-col md:flex-row items-center '> 
              <div className='w-full md:w-1/2 h-64 md:h-80 rounded-lg bg-muted flex items-center justify-center m-6'>
                <p>Add picture</p>
              </div>
              <p className='max-w-1/2 text-center'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta, minima repudiandae. Hic recusandae quam suscipit quisquam totam ex beatae ad quibusdam natus aliquid corrupti inventore perferendis sit, sed enim dolor. lor</p>
            </div>
          </div>
        </section>
        {/*PROCESS CARDS*/}

        <section className='mt-20 mb-40'>
          <h1 className='heading-1 text-center mb-20'>Hvordan går kjøps prosessen</h1>

          <div className='max-w-400 mx-auto px-6'>

            {/* ── ROW 1 ── */}
            <div className='grid grid-cols-1 lg:grid-cols-[minmax(180px,1fr)_auto_minmax(180px,1fr)_auto_minmax(180px,1fr)] gap-6'>

              <div className='card border border-primary min-h-40 p-4'>Test</div>

              {/* Desktop arrow */}
              <div className='hidden lg:flex justify-center items-center w-30 xl:w-40'>
                <svg width="100%" height="24" viewBox="0 0 200 24" fill="none"
                  stroke="#c0392b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="1" y1="12" x2="188" y2="12" strokeDasharray="11 16"/>
                  <polyline points="181 5 188 12 181 19"/>
                </svg>
              </div>
              {/* Mobile arrow */}
              <div className='flex lg:hidden justify-center'>
                <svg width="24" height="40" viewBox="0 0 24 40" fill="none"
                  stroke="#c0392b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="28" strokeDasharray="4 6"/>
                  <polyline points="5 21 12 28 19 21"/>
                </svg>
              </div>

              <div className='card border border-primary min-h-40 p-4'>Test</div>

              {/* Desktop arrow */}
              <div className='hidden lg:flex justify-center items-center w-30 xl:w-40'>
                <svg width="100%" height="24" viewBox="0 0 200 24" fill="none"
                  stroke="#c0392b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="1" y1="12" x2="188" y2="12" strokeDasharray="11 16"/>
                  <polyline points="181 5 188 12 181 19"/>
                </svg>
              </div>
              {/* Mobile arrow */}
              <div className='flex lg:hidden justify-center'>
                <svg width="24" height="40" viewBox="0 0 24 40" fill="none"
                  stroke="#c0392b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="28" strokeDasharray="4 6"/>
                  <polyline points="5 21 12 28 19 21"/>
                </svg>
              </div>

              <div className='card border border-primary min-h-40 p-4'>TesT</div>
            </div>

            {/* ── DOWN ARROW ── */}
            {/* Desktop — aligned to last column */}
            <div className='hidden lg:grid grid-cols-[minmax(180px,1fr)_auto_minmax(180px,1fr)_auto_minmax(180px,1fr)] gap-6 mt-3'>
              <div className=''/><div className='xl:w-40 w-16'/><div /><div className='xl:w-40 w-16'/>
              <div className='flex justify-center p-4 h-30 xl:h-40'>
               
                  <svg width="24" height="100%" viewBox="0 0 24 100" fill="none"
                    stroke="#c0392b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="88" strokeDasharray="6 11"/>
                    <polyline points="5 82 12 88 19 81"/>
                  </svg>
                
              </div>
            </div>
            {/* Mobile */}
            <div className='flex lg:hidden justify-center'>
              <svg width="24" height="40" viewBox="0 0 24 40" fill="none"
                stroke="#c0392b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="28" strokeDasharray="4 6"/>
                <polyline points="5 21 12 28 19 21"/>
              </svg>
            </div>

            {/* ── ROW 2 ── */}
            <div className='grid grid-cols-1 lg:grid-cols-[minmax(180px,1fr)_auto_minmax(180px,1fr)_auto_minmax(180px,1fr)] gap-6'>

              <div className='card border border-primary min-h-40 p-4'>Test</div>

              {/* Desktop arrow — pointing left */}
              <div className='hidden lg:flex justify-center items-center w-30 xl:w-40'>
                <svg width="100%" height="24" viewBox="0 0 200 24" fill="none"
                  stroke="#c0392b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="199" y1="12" x2="12" y2="12" strokeDasharray="11 16"/>
                  <polyline points="19 5 12 12 19 19"/>
                </svg>
              </div>
              {/* Mobile arrow */}
              <div className='flex lg:hidden justify-center'>
                <svg width="24" height="40" viewBox="0 0 24 40" fill="none"
                  stroke="#c0392b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="28" strokeDasharray="4 6"/>
                  <polyline points="5 21 12 28 19 21"/>
                </svg>
              </div>

              <div className='card border border-primary min-h-40 p-4'>test</div>

              {/* Desktop arrow — pointing left */}
              <div className='hidden lg:flex justify-center items-center w-30 xl:w-40'>
                <svg width="100%" height="24" viewBox="0 0 200 24" fill="none"
                  stroke="#c0392b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="199" y1="12" x2="12" y2="12" strokeDasharray="11 16"/>
                  <polyline points="19 5 12 12 19 19"/>
                </svg>
              </div>
              {/* Mobile arrow */}
              <div className='flex lg:hidden justify-center'>
                <svg width="24" height="40" viewBox="0 0 24 40" fill="none"
                  stroke="#c0392b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="28" strokeDasharray="4 6"/>
                  <polyline points="5 21 12 28 19 21"/>
                </svg>
              </div>

              <div className='card border border-primary min-h-40 p-4'>TesT</div>
            </div>

          </div>
        </section>
      </div>
   
  )
}

export default page