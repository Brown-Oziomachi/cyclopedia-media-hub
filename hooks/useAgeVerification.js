// hooks/useAgeVerification.js
import { doc, getDoc } from "firebase/firestore";
import { db1 } from "@/lib/firebaseConfig";

export const checkAgeVerification = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db1, "users", userId));
    const user = userDoc.data();
    
    if (!user?.ageVerified) {
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error verifying age:", error);
    return false;
  }
};