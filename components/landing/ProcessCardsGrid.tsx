'use client'
import { motion, type Variants } from 'motion/react'
import React from 'react'
import {
  IconSearch,
  IconStepOrder,
  IconStepApprove,
  IconSuccess,
  IconStepDeliver,
  IconStepAgreement,
} from '@/app/lib/icons'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
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

export default function ProcessCardsGrid() {
  return (
    <motion.div
      variants={container}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true, amount: 0.2 }}
      className='max-w-400 mx-auto px-6'
    >
      {/* ROW 1 */}
      <div className='grid grid-cols-1 lg:grid-cols-[minmax(180px,1fr)_auto_minmax(180px,1fr)_auto_minmax(180px,1fr)] gap-6'>

        <motion.div variants={item}>
          <ProcessCard
            icon={IconSearch}
            title='Bla gjennom produkter'
            description='Finn det du trenger i vårt utvalg av byggematerialer og ferdige produkter.'
          />
        </motion.div>

        {/* Desktop arrow right */}
        <div className='hidden lg:flex justify-center items-center w-30 xl:w-40'>
          <svg width='100%' height='24' viewBox='0 0 200 24' fill='none' className="text-primary"
            stroke='currentColor' strokeWidth='4' strokeLinecap='round' strokeLinejoin='round'>
            <line x1='1' y1='12' x2='188' y2='12' strokeDasharray='11 16'/>
            <polyline points='181 5 188 12 181 19'/>
          </svg>
        </div>
        {/* Mobile arrow down */}
        <div className='flex lg:hidden justify-center'>
          <svg width='24' height='40' viewBox='0 0 24 40' fill='none' className="text-primary"
            stroke='currentColor' strokeWidth='4' strokeLinecap='round' strokeLinejoin='round'>
            <line x1='12' y1='1' x2='12' y2='28' strokeDasharray='4 6'/>
            <polyline points='5 21 12 28 19 21'/>
          </svg>
        </div>

        <motion.div variants={item}>
          <ProcessCard
            icon={IconStepOrder}
            title='Legg inn bestilling'
            description='Send inn en bestilling direkte via nettsiden – enkelt og raskt.'
          />
        </motion.div>

        {/* Desktop arrow right */}
        <div className='hidden lg:flex justify-center items-center w-30 xl:w-40'>
          <svg width='100%' height='24' viewBox='0 0 200 24' fill='none' className="text-primary"
            stroke='currentColor' strokeWidth='4' strokeLinecap='round' strokeLinejoin='round'>
            <line x1='1' y1='12' x2='188' y2='12' strokeDasharray='11 16'/>
            <polyline points='181 5 188 12 181 19'/>
          </svg>
        </div>
        {/* Mobile arrow down */}
        <div className='flex lg:hidden justify-center'>
          <svg width='24' height='40' viewBox='0 0 24 40' fill='none' className="text-primary"
            stroke='currentColor' strokeWidth='4' strokeLinecap='round' strokeLinejoin='round'>
            <line x1='12' y1='1' x2='12' y2='28' strokeDasharray='4 6'/>
            <polyline points='5 21 12 28 19 21'/>
          </svg>
        </div>

        <motion.div variants={item}>
          <ProcessCard
            icon={IconStepApprove}
            title='Lærer godkjenner'
            description='En faglærer gjennomgår bestillingen og bekrefter at den kan gjennomføres.'
          />
        </motion.div>
      </div>

      {/* DOWN ARROW — desktop only, aligned to last column */}
      <div className='hidden lg:grid grid-cols-[minmax(180px,1fr)_auto_minmax(180px,1fr)_auto_minmax(180px,1fr)] gap-6 mt-3'>
        <div /><div className='xl:w-40 w-16'/><div /><div className='xl:w-40 w-16'/>
        <div className='flex justify-center p-4 h-30 xl:h-40'>
          <svg width='24' height='100%' viewBox='0 0 24 100' fill='none' className="text-primary"
            stroke='currentColor' strokeWidth='4' strokeLinecap='round' strokeLinejoin='round'>
            <line x1='12' y1='1' x2='12' y2='88' strokeDasharray='6 11'/>
            <polyline points='5 82 12 88 19 81'/>
          </svg>
        </div>
      </div>
      {/* Mobile */}
      <div className='flex lg:hidden justify-center mt-6 mb-6'>
        <svg width='24' height='40' viewBox='0 0 24 40' fill='none' className="text-primary"
          stroke='currentColor' strokeWidth='4' strokeLinecap='round' strokeLinejoin='round'>
          <line x1='12' y1='1' x2='12' y2='28' strokeDasharray='4 6'/>
          <polyline points='5 21 12 28 19 21'/>
        </svg>
      </div>

      {/* ROW 2 — reversed via CSS order so snake reads 4→5→6 left-to-right */}
      <div className='grid grid-cols-1 lg:grid-cols-[minmax(180px,1fr)_auto_minmax(180px,1fr)_auto_minmax(180px,1fr)] gap-6'>

        <div className='lg:order-5 flex flex-col'>
          <motion.div variants={item}>
            <ProcessCard
              icon={IconStepAgreement}
              title='Enighet'
              description='Kunde, lærer og elev blir enig om pris, levering og kontrakt'
            />
          </motion.div>
        </div>

        <div className='lg:order-4 lg:flex lg:items-center'>
          <div className='hidden lg:flex justify-center items-center w-30 xl:w-40'>
            <svg width='100%' height='24' viewBox='0 0 200 24' fill='none' className="text-primary"
              stroke='currentColor' strokeWidth='4' strokeLinecap='round' strokeLinejoin='round'>
              <line x1='199' y1='12' x2='12' y2='12' strokeDasharray='11 16'/>
              <polyline points='19 5 12 12 19 19'/>
            </svg>
          </div>
          <div className='flex lg:hidden justify-center'>
            <svg width='24' height='40' viewBox='0 0 24 40' fill='none'
              stroke='currentColor' strokeWidth='4' strokeLinecap='round' strokeLinejoin='round'>
              <line x1='12' y1='1' x2='12' y2='28' strokeDasharray='4 6'/>
              <polyline points='5 21 12 28 19 21'/>
            </svg>
          </div>
        </div>

        <div className='lg:order-3 flex flex-col'>
          <motion.div variants={item}>
            <ProcessCard
              icon={IconSuccess}
              title='Kvalitetskontroll'
              description='Produktet gjennomgår en grundig sjekk før det godkjennes for levering.'
            />
          </motion.div>
        </div>

        <div className='lg:order-2 lg:flex lg:items-center'>
          <div className='hidden lg:flex justify-center items-center w-30 xl:w-40'>
            <svg width='100%' height='24' viewBox='0 0 200 24' fill='none' className="text-primary"
              stroke='currentColor' strokeWidth='4' strokeLinecap='round' strokeLinejoin='round'>
              <line x1='199' y1='12' x2='12' y2='12' strokeDasharray='11 16'/>
              <polyline points='19 5 12 12 19 19'/>
            </svg>
          </div>
          <div className='flex lg:hidden justify-center'>
            <svg width='24' height='40' viewBox='0 0 24 40' fill='none'
              stroke='currentColor' strokeWidth='4' strokeLinecap='round' strokeLinejoin='round'>
              <line x1='12' y1='1' x2='12' y2='28' strokeDasharray='4 6'/>
              <polyline points='5 21 12 28 19 21'/>
            </svg>
          </div>
        </div>

        <div className='lg:order-1 flex flex-col'>
          <motion.div variants={item}>
            <ProcessCard
              icon={IconStepDeliver}
              title='Levering / henting'
              description='Du henter produktet på skolen, eller vi avtaler levering.'
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
