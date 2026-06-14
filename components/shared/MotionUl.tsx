'use client'
import { motion, HTMLMotionProps } from 'motion/react'

export default function MotionUl({ children, ...props }: HTMLMotionProps<'ul'>) {
  return <motion.ul {...props}>{children}</motion.ul>
}
