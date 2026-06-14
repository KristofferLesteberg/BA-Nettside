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

const prereqContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
}

const prereqItem: Variants = {
  hidden: (i: number) => ({ opacity: 0, x: i % 2 === 0 ? 80 : -80 }),
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function PrerequisitesForm() {
  const [checked, setChecked] = useState<boolean[]>(
    prerequisites.map(() => false)
  )
  const [allChecked, setAllChecked] = useState<boolean>(false)

  useEffect(() => {
    setAllChecked(checked.length > 0 && checked.every(c => c === true))
  }, [checked])

  const toggle = (index: number) => {
    const updated = [...checked]
    updated[index] = !updated[index]
    setChecked(updated)
  }

  return (
    <section className='max-w-5xl mx-auto px-4 section-padding-sm text-center'>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className='heading-1 mt-5'>Hva vi ber om av dere:</h2>
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
        className='text-primary text-center italic mt-4'
      >
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
  )
}
