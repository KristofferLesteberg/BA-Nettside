import React from 'react'
import Link from 'next/link'



export default function Projects() {
  return (
    <main>

            {/* Hero */}
            <section className="bg-subtle border-y border-border py-24 px-4">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    
                    <div className="flex flex-col flex-1 gap-6">
                        <span className="badge badge-primary w-fit">Prosjekter</span>
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

            {/*Prerequisites*/}
            <section>
              <div className='max-w-5xl card mx-auto mt-5'>
                
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

            {/* Bottom CTA */}
            <section className="bg-subtle border-y border-border py-20 px-4">
                <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-4">
                    <h2 className="heading-2">Klar til å komme i gang?</h2>
                    <p className="body-text">
                        Send oss en forespørsel så hører du fra oss så snart som mulig.
                    </p>
                    <Link href="/projects/request-project">
                        <button className="btn btn-primary">Bestill prosjekt</button>
                    </Link>
                </div>
            </section>

        </main>
  )
}