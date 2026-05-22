"use client"
import { Toaster } from 'react-hot-toast'

export default function AppToaster() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: 'var(--color-surface-float)',
          color: 'var(--color-text)',
          border: '1px solid var(--color-border)',
          boxShadow: '0 4px 12px rgb(0 0 0 / 0.1)',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.875rem',
          borderRadius: 'var(--radius-md)',
          padding: '0.75rem 1rem',
          maxWidth: '380px',
        },
        success: {
          iconTheme: {
            primary: 'var(--color-success)',
            secondary: 'var(--color-success-bg)',
          },
        },
        error: {
          iconTheme: {
            primary: 'var(--color-error)',
            secondary: 'var(--color-error-bg)',
          },
        },
        loading: {
          iconTheme: {
            primary: 'var(--color-secondary)',
            secondary: 'var(--color-surface-raised)',
          },
        },
      }}
    />
  )
}
