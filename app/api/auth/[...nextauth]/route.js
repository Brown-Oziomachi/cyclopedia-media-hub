
import { handlers } from "@/auth"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Facebook from "next-auth/providers/facebook"
import Google from "next-auth/providers/google"

export const { GET, POST } = handlers
export const {signIn, signOut, auth } = NextAuth({
    providers: [Google],
    providers: [GitHub],
    providers: [Facebook],
})

