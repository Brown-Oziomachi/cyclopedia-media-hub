"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { db1 } from "@/lib/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Share, LinkIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";

const BlogDisplay = ({ body }) => {
  return (
    <div
      className="prose max-w-none text-gray-900"
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
};

const BlogDetails = () => {
  const { id } = useParams();
  const { data: session } = useSession();
  const router = useRouter();

  // ... rest of your BlogDetails code as you wrote it ...

};

export default BlogDetails;
