
import { handlers } from "@/auth"

import NextAuth from "next-auth"
import Facebook from "next-auth/providers/facebook"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export const { GET, POST } = handlers
export const {signIn, signOut, auth } = NextAuth({
    providers: [Google],
    providers: [GitHub],
    providers: [Facebook],
})

