import type { Metadata } from 'next'
import Image from 'next/image'
import MotionDiv from '@/components/shared/MotionDiv'
import PrerequisitesForm from '@/components/projects/PrerequisitesForm'

export const metadata: Metadata = {
  title: 'Prosjekter',
  description: 'Bestill et prosjekt fra elever på bygg- og anleggsteknikk ved Sam Eyde VGS. Vi tar på oss prosjekter innen bygg og anlegg.',
}

const cardContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const cardItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function ProjectsPage() {
  return (
    <div>
      <section className='relative h-[60vh]'>
        <Image
          src="/static-images/fp-img2.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center 30%' }}
        />
        <div className='absolute inset-0 bg-overlay-dark' />
        <div className='relative z-10 h-full flex flex-col items-center justify-center text-center px-4'>
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className='heading-1 text-white mb-4'>Prosjekter</span>
          </MotionDiv>
          <MotionDiv
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <h1 className='heading-display text-white'>Få jobben gjort av fagfolk</h1>
          </MotionDiv>
          <MotionDiv
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className='text-text-on-dark-muted text-xl mt-4 max-w-2xl'>
              Vi tar på oss prosjekter innen bygg og anlegg. Fortell oss hva du trenger så gir vi deg et tilbud.
            </p>
          </MotionDiv>
          <MotionDiv
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className='mt-6'
          >
            <a href='#forutsetninger' className='btn btn-primary hover:bg-primary-hover'>Bestill et prosjekt</a>
          </MotionDiv>
        </div>
      </section>

      <section className="section-padding container-px">
        <div className="max-w-5xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="heading-2">Slik fungerer det</h2>
          </MotionDiv>
          <MotionDiv
            variants={cardContainer}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <MotionDiv variants={cardItem} className="card flex flex-col gap-3">
              <span className="text-3xl font-bold text-primary">01</span>
              <h3 className="heading-3">Send forespørsel</h3>
              <p className="body-text">Fyll ut skjemaet med informasjon om prosjektet ditt.</p>
            </MotionDiv>
            <MotionDiv variants={cardItem} className="card flex flex-col gap-3">
              <span className="text-3xl font-bold text-primary">02</span>
              <h3 className="heading-3">Vi tar kontakt</h3>
              <p className="body-text">Vi vurderer forespørselen og tar kontakt med et tilbud.</p>
            </MotionDiv>
            <MotionDiv variants={cardItem} className="card flex flex-col gap-3">
              <span className="text-3xl font-bold text-primary">03</span>
              <h3 id='forutsetninger' className="heading-3">Jobben utføres</h3>
              <p className="body-text">Faglig dyktige elever utfører jobben under veiledning.</p>
            </MotionDiv>
          </MotionDiv>
        </div>
      </section>

      <PrerequisitesForm />
    </div>
  )
}
