"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Checkbox from '../components/shared/checkbox'
interface Prerequisite {
  label: string
  description: string
}
const prerequisites : Prerequisite[] = [
    {
      label: "Læreplan",
      description: "Oppdraget passer inn i vår læreplanmål"
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
    <main>

            {/* Hero */}
            <section className="bg-subtle border-y border-border py-24 px-4">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    
                    <div className="flex flex-col flex-1 gap-6">
                        <h1 className='heading-1 text-5xl text-primary'>Prosjekter</h1>
                        <h1 className="heading-1">
                            Få jobben gjort av fagfolk
                        </h1>
                        <p className="body-text text-lg">
                            Vi tar på oss prosjekter innen bygg og anlegg. 
                            Fortell oss hva du trenger så gir vi deg et tilbud.
                        </p>
                    </div>

                    <div className="w-full md:w-1/2 h-64 md:h-80 rounded-lg bg-muted flex items-center justify-center text-text-faint shrink-0">
                        Bilde kommer
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
                            <h3 className="heading-3">Jobben utføres</h3>
                            <p className="body-text">
                                Faglig dyktige elever utfører jobben under veiledning.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/*Prerequisites*/}
            <section className='w-5xl mx-auto mb-40'>
              <h1 className='heading-1 text-center mt-5'>Hva vi ber om av dere:</h1>
              
              <div className='max-w-5xl card mx-auto mt-5 '>
                <div className='flex flex-col gap-4'>

                  {prerequisites.map((item: Prerequisite, index: number) => (
                    <ul key={index} className='w-full mb-3'>
                      <li>
                        <b className='text-primary text-lg'>{item.label}</b>
                        <div className='flex flex-row'>
                          <p className='text-m'>{item.description}</p>
                            <Checkbox checked={checked[index]} callback={() => toggle(index)}/>
                        </div>
                      </li>
                    </ul>    
                  ))}

                </div>
                
              </div>
              <p className='text-primary text-center italic mt-4'>Kryss av alle boksene for å gå videre til bestille et prosjekt</p>
              <div className=' mt-4 w-full flex flex-row justify-center' >
                {allChecked ? (

                        <Link className="btn btn-primary w-1/3 h-10 cursor-pointer" href="/projects/request-project">
                          <button className="cursor-pointer">Bestill et prosjekt!</button>
                        </Link>

                      ) : (
                        <button disabled className="btn btn-primary w-1/3 h-10">Bestill et prosjekt!</button>

                      )}
              </div>
            </section>
         

        </main>
  )
}