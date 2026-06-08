import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { getAppConfig } from '@/app/lib/app-config'
import { CONFIG_KEYS } from '@/app/lib/app-config-keys'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const [username, password] = await Promise.all([
          getAppConfig(CONFIG_KEYS.ADMIN_USERNAME),
          getAppConfig(CONFIG_KEYS.ADMIN_PASSWORD),
        ])
        if (
          credentials?.username === username &&
          credentials?.password === password
        ) {
          return { id: '1', name: 'Admin' }
        }
        return null
      },
    }),
  ],
  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider === 'google') {
        const allowlist = await getAppConfig(CONFIG_KEYS.ADMIN_EMAIL_ALLOWLIST)
        const allowed = (allowlist ?? '')
          .split(',')
          .map((e) => e.trim())
          .filter(Boolean)
        return allowed.includes(user.email ?? '')
      }
      return true
    },
    async jwt({ token, account }) {
      // On first sign-in, stamp the expiry from the configured lifetime
      if (account) {
        const lifetimeStr = await getAppConfig(CONFIG_KEYS.SESSION_LIFETIME_SECONDS)
        const lifetime = Number(lifetimeStr ?? 3600)
        token.exp = Math.floor(Date.now() / 1000) + lifetime
      }

      // Drop sessions issued before the last invalidation bump
      const invalidatedAt = await getAppConfig(CONFIG_KEYS.SESSION_INVALIDATED_AT)
      if (invalidatedAt && typeof token.iat === 'number') {
        if (token.iat * 1000 < new Date(invalidatedAt).getTime()) {
          return null as unknown as typeof token
        }
      }

      return token
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7, // outer cookie TTL — actual expiry is controlled by token.exp above
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
}
