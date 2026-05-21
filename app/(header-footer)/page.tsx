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
    <div className='mt-30'>

      {/* HERO */}
      <section className='max-w-full bg-subtle border-b min-h-[calc(100vh-7.5rem)] flex items-center relative overflow-hidden'>
        <div className='absolute bottom-0 left-0 w-32 h-1 bg-primary pointer-events-none' />

        <div className='flex flex-col md:flex-row max-w-4/5 mx-auto px-3 py-16 items-center gap-10 w-full relative'>
          <div className='flex flex-col gap-4'>
            <span className='badge badge-primary self-start'>Sam Eyde VGS</span>
            <h1 className='heading-1'>Kjøp byggematerialer eller <br />få jobben gjort av <br />fagfolk</h1>
            <p className='body-text text-muted max-w-120'>
              Produkter og prosjekter laget av elever ved Bygg- og Anleggslinjen — under veiledning av erfarne fagfolk.
            </p>
            <div className='flex flex-row flex-wrap gap-3 mt-2'>
              <Link href='/produkter'>
                <button className='btn btn-primary'>Se på våre produkter!</button>
              </Link>
              <Link href='/prosjekter'>
                <button className='btn btn-secondary'>Bestill en av våre Elever!</button>
              </Link>
            </div>
          </div>
          <div
            style={{ backgroundImage: 'url("/static-images/fp-img1.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center 50%' }}
            className='w-full md:w-1/2 md:min-h-105 h-64 rounded-xl shadow-lg ml-auto shrink-0'
          />
        </div>
      </section>

      {/* TWO LINES */}
      <section className='mt-16 mb-10'>
        <div className='text-center mb-8'>
          <h1 className='heading-1'>Vi tilbyr prosjekter og produkter fra to Linjer</h1>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-4/5 mx-auto'>

          <div className='card overflow-hidden flex flex-col border-t-4 border-t-yellow-500'>
            <div
              style={{ backgroundImage: 'url("/static-images/fp-img2.jpg")', backgroundSize: 'auto 95%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center 50%' }}
              className='w-full h-52 bg-yellow-100'
            />
            <div className='p-6 flex flex-col gap-3'>
              <h2 className='heading-2'>Bygg</h2>
              <p className='body-text text-muted'>
                Bygglinjen tilbyr håndverksprodukter laget av elever under veiledning av erfarne fagfolk.
                Her kan du kjøpe alt fra møbler til mindre byggeprosjekter, og være trygg på at kvaliteten
                er ivaretatt gjennom hele prosessen.
              </p>
              <Link href='/produkter'>
                <button className='btn btn-outline self-start'>Se produkter →</button>
              </Link>
            </div>
          </div>

          <div className='card overflow-hidden flex flex-col border-t-4 border-t-primary'>
            <div
              style={{ backgroundImage: 'url("/static-images/fp-img3.jpg")', backgroundSize: 'auto 95%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center 50%' }}
              className='w-full h-52 bg-red-100'
            />
            <div className='p-6 flex flex-col gap-3'>
              <h2 className='heading-2'>Anlegg</h2>
              <p className='body-text text-muted'>
                Anleggslinjen spesialiserer seg på utendørsarbeid og anleggsprosjekter. Elevene jobber
                med virkelige oppdrag og leverer kvalitet du kan stole på – alltid under faglig veiledning.
              </p>
              <Link href='/prosjekter'>
                <button className='btn btn-outline self-start'>Bestill prosjekt →</button>
              </Link>
            </div>
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
        <section className='my-40 max-w-7xl mx-auto px-6'>
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
    <div className='card border border-primary p-6 flex flex-col items-center text-center hover:shadow-xl gap-3'>
      <Icon className='text-primary text-4xl' />
      <h3 className='heading-3'>{title}</h3>
      <p className='small-text text-muted'>{description}</p>
    </div>
  )
}

export default page
