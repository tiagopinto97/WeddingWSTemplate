import Head from 'next/head'
import React from 'react'
import { Header } from './header'
import { loadInvite, loadWedding } from '../helpers/localStorage'
import { WeddingFooter } from './footer'
import { track } from '@vercel/analytics'


export const inviteValidation = (setInviteData, setWeddingData, router) => {
    const invite = loadInvite();
    const weddingData = loadWedding();
    if (invite && weddingData) {
        track('Invite Validation', {}, { flags: ['code-' + invite.code]})
        setInviteData(invite)
        setWeddingData({
            ...weddingData,
            date: new Date(weddingData.date),
            guest_confirmation_date: new Date(weddingData.guest_confirmation_date),
        })
    } else {
        router.push('/')
    }
}

const BasePage = (props: any) => {

    return (
        <div className={`flex flex-col bg-white dark:bg-black min-h-screen  min-w-screen`}
            style={props.bgImageSrc ? {
                backgroundImage: `url("${props.bgImageSrc}")`,
                backgroundPosition: 'center',        // Center the background image
                backgroundSize: 'cover',             // Cover the entire container (with aspect ratio)
                backgroundRepeat: 'no-repeat',       // Prevent the image from repeating
            } : {}}
        >
            <Head>
                <title>John & Doe</title>
                <link rel="icon" href="/vercel.svg" />
            </Head>

            <Header />
            {props.bgImageOpacity &&
                <div style={{
                    backgroundColor: 'black',
                    opacity: 1 - props.bgImageOpacity,
                    position: 'fixed',
                    top: 0,
                    minWidth: '100vw',
                    minHeight: '100vh',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden'
                }} />
            }
            <main className={`flex-1 w-full h-full flex text-white text-center ${props.mainContainerClasses}`} style={{ zIndex: 1 }}>
                {props.children}
            </main>
            <WeddingFooter />
        </div>
    )
}

export default BasePage;