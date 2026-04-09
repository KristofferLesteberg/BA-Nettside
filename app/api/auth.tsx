import NextAuth, { Awaitable, RequestInternal, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";
import page from "../admin/page";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "Text" },
                password: { label: "Password", type: "Password" }
            },

            
    async authorize(credentials) {
            if(credentials?.username == process.env.ADMIN_USERNAME && credentials?.password == process.env.ADMIN_PASSWORD) {
                return { id: '1', name: 'Admin' }
            } else {
                return null
            }
            }
            
        })
    ],

    pages: {
        signIn: '/admin/login'
    },
    secret: //Add a .env nextauth secret
})