import React, { useEffect, useRef, useState } from 'react'

import BasePage from '../components/basePage'
import { Button, Modal, TextInput } from 'flowbite-react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { loadInvite, loadWedding, setInvite, setWeddingData } from '../helpers/localStorage';
import { weddingGetStaticProps } from '../helpers/languageGSP'

export async function getStaticProps({ locale }) { return await weddingGetStaticProps(locale) }


export default function Home() {

  return (
    <BasePage
      bgImageSrc='/PIXNIO-2515712-1920x1280.jpg'
      mainContainerClasses=' flex-col justify-center items-center'
    >
      <CodeInputModal />
    </BasePage>
  )
}


const CodeInputModal = (props: any) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(true);
  const inviteCodeRef = useRef<HTMLInputElement>(null);
  const [insertedCode, setInsertedCode] = useState('');
  const [weddingD, setWeddingD] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const invite = loadInvite();
    const weddingData = loadWedding();
    if (invite && weddingData) {
      router.push('/invite')
    } else if (weddingData) {
      setWeddingD({
        ...weddingData,
        date: new Date(weddingData.date),
        guest_confirmation_date: new Date(weddingData.guest_confirmation_date),
      })
    } else {
      fetch(`/api/getWeddingData`).then(async (response: any) => {
        const data = await response.json()
        if (response.ok) {
          setWeddingD(data);
          setWeddingData(data);
        }
      })
    }
  }, []);


  return <>

    <Button size="xl" onClick={() => setOpenModal(true)}><span className='text-2xl'>{t('open_invite')}</span></Button>

    <Modal show={openModal} size="md" popup initialFocus={inviteCodeRef} onClose={() => setOpenModal(false)}>
      <Modal.Header className='px-6 pt-6' >{t('insert_invite_code')}</Modal.Header>
      <Modal.Body>
        <form className="space-y-3" onSubmit={(e) => {
          e.preventDefault();

          //Validate Code
          fetch(`/api/getInvite?code=${insertedCode}`).then(async (response: any) => {
            const data = await response.json()
            if (!response.ok) {
              // Throw error
              window.alert(t('invalid_invite_code_message'))
            } else {
              setInvite(data);
              router.push('/invite');
            }
          })
        }}>
          <div>
            <TextInput id="inviteCode" type='number' ref={inviteCodeRef} placeholder={"EX: 123456"} onChange={(ev) => setInsertedCode(ev.target.value)} required />
          </div>

          <div className="w-full">
            <Button
              type='submit'
            >{t('load_invite')}</Button>
          </div>

        </form>
      </Modal.Body>
    </Modal>
  </>

}