"use client"
import React from 'react'
import { useSession } from 'next-auth/react'

import { signOut } from 'next-auth/react'

const page = () => {

  const { data: session, status} = useSession()

  console.log(status)
  console.log(session)
  

      
  return (
    <div>
      <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000/admin/login' })} >Log out</button>
    
    </div>
  )
}

export default page