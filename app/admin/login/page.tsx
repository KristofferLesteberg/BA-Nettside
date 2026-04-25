"use client";

import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

function OAuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  if (!error) return null
  return (
    <p className="small-text text-error bg-error-bg border border-error rounded-md px-3 py-2">
      {error === 'AccessDenied'
        ? 'Denne Google-kontoen har ikke tilgang.'
        : 'Noe gikk galt. Prøv igjen.'}
    </p>
  )
}

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

        <div className="bg-page px-6 py-6 space-y-5">
          <Suspense>
            <OAuthError />
          </Suspense>

          <form onSubmit={handleLogin} className="space-y-4">
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

          <div className="flex items-center gap-3">
            <hr className="flex-1" />
            <span className="small-text">eller</span>
            <hr className="flex-1" />
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl: '/admin' })}
            className="btn btn-outline w-full gap-2"
          >
            <GoogleIcon />
            Fortsett med Google
          </button>
        </div>

      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.013 17.64 11.706 17.64 9.2z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.96L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  )
}
