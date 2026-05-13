import { auth } from "@/auth"
import { NextResponse } from "next/server"

export const proxy = auth((req) => {
    const isAuthRoute = req.nextUrl.pathname === '/login' ||
        req.nextUrl.pathname === '/signup'

    const isPublicRoute = req.nextUrl.pathname === '/'

    if (!req.auth && !isAuthRoute && !isPublicRoute) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    if (req.auth && isAuthRoute) {
        return NextResponse.redirect(new URL('/', req.url))
    }
})

export const config = {
    matcher: ["/login", "/signup", "/setup", "/", "/dashboard"],
}
