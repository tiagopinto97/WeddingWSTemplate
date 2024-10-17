import React, { useEffect, useState } from 'react'
import { inviteValidation } from '../../components/basePage';
import { useRouter } from 'next/router';
import { weddingGetStaticProps } from '../../helpers/languageGSP';
import BasePlacePage from '../../components/basePlacePage';

export async function getStaticProps({ locale }) { return await weddingGetStaticProps(locale) }

export default function Reception() {
  const [inviteData, setInviteData] = useState<any>({});
  const [weddingData, setWeddingData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    inviteValidation(setInviteData, setWeddingData, router);
  }, [router])


  return (
    <BasePlacePage
      bgImageSrc="/PIXNIO-3107086-1920x1280.jpg"
      bgImageOpacity={0.9}
      mainContainerClasses=""
      name={weddingData?.reception?.name}
      mapUrl={weddingData?.reception?.embedUrl}
    />
  )
}
