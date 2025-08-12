"use client"

import { Suspense } from "react";
import { useState } from "react";
import Link from 'next/link';
import React from 'react'

const page = () => {
  return (
    <section className="px-6 py-16 text-center grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto mt-50 ">
      <div className="mt-20 text-black">
        <img src="british.png" alt="" />
        <Link href="https://cyclopedia-media-hub.vercel.app/blog/DxewHf37R7X7ZBzQRLE5">
          <h2 className="text-xl font-bold text-left hover:underline text-black">
            Britain’s secret state and the need for whistle-blowing
          </h2>
        </Link>
        <p className="text-sm text-gray-500 text-left mt-5">
          In November 2003, I was charged with a breach of the Official Secrets
          Act in the UK. My ‘crime’ had been to reveal an email from the US
          National Security Agency (NSA) to Britain's intelligence agency, the
          Government Communications Headquarters (GCHQ) where I was working at
          the time.
        </p>
      </div>

      <div>
        <img src="uk.png" alt="" />
        <Link href="https://cyclopedia-media-hub.vercel.app/blog/HYhefDd7rXfAAzKBJCyb">
          <h2 className="text-xl font-bold text-left hover:underline text-black">
            UK government secretly paid foreign YouTube stars for ‘propaganda’{" "}
          </h2>
        </Link>
        <p className="text-sm text-gray-500 text-left mt-5 ">
          The past five months have been clarifying. What was supposed to be
          hidden has been thrust into the light. What was supposed to be
          obscured has come sharply into focus.
        </p>
      </div>

      <div>
        <img src="som.png" alt="" className="mt-10" />
        <Link href="/">
        <h2 className="text-xl font-bold text-black text-left hover:underline">
          How the Western media helped build the case for genocide in Gaza
        </h2>
        </Link>
        <p className="text-sm text-gray-500 text-left mt-5 ">
          The past five months have been clarifying. What was supposed to be
          hidden has been thrust into the light. What was supposed to be
          obscured has come sharply into focus.
        </p>
      </div>
    </section>
  );
}

export default page

