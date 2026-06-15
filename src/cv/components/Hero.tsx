import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Cake, MapPin, Mail, Phone, Globe, UserRound } from "lucide-react"
import type { FunctionComponent } from "react"
import data, { getTranslation } from "../data"
import type { LanguageType } from "../types"

import MagicBento from '../../../components/MagicBento'

type HeroProps = {
  activeLanguage: LanguageType
}

export const Hero: FunctionComponent<HeroProps> = ({ activeLanguage }) => {
  return <>
    <div className="col-span-full">
    <MagicBento
      textAutoHide={true}
      enableStars
      enableSpotlight
      enableBorderGlow={true}
      enableTilt={false}
      enableMagnetism={false}
      clickEffect
      spotlightRadius={200}
      particleCount={0}
      glowColor="255, 173, 188"
      disableAnimations={false}
    />
  </div>

    <aside className="col-span-full lg:col-span-4 card h-fit scrollfade">
      <header className="gap-2 scrollfade">
        <h1 className="mt-3xl text-3xl tracked-heading">Konstantin Kovar</h1>
        <p className="font-serif text-2xl tracked-tagline hidden lg:block">Curriculum Vitae</p>
      </header>
      <section className='flex flex-col gap-4 relative'>
        <hr />
        <ul className="flex flex-col gap-2 top-34 print:text-sm [&_a]:underline [&_a]:underline-offset-3">
          <li>
            <Cake size={14} className="mr-2 inline-block" />
            <span>16.05.1990</span>
          </li>
          <li>
            <MapPin size={14} className="mr-2 inline-block" />
            <span dangerouslySetInnerHTML={{ __html: { en: 'Vienna, Austria', de: '1180 Wien' }[activeLanguage] }} />
          </li>
          <li>
            <Mail size={14} className="mr-2 inline-block" />
            <a href="mailto:mail@vomkonstant.in">mail@vomkonstant.in</a>
          </li>
          <li>
            <Phone size={14} className="mr-2 inline-block" />
            <a href="+436502701444">+43 (0) 650 27 01 444</a>
          </li>
          <li>
            <Globe size={14} className="mr-2 inline-block" />
            <a
              href="https://blog.vomkonstant.in"
              target="_blank"
              rel="noreferrer noopener"
            >
              blog.vomkonstant.in
            </a>
          </li>
          <li>
            <UserRound size={14} className="mr-2 inline-block" />
            <a
              href="https://www.linkedin.com/in/konstantin-kovar-5301494b/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <span dangerouslySetInnerHTML={{ __html: { en: 'LinkedIn Profile', de: 'LinkedIn-Profil' }[activeLanguage] }} />
            </a>
          </li>
        </ul>
      </section>
    </aside>

    <div className='col-span-full lg:col-start-5 lg:col-span-8 flex flex-col gap-4'>
      <Card className="card scrollfade">
        <CardHeader>
          <CardTitle className='font-soria' dangerouslySetInnerHTML={{ __html: getTranslation(activeLanguage, { en: 'At a Glance', de: 'Auf einen Blick' }) }} />
        </CardHeader>
        <CardContent dangerouslySetInnerHTML={{ __html: getTranslation(activeLanguage, data.overviewText) }} /> </Card>
      <Card className="card scrollfade lg:col-start-5 lg:col-span-8">
        <CardHeader>
          <CardTitle className='font-soria' dangerouslySetInnerHTML={{ __html: getTranslation(activeLanguage, { en: 'About Me', de: 'Über mich' }) }} />
        </CardHeader>
        <CardContent dangerouslySetInnerHTML={{ __html: getTranslation(activeLanguage, data.introText) }} />
      </Card>
    </div>
  </>
}
