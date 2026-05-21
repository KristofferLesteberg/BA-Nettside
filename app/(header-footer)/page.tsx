export const dynamic = 'force-dynamic'
// Forces NextJS to not prerender this page statically
// Is useful since the DB file that NEXT tries to acces doesnt exist yet
// P.S. Claude - "ur welcome buddy".

import React from 'react'
import Link from 'next/link'
import { getAllReviews } from '@/actions/reviews'
import ReviewsCarousel from '@/components/shared/ReviewsCarousel'
import {
  FaMagnifyingGlass,
  FaCartShopping,
  FaClipboardCheck,
  FaHammer,
  FaCircleCheck,
  FaTruck,
} from 'react-icons/fa6'

const page = async () => {
  const reviews = await getAllReviews()

  return (
    <div className='mt-30 '>
      <section className='max-w-full ml-auto bg-subtle border'>
        <div className='flex flex-col md:flex-row max-w-4/5 ml-auto mr-auto p-3 items-center gap-3'>
          <div className='flex flex-col'>
            <h1 className='heading-1'>Kjøp byggematerialer eller <br />få jobben gjort av <br />fagfolk</h1>
          
            <div className='flex flex-row flex-1 gap-3 mt-3'>
              <Link href="/produkter">
                <button className='btn btn-primary hover:bg-primary-hover'>Se på våre produkter!</button>
              </Link>
              <Link href="/prosjekter">
                <button className='btn btn-primary hover:bg-primary-hover'>Bestill en av våre Elever!</button>
              </Link>
            </div>
          </div>
          <div style={{ backgroundImage: 'url("/static-images/fp-img1.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center 50%' }} className='w-full md:w-1/2 h-64 md:h-80 rounded-lg bg-muted flex items-center justify-center ml-auto'>
          
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
            <div className='flex flex-col md:flex-row items-center mb-10'> 
              <p className='max-w-1/2 text-center'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta, minima repudiandae. Hic recusandae quam suscipit quisquam totam ex beatae ad quibusdam natus aliquid corrupti inventore perferendis sit, sed enim dolor. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt esse consectetur amet ex dolorem error natus accusantium quidem, sed nihil quibusdam delectus dolores rem eum, iure nulla dolor voluptates blanditiis.</p>
              <div style={{ backgroundImage: 'url("/static-images/fp-img2.jpg")', backgroundSize: 'auto 95%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center 50%' }} className='w-full md:w-1/2 h-64 md:h-80 rounded-lg bg-yellow-100 flex items-center justify-center m-4'>
              
              </div>
            </div>
            <h1 className='heading-1 p-6'>Annlegg:</h1>
            <hr />
            <div className='flex flex-col md:flex-row items-center '> 
              <div style={{ backgroundImage: 'url("/static-images/fp-img3.jpg")', backgroundSize: 'auto 95%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center 50%' }} className='w-full md:w-1/2 h-64 md:h-80 rounded-lg bg-red-100 flex items-center justify-center m-4'>
              
              </div>
              <p className='max-w-1/2 text-center'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta, minima repudiandae. Hic recusandae quam suscipit quisquam totam ex beatae ad quibusdam natus aliquid corrupti inventore perferendis sit, sed enim dolor. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae quod assumenda necessitatibus, repellendus magni nam mollitia architecto, quis sapiente a, voluptates nesciunt sed delectus nostrum? Praesentium nam atque molestiae recusandae.</p>
            </div>
          </div>
        </section>
        {/* PROCESS CARDS */}
        <section className='mt-20 mb-40'>
          <h1 className='heading-1 text-center mb-20'>Hvordan går kjøps prosessen</h1>

          <div className='max-w-400 mx-auto px-6'>

            {/* ROW 1 */}
            <div className='grid grid-cols-1 lg:grid-cols-[minmax(180px,1fr)_auto_minmax(180px,1fr)_auto_minmax(180px,1fr)] gap-6'>

              <ProcessCard
                icon={FaMagnifyingGlass}
                title='Bla gjennom produkter'
                description='Finn det du trenger i vårt utvalg av byggematerialer og ferdige produkter.'
              />

              {/* Desktop arrow right */}
              <div className='hidden lg:flex justify-center items-center w-30 xl:w-40'>
                <svg width='100%' height='24' viewBox='0 0 200 24' fill='none'
                  stroke='#c0392b' strokeWidth='4' strokeLinecap='round' strokeLinejoin='round'>
                  <line x1='1' y1='12' x2='188' y2='12' strokeDasharray='11 16'/>
                  <polyline points='181 5 188 12 181 19'/>
                </svg>
              </div>
              {/* Mobile arrow down */}
              <div className='flex lg:hidden justify-center'>
                <svg width='24' height='40' viewBox='0 0 24 40' fill='none'
                  stroke='#c0392b' strokeWidth='4' strokeLinecap='round' strokeLinejoin='round'>
                  <line x1='12' y1='1' x2='12' y2='28' strokeDasharray='4 6'/>
                  <polyline points='5 21 12 28 19 21'/>
                </svg>
              </div>

              <ProcessCard
                icon={FaCartShopping}
                title='Legg inn bestilling'
                description='Send inn en bestilling direkte via nettsiden – enkelt og raskt.'
              />

              {/* Desktop arrow right */}
              <div className='hidden lg:flex justify-center items-center w-30 xl:w-40'>
                <svg width='100%' height='24' viewBox='0 0 200 24' fill='none'
                  stroke='#c0392b' strokeWidth='4' strokeLinecap='round' strokeLinejoin='round'>
                  <line x1='1' y1='12' x2='188' y2='12' strokeDasharray='11 16'/>
                  <polyline points='181 5 188 12 181 19'/>
                </svg>
              </div>
              {/* Mobile arrow down */}
              <div className='flex lg:hidden justify-center'>
                <svg width='24' height='40' viewBox='0 0 24 40' fill='none'
                  stroke='#c0392b' strokeWidth='4' strokeLinecap='round' strokeLinejoin='round'>
                  <line x1='12' y1='1' x2='12' y2='28' strokeDasharray='4 6'/>
                  <polyline points='5 21 12 28 19 21'/>
                </svg>
              </div>

              <ProcessCard
                icon={FaClipboardCheck}
                title='Lærer godkjenner'
                description='En faglærer gjennomgår bestillingen og bekrefter at den kan gjennomføres.'
              />
            </div>

            {/* DOWN ARROW — desktop only, aligned to last column */}
            <div className='hidden lg:grid grid-cols-[minmax(180px,1fr)_auto_minmax(180px,1fr)_auto_minmax(180px,1fr)] gap-6 mt-3'>
              <div /><div className='xl:w-40 w-16'/><div /><div className='xl:w-40 w-16'/>
              <div className='flex justify-center p-4 h-30 xl:h-40'>
                <svg width='24' height='100%' viewBox='0 0 24 100' fill='none'
                  stroke='#c0392b' strokeWidth='4' strokeLinecap='round' strokeLinejoin='round'>
                  <line x1='12' y1='1' x2='12' y2='88' strokeDasharray='6 11'/>
                  <polyline points='5 82 12 88 19 81'/>
                </svg>
              </div>
            </div>
            {/* Mobile */}
            <div className='flex lg:hidden justify-center mt-6 mb-6'>
              <svg width='24' height='40' viewBox='0 0 24 40' fill='none'
                stroke='#c0392b' strokeWidth='4' strokeLinecap='round' strokeLinejoin='round'>
                <line x1='12' y1='1' x2='12' y2='28' strokeDasharray='4 6'/>
                <polyline points='5 21 12 28 19 21'/>
              </svg>
            </div>

            {/* ROW 2 — arrows point left on desktop */}
            <div className='grid grid-cols-1 lg:grid-cols-[minmax(180px,1fr)_auto_minmax(180px,1fr)_auto_minmax(180px,1fr)] gap-6'>

              <ProcessCard
                icon={FaHammer}
                title='Elev bygger'
                description='Produktet lages av elever under veiledning av erfarne fagfolk.'
              />

              {/* Desktop arrow left */}
              <div className='hidden lg:flex justify-center items-center w-30 xl:w-40'>
                <svg width='100%' height='24' viewBox='0 0 200 24' fill='none'
                  stroke='#c0392b' strokeWidth='4' strokeLinecap='round' strokeLinejoin='round'>
                  <line x1='199' y1='12' x2='12' y2='12' strokeDasharray='11 16'/>
                  <polyline points='19 5 12 12 19 19'/>
                </svg>
              </div>
              {/* Mobile arrow down */}
              <div className='flex lg:hidden justify-center'>
                <svg width='24' height='40' viewBox='0 0 24 40' fill='none'
                  stroke='#c0392b' strokeWidth='4' strokeLinecap='round' strokeLinejoin='round'>
                  <line x1='12' y1='1' x2='12' y2='28' strokeDasharray='4 6'/>
                  <polyline points='5 21 12 28 19 21'/>
                </svg>
              </div>

              <ProcessCard
                icon={FaCircleCheck}
                title='Kvalitetskontroll'
                description='Produktet gjennomgår en grundig sjekk før det godkjennes for levering.'
              />

              {/* Desktop arrow left */}
              <div className='hidden lg:flex justify-center items-center w-30 xl:w-40'>
                <svg width='100%' height='24' viewBox='0 0 200 24' fill='none'
                  stroke='#c0392b' strokeWidth='4' strokeLinecap='round' strokeLinejoin='round'>
                  <line x1='199' y1='12' x2='12' y2='12' strokeDasharray='11 16'/>
                  <polyline points='19 5 12 12 19 19'/>
                </svg>
              </div>
              {/* Mobile arrow down */}
              <div className='flex lg:hidden justify-center'>
                <svg width='24' height='40' viewBox='0 0 24 40' fill='none'
                  stroke='#c0392b' strokeWidth='4' strokeLinecap='round' strokeLinejoin='round'>
                  <line x1='12' y1='1' x2='12' y2='28' strokeDasharray='4 6'/>
                  <polyline points='5 21 12 28 19 21'/>
                </svg>
              </div>

              <ProcessCard
                icon={FaTruck}
                title='Levering / henting'
                description='Du henter produktet på skolen, eller vi avtaler levering.'
              />
            </div>

          </div>
        </section>

        {reviews.length > 0 && (
          <section className="my-40 max-w-7xl mx-auto px-6">
            <h1 className='heading-1 text-center mb-20'>Anmeldelser fra våre tidligere kunder</h1>
            <ReviewsCarousel reviews={reviews} />
          </section>
        )}
      </div>
   
  )
}

function ProcessCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div className='card border border-primary p-6 flex flex-col items-center text-center gap-3'>
      <Icon className='text-primary text-4xl' />
      <h3 className='heading-3'>{title}</h3>
      <p className='small-text text-muted'>{description}</p>
    </div>
  )
}

export default page