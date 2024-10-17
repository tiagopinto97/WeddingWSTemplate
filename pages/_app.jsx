import '../styles/globals.css'
import { appWithTranslation } from 'next-i18next'
import {  Flowbite } from "flowbite-react";
import React from 'react';
import nextI18NextConfig from '../next-i18next.config.js'
import { Insights } from '../helpers/insights';
import { Analytics } from "@vercel/analytics/react"

function WeddingInvitation({ Component, pageProps }) {
  return <Flowbite>

    <Component {...pageProps} />
    <Insights />
    <Analytics />
  </Flowbite>
  
}


export default appWithTranslation(WeddingInvitation, nextI18NextConfig)
