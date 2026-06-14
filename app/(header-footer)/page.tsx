export const dynamic = 'force-dynamic'
// Forces NextJS to not prerender this page statically
// Is useful since the DB file that NEXT tries to acces doesnt exist yet
// P.S. Claude - "ur welcome buddy".
import Image from 'next/image'
import Link from 'next/link'
import { getAllReviews } from '@/actions/reviews'
import ReviewsCarousel from '@/components/shared/ReviewsCarousel'
import MotionDiv from '@/components/shared/MotionDiv'
import ProcessCardsGrid from '@/components/landing/ProcessCardsGrid'

const page = async () => {
  const reviews = await getAllReviews()

  return (
    <div>
      <section className='relative h-[calc(100vh-var(--header-height))]'>
        <Image
          src="/static-images/fp-img1.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center 30%' }}
        />
        <div className='absolute inset-0 bg-overlay-dark' />
        <div className='relative z-10 h-full flex flex-col'>
          <div className='h-(--header-height) shrink-0' />
          <div className='flex-1 flex flex-col items-center justify-center text-center px-4 pb-10'>
            <div>
              <h1 className='heading-display text-white'>
                Kjøp byggematerialer eller få jobben gjort av fagfolk
              </h1>
            </div>
            <div>
              <p className='text-text-on-dark-muted text-xl mt-4 max-w-2xl'>
                Velkommen til Sam Eyde VGS – her kan du kjøpe produkter eller bestille prosjekter fra våre elever.
              </p>
            </div>
            <div className='flex flex-row gap-3 mt-6'>
              <Link href="/produkter">
                <button className='btn btn-primary p-3 hover:bg-primary-hover'>Se på våre produkter!</button>
              </Link>
              <Link href="/prosjekter">
                <button className='btn btn-primary p-3 hover:bg-primary-hover'>Bestill en av våre Elever!</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div>
        <section className='section-padding bg-subtle'>
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='text-center mb-20 px-6'
          >
            <h1 className='heading-1'>Vi tilbyr prosjekter og produkter fra to Linjer</h1>
          </MotionDiv>

          {/*DESCRIPTION*/}
          <div className='flex flex-col w-full px-6 md:w-11/12 md:mx-auto gap-8'>
            <MotionDiv
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className='card border-l-4 border-l-primary'>
                <h2 className='heading-2 text-primary mb-6'>Bygg</h2>
                <div className='flex flex-col md:flex-row items-center gap-6'>
                  <p className='w-full md:w-1/2 body-text text-muted leading-relaxed'>
                    På bygg- og anleggsteknikk arbeider vi praktisk med oppgaver innen rørlegging,
                    betong og tømring. Vi produserer og gjennomfører ulike prosjekter på skolen, samt
                    for eksterne samarbeidspartnere.
                    Oppdragene må passe inn mot våre læreplanmål, og være uten tidsfrister.
                    Vi prioriterer oppdrag for ideelle- og offentlige organisasjoner, men kan også utføre
                    oppdrag for private ved ledig kapasitet.
                    I tømrerfaget bygger vi ulike trekonstruksjoner som boder, benker, søppelstativ,
                    postkassestativ og lignende. Vi kan også påta oss større prosjekter som bygging av
                    garasjer, klubbhus og andre mindre bygg.
                    Innen betongfaget utfører vi blant annet støpning av såler, støttemurer og mindre
                    konstruksjoner.
                    I rørleggerfaget arbeider vi med installasjon, drift og vedlikehold av vann- og
                    avløpsanlegg. Elevene får erfaring med montering av rør, sanitærutstyr og enkle
                    varmeanlegg, samt arbeid med både nye installasjoner og rehabilitering.
                  </p>
                  <div
                    style={{ backgroundImage: 'url("/static-images/fp-img2.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center 50%' }}
                    className='w-full md:w-1/2 h-64 md:h-80 rounded-lg shrink-0'
                  />
                </div>
              </div>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className='card border-l-4 border-l-secondary'>
                <h2 className='heading-2 text-secondary mb-6'>Anlegg</h2>
                <div className='flex flex-col md:flex-row-reverse items-center gap-6'>
                  <p className='w-full md:w-1/2 body-text text-muted leading-relaxed'>
                    Anleggsavdelingen har i perioder behov for anleggsoppdrag utenfor skolen.
                    Oppdragene bør kunne sysselsette 5 anleggsmaskiner samtidig. Skogsrydding med
                    motorsager kan også være aktuelt oppdrag.
                    Oppdragene må passe inn mot våre læreplanmål, og være uten tidsfrister.
                    Vi prioriterer oppdrag for ideelle- og offentlige organisasjoner, men kan også utføre
                    oppdrag for private ved ledig kapasitet.
                    Vi konkurrerer ikke med entreprenørbransjen, og vil alltid vurdere dette før vi tar på
                    oss nye oppdrag. Oppdrag i nærheten av bygninger og offentlig er som regel ikke
                    aktuelt.
                  </p>
                  <div
                    style={{ backgroundImage: 'url("/static-images/fp-img3.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center 50%' }}
                    className='w-full md:w-1/2 h-64 md:h-80 rounded-lg shrink-0'
                  />
                </div>
              </div>
            </MotionDiv>
          </div>
        </section>

        {/* PROCESS CARDS */}
        <section className='section-padding -mt-20' >
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='text-center mb-20'
          >
            <h2 className='heading-1'>Hvordan går kjøps prosessen</h2>
          </MotionDiv>
          <ProcessCardsGrid />
        </section>

        {reviews.length > 0 && (
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='section-padding max-w-7xl mx-auto px-6'
          >
            <h2 className='heading-1 text-center mb-20'>Anmeldelser fra våre tidligere kunder</h2>
            <ReviewsCarousel reviews={reviews} />
          </MotionDiv>
        )}
      </div>
    </div>
  )
}

export default page
