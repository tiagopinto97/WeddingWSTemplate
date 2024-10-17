import React, { useEffect, useMemo, useState } from 'react'
import BasePage, { inviteValidation } from '../../components/basePage';
import { useRouter } from 'next/router';
import { i18n, useTranslation } from 'next-i18next';
import { weddingGetStaticProps } from '../../helpers/languageGSP';
import { Countdown } from '../../components/countdown';
import Image from 'next/image';
import cake from "../../public/stairs-cake.svg"
import church from "../../public/church-fill.svg"


export async function getStaticProps({ locale }) { return await weddingGetStaticProps(locale) }


const makeGuestsTitle = (t: Function, guests: string[]) => {
  let guestStr = '';
  for (let i = 0; i < guests.length; i++) {
    if (i === 0) {
      guestStr = guests[i]
    } else {
      guestStr += i + 1 === guests.length ? ` ${t('_and_')} ${guests[i]}` : `, ${guests[i]}`  
    }
  }
  return guestStr
}

export default function InviteHP() {
  const [inviteData, setInviteData] = useState<any>({});
  const [weddingData, setWeddingData] = useState<any>(null);
  const { t } = useTranslation();
  const router = useRouter();

  const countdown = useMemo(() => <Countdown date={weddingData?.date} />, [weddingData?.date])

  useEffect(() => {
    inviteValidation(setInviteData, setWeddingData, router);
  }, [router])

  return (
    <BasePage
      bgImageSrc="/PIXNIO-2603549-1920x1280.jpg"
      bgImageOpacity={0.7}
      mainContainerClasses="flex flex-col pt-4 items-center"
    >
      {weddingData &&
        <div className='flex flex-col items-center m-auto text-center w-full p-2 mx-3 my-10 cursor-default'>
          <span className='font-bold text-5xl'>{makeGuestsTitle(t, inviteData.guests)}</span>
          <span className=' text-2xl'>{t(`honored_to_invite`, { context: inviteData.is_male ? 'male' : 'female', count: inviteData.guests.length })}</span>
          <div className='flex flex-col text-xl font-serif mt-14 mb-16 '>
            {weddingData.headline.line_1[i18n.language] && <span>{weddingData.headline.line_1[i18n.language]}</span>}
            {weddingData.headline.line_2[i18n.language] && <span>{weddingData.headline.line_2[i18n.language]}</span>}
          </div>
          <span className='text-7xl mb-10 font-serif'>
            {weddingData.title}
          </span>
          <div className='flex flex-col gap-4 items-center my-5 w-full'>
            {countdown}
            <span className='text-4xl'>
              {makeWeddingDateTimeLine(weddingData.date)}
            </span>
          </div>
          <div className='flex flex-col sm:flex-row gap-10 p-4'>
            {weddingData.chapelry && <SectionCard router={router} href="/invite/chapelry" logo={church} label={weddingData.chapelry.name} alt="chapelry" />}
            {weddingData.reception && <SectionCard router={router} href="/invite/reception" logo={cake} label={weddingData.reception.name} alt="reception" />}
          </div>
          {/**Presence Matters */}
          <span className='text-2xl mt-10'>{`${t('your_presence_is_important', { count: inviteData.guests.length })}`}</span>
          <span className='text-xl '>{t('rsvp_by')} <b>{`${String(weddingData.guest_confirmation_date.getDate()).padStart(2, '0')}-${String(weddingData.guest_confirmation_date.getMonth() + 1).padStart(2, '0')}-${weddingData.guest_confirmation_date.getFullYear()}`}</b></span>
        </div>
      }
    </BasePage >
  )
}


const makeWeddingDateTimeLine = (date: Date) => {
  return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()} | ${date.getHours()}h ${date.getMinutes() > 0 ? date.getMinutes()  : ''}`
}

const SectionCard = ({ logo, label, alt, router, href }) => {
  return <div className='flex flex-col items-center cursor-pointer' onClick={() => {
    router.push(href)
  }}>
    <Image width={50} height={50} src={logo} alt={alt} />
    <span className='font-bold dark:text-white'>{label}</span>
  </div>
}