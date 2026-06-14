'use client'
import { motion, HTMLMotionProps } from 'motion/react'

export default function MotionLi({ children, ...props }: HTMLMotionProps<'li'>) {
  return <motion.li {...props}>{children}</motion.li>
}
