

import React, { useEffect, useState } from "react";
import { Navbar, DarkThemeToggle, NavbarCollapse, NavbarToggle } from "flowbite-react";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "next-i18next";
import { setInvite } from "../helpers/localStorage";
import { useRouter } from "next/router";


const links = [
  { href: '/invite', label: 'home' },
  // { href: '/invite/bride', label: 'bride' },
  // { href: '/invite/groom', label: 'groom' },
  { href: '/invite/chapelry', label: 'chapelry' },
  { href: '/invite/reception', label: 'reception' },
  { href: '/invite/schedule', label: 'schedule' },
  {
    href: '/', label: 'change_invite', onClick: () => {
      setInvite(null);
    }
  },
]

export const Header = (props: any) => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => setDomLoaded(true), [])

  return (
    <Navbar fluid style={{ zIndex: 10, position: 'relative' }}>
      <Navbar.Brand onClick={() => router.push('/invite')} className="cursor-pointer">
        {/*<img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />*/}
        <span className="self-center whitespace-nowrap text-xl  text-black dark:text-white font-serif">John & Doe</span>
      </Navbar.Brand>
      <div className=" flex md:hidden md:order-2">
        <NavbarToggle />
      </div>
      {domLoaded &&
        <NavbarCollapse >
          <div className="md:flex justify-center items-center content-center gap-4">
            {links.map((link) => {
              return <Navbar.Link
                className="cursor-pointer bg-transparent text-black dark:text-white"
                key={`navbar_${link.label}`}
                onClick={() => {
                  if (link.onClick) {
                    link.onClick()
                  }
                  router.push(link.href)
                }}
                active>
                {t(`header.${link.label}`)}
              </Navbar.Link>
            })}
            <DarkThemeToggle />
            <LanguageSelector />
          </div>
        </NavbarCollapse>
      }
    </Navbar>
  );
}


const LanguageSelector = (props: any) => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const router = useRouter();
  const langs = [
    { lang: 'en', flag: 'GB' },
    { lang: 'pt', flag: 'PT' },
  ];

  useEffect(() => {
    setCurrentLang(i18n.language)
  }, [i18n.language])


  return <>
    {langs.map((lang: any) => {
      return <>
        {currentLang !== lang.lang &&
          <ReactCountryFlag key={`change_lang_${lang.lang}`} countryCode={lang.flag} svg
          className="mb-3 md:mb-0"
          style={{
              width: '1.5em',
              height: '1.5em',
            }}
            onClick={() => {
              router.push(`${window.location.pathname.split(i18n.language)[1]}`, undefined, { locale: lang.lang })
              i18n.changeLanguage(lang.lang)
            }}
          />
        }</>
    })}
  </>
}