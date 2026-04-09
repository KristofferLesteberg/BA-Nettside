"use client";
import React from 'react'
import { signIn } from 'next-auth/react'
import { redirect } from 'next/navigation';

import { useState } from 'react';


export const LoginForm = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const {error, setError} = useState("")
  
  const handleLogin = async (e) => {
    e.preventDefault()

    const result = await signIn("credentials", {
      username: username,
      password: password,
      redirect: false
    })

    if(result.error) {
      console.log("error")
      setError("Feil passord eller brukernavn")
    } else {
      redirect('/admin')

    }
 
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder='brukernavn'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder='passord'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && (
        <p>{error}</p>
      )}
      <button type='submit'>log in</button>
    </form>
   
   
  )
}
