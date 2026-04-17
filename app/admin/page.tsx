"use client"
import React, { useState } from 'react'

import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import DeleteProduct from '../components/admin/DeleteProduct'



const page = () => {      
  const { data: session, status} = useSession()
  

  console.log(session)
  console.log(status)


  return (
    <div>
      <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000/admin/login' })} >Log out</button>
      <p>logged in as {session?.user?.name}</p>

      <Link href={"/admin/newProduct"}>
        <button
          className='a'>
          Nytt produkt
        </button>
      </Link>

      <DeleteProduct productID={"1"}/>
    </div>
  )
}

export default page