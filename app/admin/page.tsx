"use client"
import React, { useState } from 'react'

import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

import NewProduct from '../components/admin/NewProduct'

const page = () => {      
  const [btn, setBtn] =  useState(false)
  

  const { data: session, status} = useSession()
  

  console.log(session)
  console.log(status)


  return (
    <div>
      <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000/admin/login' })} >Log out</button>
      <p>logged in as {session?.user?.name}</p>


      <NewProduct />
    </div>
  )
}

export default page