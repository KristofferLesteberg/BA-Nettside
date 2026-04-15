"use client"
import React from 'react'

import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

const page = () => {      

  const { data: session, status} = useSession()

  console.log(session)
  console.log(status)


  return (
    <div>
      <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000/admin/login' })} >Log out</button>
      <p>logged in as {session?.user?.name}</p>
    </div>
  )
}

export default page