"use client"

/*Check session in troughout the page with useSession*/

import { SessionProvider } from "next-auth/react"
export default function provider({ children }: { children: React.ReactNode}) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}