"use client"
import React, { useState } from 'react'

import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'



const page = () => {      
  const [btn, setBtn] =  useState(false)
  

  const { data: session, status} = useSession()
  

  console.log(session)
  console.log(status)


  return (
    <div>
      <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000/admin/login' })} >Log out</button>
      <p>logged in as {session?.user?.name}</p>

      <Link href={"/admin/newProduct"}>
        <button>Nytt produkt</button>
      </Link>
      
    </div>
  )
}

export default page