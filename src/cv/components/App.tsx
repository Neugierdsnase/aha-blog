import { useState } from 'react';
import type { LanguageType, TagType } from '../types';
import data, { getTranslation } from '../data';
import { ALL_TAGS } from '../constants';
import { Header } from './Header';
import { CvItemCard } from './Card';
import { Cake, MapPin, Mail, Phone, Globe, UserRound } from 'lucide-react';

export const App = () => {
  const [activeFilters, setActiveFilters] = useState<TagType[]>([
    'frontend',
    'backend',
    'devops/sre',
    'tech-health',
    'consulting',
  ]);

  const [activeLanguage, setActiveLanguage] = useState<LanguageType>('en');

  const filteredJobItems = data.cvJobItems.items.filter((item) =>
    item.tags?.some((tag) => activeFilters.includes(tag)),
  );
  const filteredEduItems = data.cvEduItems.items.filter((item) =>
    item.tags?.some((tag) => activeFilters.includes(tag)),
  );

  return (
    <div className='body mx-auto grid grid-cols-12 gap-4 w-11/12 md:w-5/6 **:print:bg-white **:print:text-black'>
      <div className='col-span-full sticky top-4 z-1 mb-8 print:hidden'>
        <Header
          filterOptions={ALL_TAGS}
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
          setActiveLanguage={setActiveLanguage}
        />
      </div>

      <aside className="col-span-full lg:col-span-4 card h-fit scrollfade">
        <header className="gap-2 scrollfade">
          <h1 className="mt-3xl text-3xl tracked-heading">Konstantin Kovar</h1>
          <p className="font-serif text-2xl tracked-tagline hidden lg:block">Curriculum Vitae</p>
        </header>
        <section className='flex flex-col gap-4 relative'>
          <hr />
          <ul className="flex flex-col gap-2 top-34 print:text-sm">
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
        <article className="card scrollfade">
          <header>
            <h2 dangerouslySetInnerHTML={{ __html: getTranslation(activeLanguage, { en: 'At a Glance', de: 'Auf einen Blick' }) }} />
            </header>
          <section dangerouslySetInnerHTML={{ __html: getTranslation(activeLanguage, data.overviewText) }} /> </article>
        <article className="card scrollfade lg:col-start-5 lg:col-span-8">
          <header>
            <h2 dangerouslySetInnerHTML={{ __html: getTranslation(activeLanguage, { en: 'About Me', de: 'Über mich' }) }} />
            </header>
          <section dangerouslySetInnerHTML={{ __html: getTranslation(activeLanguage, data.introText) }} />
        </article>
      </div>
      <hr className='col-span-full' />
      <main className="gap-4 grid flex-col col-span-full lg:grid-cols-2 lg:[&>.card]:even:translate-y-14">
        {filteredJobItems.map((item) => (
          <CvItemCard
            key={item.label.en + item.time?.from}
            activeLanguage={activeLanguage}
            item={item}
          />
        ))}
        {filteredEduItems.map((item) => (
          <CvItemCard
            key={item.label.en + item.time?.from}
            activeLanguage={activeLanguage}
            item={item}
          />
        ))}
      </main>
    </div>
  );
};
