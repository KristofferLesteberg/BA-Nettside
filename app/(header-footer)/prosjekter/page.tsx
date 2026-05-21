"use client"
import { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import Checkbox from '@/components/shared/checkbox'
import Image from 'next/image'

interface Prerequisite {
  label: string
  description: ReactNode
}
const prerequisites : Prerequisite[] = [
    {
      label: "Læreplan",
      description: <>Oppdraget passer inn i våre <Link href='https://www.udir.no/lk20/bat01-03' className='text-primary underline'>Læreplanmål</Link></>
    },
    {
      label: "Tidsfrister",
      description: "Prosjektet er uten tidsfrister"
    },
    {
      label: "Fasiliteter",
      description: "Stille med toalett, garderobe og pausefasiliteter"
    },
    {
      label: "Sted",
      description: "Oppdraget er ikke langs offentlig vei"
    },
    {
      label: "Byggekonto",
      description: "Må ha en byggkonto"
    }

  ]

export default function Projects() {

  const [checked, setChecked] = useState<boolean[]>(
    prerequisites.map(() => false)
  )
  
  const [allChecked, setAllChecked] = useState<boolean>(false)

  useEffect(() => {
    console.log(allChecked, checked)

  }, [])
  

  useEffect(() => {
    setAllChecked(checked.length > 0 && checked.every(c => c === true))
  }, [checked])
  

  const toggle = (index: number) => {
    const updated = [...checked]
    updated[index] = !updated[index]
    setChecked(updated)
  }
  return (
    <div>
      <section
        className='relative h-[60vh]'
        style={{ backgroundImage: 'url("/static-images/fp-img2.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center 30%' }}
      >
        <div className='absolute inset-0 bg-black/50' />
        <div className='relative z-10 h-full flex flex-col items-center justify-center text-center px-4'>
          <span className='heading-1 text-white mb-4'>Prosjekter</span>
          <h1 className='text-white font-bold' style={{ fontSize: '3.5rem', lineHeight: '1.1', letterSpacing: '-0.02em', fontFamily: 'var(--font-display)' }}>Få jobben gjort av fagfolk</h1>
          <p className='text-white/80 text-xl mt-4 max-w-2xl'>Vi tar på oss prosjekter innen bygg og anlegg. Fortell oss hva du trenger så gir vi deg et tilbud.</p>
          <div className='mt-6'>
            <a href='#forutsetninger' className='btn btn-primary hover:bg-primary-hover'>Bestill et prosjekt</a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="heading-2 text-center mb-12">Slik fungerer det</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
            <div className="card flex flex-col gap-3">
              <span className="text-3xl font-bold text-primary">01</span>
              <h3 className="heading-3">Send forespørsel</h3>
              <p className="body-text">
                Fyll ut skjemaet med informasjon om prosjektet ditt.
              </p>
            </div>
            <div className="card flex flex-col gap-3">
              <span className="text-3xl font-bold text-primary">02</span>
              <h3 className="heading-3">Vi tar kontakt</h3>
              <p className="body-text">
                Vi vurderer forespørselen og tar kontakt med et tilbud.
              </p>
            </div>
            <div className="card flex flex-col gap-3">
              <span className="text-3xl font-bold text-primary">03</span>
              <h3  id='forutsetninger' className="heading-3">Jobben utføres</h3>
              <p className="body-text">
                Faglig dyktige elever utfører jobben under veiledning.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Prerequisites */}
      <section className='max-w-5xl mx-auto px-4 mb-40'>
        <h1 className='heading-1 text-center mt-5'>Hva vi ber om av dere:</h1>

        <div className='max-w-4xl card mx-auto mt-5'>
          <div className='flex flex-col gap-4'>
            {prerequisites.map((item: Prerequisite, index: number) => (
              <div key={index} className='flex flex-row items-center justify-between gap-4 border-b border-border last:border-0 pb-4 last:pb-0'>
                <div className='flex flex-col gap-1'>
                  <b className='text-primary text-lg'>{item.label}</b>
                  <p className='body-text text-muted'>{item.description}</p>
                  
                </div>
                <div className='shrink-0'>
                  <Checkbox checked={checked[index]} callback={() => toggle(index)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className='text-primary text-center italic mt-4'>
          Krysser du av alle punktene ovenfor godkjenner du at prosjektet oppfyller kravene vi har satt
        </p>
        <div className='mt-4 w-full flex justify-center'>
          {allChecked ? (
            <Link className="btn btn-primary w-full sm:w-64 justify-center cursor-pointer" href="/prosjekter/bestill-prosjekt">
              Bestill et prosjekt!
            </Link>
          ) : (
            <button disabled className="btn btn-primary w-full sm:w-64">Bestill et prosjekt!</button>
          )}
        </div>
      </section>
     </div>
  )
}