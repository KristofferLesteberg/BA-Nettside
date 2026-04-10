"use client"
import React from 'react'
import { useSession } from 'next-auth/react'

import { redirect } from 'next/navigation'
import { signOut } from 'next-auth/react'

const page = () => {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      console.log("logged out!")
      redirect('/admin/login')
     
    }
  })
      
  return (
    <div>
      <button onClick={() => signOut()} ></button>
    </div>
  )
}

export default page