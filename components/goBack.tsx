import { useTranslation } from "next-i18next";
import chevron from "../public/8665194_chevron_left_icon.svg"
import Image from "next/image";
import { useRouter } from "next/router";
export const GoBackButton = (props: any) => {
    const { t } = useTranslation();
    const router = useRouter();

    //8665194_chevron_left_icon.svg
    return <div className='flex flex-row gap-1 items-center cursor-pointer mb-3' onClick={() => {
        router.push('/invite')
    }}>
        <Image width={10} height={10} src={chevron} alt={'chevron'} />
        <span className='text-lg font-bold dark:text-white'>{t('go_back')}</span>
    </div>
}