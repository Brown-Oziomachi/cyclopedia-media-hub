// lib/auth.js
import { auth } from '../lib/firebase'
import { useRouter } from 'next/router'

export const handleAction = (redirectPath) => {
  const user = auth.currentUser
  if (!user) {
    // Store desired redirect path
    sessionStorage.setItem("redirectAfterLogin", redirectPath)
    // Redirect to login
    window.location.href = "/login"
  } else {
    // Proceed with action
    window.location.href = redirectPath
  }
}