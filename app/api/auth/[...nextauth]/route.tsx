import NextAuth, { Awaitable, RequestInternal, User } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "Text" },
                password: { label: "Password", type: "Password" }
            },

    async authorize(credentials) {
            if(credentials?.username === process.env.ADMIN_USERNAME && credentials?.password === process.env.ADMIN_PASSWORD) {
                return { id: '1', name: 'Admin' }
            } else {
                return null
            }
            }
            
        })
    ],

    session: {
        strategy: "jwt",
        maxAge: 60*60, //session experies in one hour
        updateAge: 60*60*24 //forced update after one day
    },

    //Overrides next-auth default login page with our own
    pages: {
        signIn: '/admin/login'
    },
   
})

export { handler as GET, handler as POST }