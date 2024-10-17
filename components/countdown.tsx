import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react"


const MS_IN_A_SECOND = 1000;
const MS_IN_A_MINUTE = MS_IN_A_SECOND * 60;
const MS_IN_A_HOUR = MS_IN_A_MINUTE * 60;
const MS_IN_A_DAY = MS_IN_A_HOUR * 24;

const updateCountdownData = (differrence: number, setCountdownData: Function) => {
    //Update countdown vars
    const days = Math.floor(differrence / (MS_IN_A_DAY));
    const hours = Math.floor((differrence % (MS_IN_A_DAY)) / (MS_IN_A_HOUR));
    const minutes = Math.floor((differrence % (MS_IN_A_HOUR)) / (MS_IN_A_MINUTE));
    const seconds = Math.floor((differrence % (MS_IN_A_MINUTE)) / MS_IN_A_SECOND);
    setCountdownData({ days, hours, minutes, seconds })
}


export const Countdown = (props: any) => {
    //TODO Use a real date
    const [countdownData, setCountdownData] = useState<any>(null)
    const { t } = useTranslation();

    useEffect(() => {
        if (props.date) {

            const now = new Date().getTime();
            let differrence = props.date.getTime() - now;
            updateCountdownData(differrence, setCountdownData)

            setInterval(() => {
                differrence = differrence - 1000;
                updateCountdownData(differrence, setCountdownData)
            }, 1000)
        }

    }, [props.date])


    return <div className="flex flex-row flex-wrap gap-5 justify-center text-center ">
        {countdownData && <>
            <CountdownCard value={countdownData.days ?? 0} label={t("countdown.days", {count: countdownData.days ?? 0})} />
            <CountdownCard value={countdownData.hours ?? 0} label={t("countdown.hours", {count: countdownData.hours ?? 0})} />
            <CountdownCard value={countdownData.minutes ?? 0} label={t("countdown.minutes", {count: countdownData.minutes ?? 0})} />
            <CountdownCard value={countdownData.seconds ?? 0} label={t("countdown.seconds", {count: countdownData.seconds ?? 0})} />
        </>
        }
    </div>
}

const CountdownCard = ({ value, label }: any) => {

    return <div className="flex flex-col p-2 bg-neutral-500/50 rounded-lg text-neutral-content min-w-24">
        <span className="countdown font-mono text-5xl">
            <span >{value}</span>
        </span>
        {label}
    </div>
}