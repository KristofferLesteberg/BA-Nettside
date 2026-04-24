"use client";

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e: { preventDefault(): void }) => {
    e.preventDefault()
    setError("")
    const result = await signIn("credentials", { username, password, redirect: false })
    if (result?.error) {
      setError("Feil brukernavn eller passord")
    } else {
      router.push('/admin')
    }
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 bg-sunken">
      <div className="w-full max-w-2xl card card-accented overflow-hidden p-0">

        <div className="bg-secondary px-6 py-5">
          <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1">Administrasjonspanel</p>
          <h2 className="heading-2 text-white">Logg inn</h2>
        </div>

        <form onSubmit={handleLogin} className="bg-page px-6 py-6 space-y-5">
          {error && (
            <p className="small-text text-error bg-error-bg border border-error rounded-md px-3 py-2">
              {error}
            </p>
          )}
          <div className="space-y-1">
            <label className="label">Brukernavn</label>
            <input
              type="text"
              className="input"
              placeholder="Skriv inn brukernavn"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="label">Passord</label>
            <input
              type="password"
              className="input"
              placeholder="Skriv inn passord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">Logg inn</button>
        </form>

      </div>
    </div>
  )
}
