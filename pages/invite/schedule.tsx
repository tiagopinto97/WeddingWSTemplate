import React, { useEffect, useState } from 'react'
import { inviteValidation } from '../../components/basePage';
import { useRouter } from 'next/router';
import { weddingGetStaticProps } from '../../helpers/languageGSP';
import BasePlacePage from '../../components/basePlacePage';
import { Button, Timeline } from 'flowbite-react';
import { useTranslation } from 'next-i18next';

export async function getStaticProps({ locale }) { return await weddingGetStaticProps(locale) }

export default function Schedule() {
  const [inviteData, setInviteData] = useState<any>({});
  const [weddingData, setWeddingData] = useState<any>(null);
  const router = useRouter();
  const { i18n, t } = useTranslation();

  useEffect(() => {
    inviteValidation(setInviteData, setWeddingData, router);
  }, [router])


  return (
    <BasePlacePage
      bgImageSrc="/PIXNIO-2603549-1920x1280.jpg"
      bgImageOpacity={0.7}
      mainContainerClasses="flex flex-col pt-4 items-center gap-4"
      name={t('schedule.title')}
    >
      {weddingData?.schedule[i18n.language] &&
        <Timeline>
          {weddingData?.schedule[i18n.language].map((schedule_item: any, index: number) => {
            return <TimelineItem
              key={'event_' + index}
              time={schedule_item.time}
              title={schedule_item.title}
              description={schedule_item.description} />
          })}
        </Timeline>
      }
    </BasePlacePage>
  )
}



const TimelineItem = ({ time, title, description, actionLabel, actionClick }: any) => {
  return <Timeline.Item >
    <Timeline.Point />
    <Timeline.Content>
      {time && <Timeline.Time className="text-white"><b>{time}</b></Timeline.Time>}
      {title && <Timeline.Title className="text-white">{title}</Timeline.Title>}
      {description && <Timeline.Body className="text-white">{description}</Timeline.Body>}
      {actionLabel && actionClick && <Button color="gray" onClick={actionClick}>{actionLabel}</Button>}
    </Timeline.Content>
  </Timeline.Item>
}