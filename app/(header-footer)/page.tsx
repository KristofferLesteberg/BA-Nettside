export const dynamic = 'force-dynamic'
// Forces NextJS to not prerender this page statically
// Is useful since the DB file that NEXT tries to acces doesnt exist yet
// P.S. Claude - "ur welcome buddy".
import Link from 'next/link'
import { getAllReviews } from '@/actions/reviews'
import ReviewsCarousel from '@/components/shared/ReviewsCarousel'
import MotionDiv from '@/components/shared/MotionDiv'
import ProcessCardsGrid from '@/components/landing/ProcessCardsGrid'

const page = async () => {
  const reviews = await getAllReviews()

  return (
    <div>
      <section
        className='relative h-[calc(100vh-5rem)]'
        style={{ backgroundImage: 'url("/static-images/fp-img1.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center 30%' }}
      >
        <div className='absolute inset-0 bg-black/50' />
        <div className='relative z-10 h-full flex flex-col'>
          <div className='h-20 shrink-0' />
          <div className='flex-1 flex flex-col items-center justify-center text-center px-4 pb-10'>
            <MotionDiv
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className='text-white font-bold' style={{ fontSize: '3.5rem', lineHeight: '1.1', letterSpacing: '-0.02em', fontFamily: 'var(--font-display)' }}>
                Kjøp byggematerialer eller få jobben gjort av fagfolk
              </h1>
            </MotionDiv>
            <MotionDiv
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className='text-white/80 text-xl mt-4 max-w-2xl'>
                Velkommen til Sam Eyde VGS – her kan du kjøpe produkter eller bestille prosjekter fra våre elever.
              </p>
            </MotionDiv>
            <MotionDiv
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className='flex flex-row gap-3 mt-6'
            >
              <Link href="/produkter">
                <button className='btn btn-primary p-3 hover:bg-primary-hover'>Se på våre produkter!</button>
              </Link>
              <Link href="/prosjekter">
                <button className='btn btn-primary p-3 hover:bg-primary-hover'>Bestill en av våre Elever!</button>
              </Link>
            </MotionDiv>
          </div>
        </div>
      </section>

      <div className='mt-30'>
        <section className='mt-30'>
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='text-center mb-20'
          >
            <h1 className='heading-1'>Vi tilbyr prosjekter og produkter fra to Linjer</h1>
          </MotionDiv>

          {/*DESCRIPTION*/}
          <div className='flex flex-col w-4/5 ml-auto mr-auto'>
            <MotionDiv
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h1 className='heading-1 p-6'>Bygg:</h1>
              <hr />
              <div className='flex flex-col md:flex-row items-center mb-10'>
                <p className='max-w-1/2 text-center'>
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
                <div style={{ backgroundImage: 'url("/static-images/fp-img2.jpg")', backgroundSize: 'auto 95%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center 50%' }} className='w-full md:w-1/2 h-64 md:h-80 rounded-lg bg-yellow-100 flex items-center justify-center m-4'>
                </div>
              </div>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h1 className='heading-1 p-6'>Annlegg:</h1>
              <hr />
              <div className='flex flex-col md:flex-row items-center'>
                <div style={{ backgroundImage: 'url("/static-images/fp-img3.jpg")', backgroundSize: 'auto 95%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center 50%' }} className='w-full md:w-1/2 h-64 md:h-80 rounded-lg bg-red-100 flex items-center justify-center m-4'>
                </div>
                <p className='max-w-1/2 text-center'>
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
              </div>
            </MotionDiv>
          </div>
        </section>

        {/* PROCESS CARDS */}
        <section className='mt-20 mb-40'>
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='text-center mb-20'
          >
            <h1 className='heading-1'>Hvordan går kjøps prosessen</h1>
          </MotionDiv>
          <ProcessCardsGrid />
        </section>

        {reviews.length > 0 && (
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='my-40 max-w-7xl mx-auto px-6'
          >
            <h1 className='heading-1 text-center mb-20'>Anmeldelser fra våre tidligere kunder</h1>
            <ReviewsCarousel reviews={reviews} />
          </MotionDiv>
        )}
      </div>
    </div>
  )
}

export default page
