"use client"
import { ReactNode, useEffect, useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'motion/react'
import Link from 'next/link'
import Checkbox from '@/components/shared/checkbox'

interface Prerequisite {
  label: string
  description: ReactNode
}

const prerequisites: Prerequisite[] = [
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

const cardContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const cardItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const prereqContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
}

const prereqItem: Variants = {
  hidden: (i: number) => ({ opacity: 0, x: i % 2 === 0 ? 80 : -80 }),
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

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
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className='heading-1 text-white mb-4'
          >
            Prosjekter
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className='text-white font-bold'
            style={{ fontSize: '3.5rem', lineHeight: '1.1', letterSpacing: '-0.02em', fontFamily: 'var(--font-display)' }}
          >
            Få jobben gjort av fagfolk
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='text-white/80 text-xl mt-4 max-w-2xl'
          >
            Vi tar på oss prosjekter innen bygg og anlegg. Fortell oss hva du trenger så gir vi deg et tilbud.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className='mt-6'
          >
            <a href='#forutsetninger' className='btn btn-primary hover:bg-primary-hover'>Bestill et prosjekt</a>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="heading-2 text-center mb-12"
          >
            Slik fungerer det
          </motion.h2>
          <motion.div
            variants={cardContainer}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <motion.div variants={cardItem} className="card flex flex-col gap-3">
              <span className="text-3xl font-bold text-primary">01</span>
              <h3 className="heading-3">Send forespørsel</h3>
              <p className="body-text">Fyll ut skjemaet med informasjon om prosjektet ditt.</p>
            </motion.div>
            <motion.div variants={cardItem} className="card flex flex-col gap-3">
              <span className="text-3xl font-bold text-primary">02</span>
              <h3 className="heading-3">Vi tar kontakt</h3>
              <p className="body-text">Vi vurderer forespørselen og tar kontakt med et tilbud.</p>
            </motion.div>
            <motion.div variants={cardItem} className="card flex flex-col gap-3">
              <span className="text-3xl font-bold text-primary">03</span>
              <h3 id='forutsetninger' className="heading-3">Jobben utføres</h3>
              <p className="body-text">Faglig dyktige elever utfører jobben under veiledning.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Prerequisites */}
      <section className='max-w-5xl mx-auto px-4 mb-40 text-center'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h1 className='heading-1 mt-5'>Hva vi ber om av dere:</h1>
          <i className='text-small'>Skal prosjektet foregå på skolen, stiller vi med fasiliteter og sted</i>
        </motion.div>

        <div className='max-w-4xl card mx-auto mt-5'>
          <motion.div
            variants={prereqContainer}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.1 }}
            className='flex flex-col gap-4'
          >
            {prerequisites.map((prereq: Prerequisite, index: number) => (
              <motion.div
                key={index}
                variants={prereqItem}
                custom={index}
                className='flex flex-row items-center justify-between gap-4 border-b border-border last:border-0 pb-4 last:pb-0'
              >
                <div className='flex flex-col gap-1'>
                  <div className='flex items-center'>
                    <b className='text-primary text-lg'>{prereq.label}</b>
                  </div>
                  <p className='body-text text-muted'>{prereq.description}</p>
                </div>
                <div className='shrink-0'>
                  <Checkbox checked={checked[index]} callback={() => toggle(index)} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <motion.p 
            variants={prereqItem}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.1 }}
            className='text-primary text-center italic mt-4'>
            Krysser du av alle punktene ovenfor godkjenner du at prosjektet oppfyller kravene vi har satt
        </motion.p>

        <div className='mt-4 w-full flex justify-center'>
          <AnimatePresence mode='wait'>
            {allChecked ? (
              <motion.div
                key='enabled'
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link className="btn btn-primary w-full sm:w-64 justify-center cursor-pointer" href="/prosjekter/bestill-prosjekt">
                  Bestill et prosjekt!
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key='disabled'
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <button disabled className="btn btn-primary w-full sm:w-64">Bestill et prosjekt!</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
