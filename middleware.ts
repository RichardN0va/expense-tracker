import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const { nextUrl, auth: session } = req
    const isLoggedIn = !!session
    const isLoginPage = nextUrl.pathname === "/login"
    const isSignUpPage = nextUrl.pathname === "/signup"
    const isSetupPage = nextUrl.pathname === "/setup"

    if (!isLoggedIn && isSetupPage) {
        const loginUrl = new URL("/login", nextUrl.origin)
        return NextResponse.redirect(loginUrl)
    }

    if (isLoggedIn && (isLoginPage || isSignUpPage)) {
        const dashboardUrl = new URL("/", nextUrl.origin)
        return NextResponse.redirect(dashboardUrl)
    }

    return NextResponse.next()
})

export const config = {
    matcher: ["/login", "/signup", "/setup", "/"],
}