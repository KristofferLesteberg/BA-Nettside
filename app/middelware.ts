//Sends unautharized user to the admin/login page

export { default } from 'next-auth/middleware'
export const config = {
    matcher: ['/admin/:path*']
}