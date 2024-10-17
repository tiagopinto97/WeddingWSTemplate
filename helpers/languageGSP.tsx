import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function weddingGetStaticProps( locale ) {
    return {props: {...(await serverSideTranslations(locale, ['common'], null, ['en', 'pt']))}}
}