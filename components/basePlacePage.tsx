import React from 'react'
import { GoBackButton } from './goBack';
import BasePage from './basePage';


export default function BasePlacePage({
  bgImageOpacity,
  bgImageSrc,
  mainContainerClasses,
  name,
  mapUrl,
  children
}: any) {

  return (
    <BasePage
      bgImageSrc={bgImageSrc}
      bgImageOpacity={bgImageOpacity}
      mainContainerClasses={mainContainerClasses}
    >
      {name &&
        <div className='my-10 flex flex-col gap-4 w-full items-center justify-between'>
          <div className='flex flex-col items-center'>
            <GoBackButton />
            <span className='text-6xl font-bold font-serif'>{name}</span>
          </div>
          {mapUrl && <div className='flex flex-1 mx-5 ' style={{
            width: 750,
            maxHeight: 500,
            maxWidth: '90%'
          }}>

            <iframe
              src={mapUrl}
              style={{ border: 0, width: 800 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"></iframe>

          </div>}
          {children}
        </div>}
    </BasePage >
  )
}

