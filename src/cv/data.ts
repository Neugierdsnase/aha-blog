import dayjs from 'dayjs';
import type { CvSectionType, IntlContentType, LanguageType } from './types';
import { DATE_FORMAT } from './constants';
import remarkParse from 'remark-parse';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';
import remarkRehype from 'remark-rehype';
import remarkGfm from 'remark-gfm';


export const getTranslation = (language: LanguageType, translation?: IntlContentType<string>) => {
  if (!translation) { return '' }

  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)

  const hyperText = String(processor.processSync(translation[language]))
  return hyperText
}

const introText: IntlContentType<string> = {
  de: `~Leidenschaftlicher Frontend Engineer mit dem Ziel, die digitale Landschaft Komponente für Komponente zu revolutionieren. Mit unermüdlichem Einsatz für Innovation, Skalierbarkeit und nutzerzentrierte Exzellenz spezialisiere ich mich darauf, komplexe Geschäftsanforderungen in erstklassige, hochmoderne Web-Erlebnisse zu verwandeln, die...~ Okay, stimmt alles, aber die kurze und knackige Wahrheit ist, dass ich es einfach liebe zu programmieren. Ich bin nach all den Jahren immer noch fasziniert, dass es überhaupt funktioniert und für mich ist das alles einfach nur Magie. Dass ich durch Worte, die ich tippe kleine Mini-Blitze kontrolliere, die Nachrichten rund um die Welt (oder in meinem Fall derzeit eher von Wien nach Dornbirn) tragen, halte ich nach wie vor für ein Wunder.`,
  en: `~Passionate frontend engineer dedicated to revolutionizing the digital landscape one component at a time. With a relentless commitment to innovation, scalability, and user-centric excellence, I specialize in transforming complex business requirements into world-class, cutting-edge web experiences that...~ I mean, yeah, that is all true, but simple truth is that I just like building software. I'm baffled by the fact that it works at all and even after all these years I regard it as a manifestation of magic. That me typing words harnesses little lightning bolts carrying messages to the other side of the world (or in my current case, from Vienna to Dornbirn) is an ongoing miracle to me. In fact, I like building software so much, if I didn't get paid to do it, I would probably still do it all day every day.`,
};

const overviewText: IntlContentType<string> = {
  en: `
  - Used a ton of  React and its (web) ecosystem.  Wrote the Tailwind CSS 󱏿 component library for willhaben and maintained the styled-components based library. Migrated legacy  styles to Tailwind.
  - Familiar with GitLab 󰮠 GitHub  the Atlassian suite  and agile Workflows
  - Worked with the common testing tools and libraries like Playwright  Selenium/Selenide  Cypress  Vitest  
  - Fully integrated Coding Agents (Claude Code) into my workflow.
`,
  de: `
  - Habe viel mit React und seinem (Web-)Ökosystem gearbeitet. Habe die Tailwind-CSS-Komponentenbibliothek für willhaben geschrieben und die auf styled-components basierende Bibliothek gepflegt. Habe Legacy-Styles auf Tailwind migriert.
  - Vertraut mit GitLab, GitHub, der Atlassian-Suite und agilen Workflows.
  - Habe mit den gängigen Testing-Tools und -Bibliotheken wie Playwright, Selenium/Selenide, Cypress und Vitest gearbeitet.
  - Coding-Agents (Claude Code) vollständig in meinen Workflow integriert.`
}

const cvJobItems: CvSectionType = {
  heading: { de: 'Berufserfahrung', en: 'Work Experience' },
  items: [
    {
      label: { en: 'willhaben', de: 'willhaben' },
      time: {
        from: dayjs('02/24', DATE_FORMAT),
      },
      list: [
        {
          label: {
            de: 'diesmal als tatsächlicher Angestellter',
            en: 'this time as an actual employee',
          },
        },
        {
          label: {
            de: 'Erfahrung in einem dritten Team',
            en: 'experience in a third tribe',
          },
        },
        {
          label: {
            en: '**huge** migration of the chat components from external services to internal facsimiles',
            de: 'riesige Migration der Komponenten, die den Chat ausmachen von externen Services zu internen Facsimiles',
          },
        }, {
          label: {
            en: 'participated in the dawn of agentic software development in a company that nurtured this transition into a new age',
            de: 'Teilnahme am Beginn der "agentic" Softwareentwickling in einer Organisation, die Wert darauf legt, gut in dieses neue Zeitalter hineinzuwachsen',
          },
        }
      ],
      tags: ['frontend', 'backend', 'tech-health'],
    },
    {
      label: { en: 'Indie Hacking', de: 'Indie Hacking' },
      time: { from: dayjs('08/23', DATE_FORMAT) },
      list: [
        {
          label: {
            en: '<a href=\'https://prompt-dress.com\'>Prompt Dress: </a> A browser extension to keep and organise AI prompts. _deprecated_',
            de: '<a href=\'https://prompt-dress.com>Prompt Dress: </a> Eine Browsererweiterung, um AI-Prompts zu speichern und zu organisieren. _deprecated_',
          },
        },
        {
          label: {
            en: '<a href=\'https://amazing-gpt.com\'>Amazing GPT: </a> A curated list of custom GPTs. _deprecated_',
            de: '<a href=\'https://amazing-gpt.com\'>Amazing GPT: </a> Eine kuratierte Liste von "custom GPTs." _deprecated_',
          },
        },
        { label: {
            en: '<a href=\'https://marketplace.visualstudio.com/items?itemName=KonstantinKovar.classnames-rainbow\'>ClassNames Rainbow: </a> A VSCode extension for easier visual css class parsing. _deprecated_',
            de: '<a href=\'https://marketplace.visualstudio.com/items?itemName=KonstantinKovar.classnames-rainbow\'>ClassNames Rainbow: </a> Eine VSCode extension zum leichteren Lesen von Klassennamen _deprecated_',
          }}
      ],
      tags: ['frontend', 'backend', 'devops/sre'],
    },
    {
      label: { en: 'Seatti', de: 'Seatti' },
      time: {
        from: dayjs('07/22', DATE_FORMAT),
        to: dayjs('08/23', DATE_FORMAT),
      },
      list: [
        {
          label: {
            en: 'part of a very early stage startup',
            de: 'Teil eines Startups im sehr früher Stadium',
          },
        },
        {
          label: {
            en: 'involved in underlying architectural and technical decisions and evaluations',
            de: 'involviert in der Entscheidungsfindung bei grundlegenden technischen Entscheidungen und Evaluierungen',
          },
        },
        {
          label: {
            en: 'integral part of facing challenges of scaling tech, product and team',
            de: 'direkt in der Arbeit an den Herausforderungen eines wachsenden Produkts, Infrastruktur und Teams beteiligt',
          },
        },
        {
          label: {
            en: 'deep insights into other areas of developing a VC-funded startup (Marketing, Sales, Finance, Investor relations)',
            de: 'tiefe Einblicke in die anderen Bereiche eines VC-finanzierten Startups (Marketing, Sales, Finance, Investor Relations)',
          },
        },
      ],
      tags: ['frontend', 'backend', 'tech-health'],
    },
    {
      label: { en: 'willhaben', de: 'willhaben' },
      time: {
        from: dayjs('05/21', DATE_FORMAT),
        to: dayjs('04/22', DATE_FORMAT),
      },
      list: [
        {
          label: {
            de: 'formal als externer Entwickler, aber zu 100% in das Unternehmen eingegliedert',
            en: 'formally an external Developer, but 100% integrated within the company',
          },
        },
        {
          label: {
            en: 'most visited Austrian website',
            de: 'meistbesuchte österreichische Website',
          },
        },
        {
          label: {
            en: 'gathered experience in two different tribes for multiple months each',
            de: 'mehrmonatige Erfahrungen in zwei unterschiedlichen Tribes gesammelt',
          },
        },
        {
          label: {
            en: 'knowledge both deepened and broadened, developed T-shaped expertise',
            de: 'Wissen vertieft, aber auch verbreitert, teaminterne T-shaped Expertise',
          },
        },
        {
          label: {
            en: 'complete agile workflow',
            de: 'kompletter agiler Workflow',
          },
        },
        {
          label: {
            en: 'various internal interdisciplinairy training',
            de: 'diverse interne disziplinübergreifende Weiterbilungen',
          },
        },
        {
          label: {
            en: 'lived "technical excellence"',
            de: 'gelebte "technical Excellence"',
          },
        },
      ],
      tags: ['frontend', 'backend', 'tech-health', 'other'],
    },
    {
      label: {
        en: 'Coding School & Academy Wörthersee',
        de: 'Coding School & Academy Wörthersee',
      },
      time: {
        from: dayjs('05/21', DATE_FORMAT),
        to: dayjs('06/22', DATE_FORMAT),
      },
      list: [
        {
          label: {
            en: 'written, prepared and held web development crash course for part time students twice',
            de: 'zweimal den berufbegleitenden Crashkurs Webdevelopment vorbereitet und unterrichtet',
          },
        },
        {
          label: {
            en: 'written, prepared and held HTML & CSS Course for full-time students twice',
            de: 'zweimal den HTML & CSS Basics Kurs für den Vollzeitstudiengang unterrichtet',
          },
        },
        {
          label: {
            en: 'examination of various (final) projects ',
            de: 'diverse Projekt- und Abschlussarbeiten benotet',
          },
        },
        {
          label: {
            en: 'Examiner for the final exams',
            de: 'Abschlussprüfungen als Prüfer abgenommen',
          },
        },
      ],
      tags: ['frontend', 'consulting', 'other'],
    },
    {
      label: { en: 'Web&Söhne', de: 'Web&Söhne' },
      time: {
        from: dayjs('01/20', DATE_FORMAT),
        to: dayjs('04/22', DATE_FORMAT),
      },
      list: [
        {
          label: {
            en: 'Green field project with UNIQA initialized and started',
            de: 'Greenfield-Project mit UNIQA aufgesetzt und begonnen',
          },
        },
        {
          label: {
            en: 'development of internal tooling',
            de: 'Entwickeln interner Tools',
          },
        },
        {
          label: {
            en: 'various small projects with existing customers, often with legacy code',
            de: 'diverse kleine Projekte mit Bestandskunden, oft mit Legacy-Code',
          },
        },
      ],
      tags: ['frontend', 'backend', 'tech-health', 'other'],
    },
    {
      label: {
        en: 'Projects & Freelancing',
        de: 'Projektarbeiten & Freelancing',
      },
      time: { from: dayjs('11/18', DATE_FORMAT) },
      list: [
        {
          label: {
            en: 'own <a href="https://marketplace.visualstudio.com/items?itemName=KonstantinKovar.classnames-rainbow" target="_blank">VSCode-Extension</a> for atomic-css users (now deprecated)',
            de: 'eigene <a href="https://marketplace.visualstudio.com/items?itemName=KonstantinKovar.classnames-rainbow" target="_blank">VSCode-Extension</a> für atomic-css User (deprecated)',
          },
        },
        {
          label: {
            en: 'for <a href="https://adapowerwoman.at/">Ada - Power Woman</a> (Technical Consulting)',
            de: 'für <a href="https://adapowerwoman.at/">Ada - Power Woman</a> (Technical Consulting)',
          },
        },
        {
          label: {
            en: 'for <a href="https://sgreening.io/">sgreening</a> (Webdevelopment & Consulting)',
            de: 'für <a href="https://sgreening.io/">sgreening</a> (Webdevelopment & Consulting)',
          },
        },
        {
          label: {
            en: 'Porsche Wien Mitte (WordPress-Development & Consulting)',
            de: 'Porsche Wien Mitte (WordPress-Entwicklung & Consulting)',
          },
        },
      ],
      tags: ['frontend', 'consulting', 'tech-health', 'other'],
    },
    {
      label: { en: 'der brutkasten', de: 'der brutkasten' },
      tagLine: {
        de: 'WordPress & Frontend Entwickler',
        en: 'WordPress & Frontend Developer',
      },
      time: {
        from: dayjs('04/18', DATE_FORMAT),
        to: dayjs('11/18', DATE_FORMAT),
      },
      list: [
        {
          label: {
            en: 'WordPress Theme programming with very old legacy code',
            de: 'WordPress Theme-Programmierung mit sehr altem Legacy Code',
          },
        },
        {
          label: {
            en: 'Production of an internal CRM',
            de: 'Erstellung eines internen CRM',
          },
        },
        {
          label: {
            en: 'Content und business strategy from a technical perspective',
            de: 'Content- und Businessstrategie aus technischer Perspektive',
          },
        },
      ],
      tags: ['frontend', 'devops/sre'],
    },
    {
      label: { en: 'Projects', de: 'Projektarbeiten' },
      time: {
        from: dayjs('01/08', DATE_FORMAT),
        to: dayjs('12/18', DATE_FORMAT),
      },
      list: [
        {
          label: {
            en: 'Logo- and corporate design for <a href="https://sgreening.io/">sgreening</a> (meanwhile rebranded)',
            de: 'Logo- und Corporatedesign für <a href="https://sgreening.io/">sgreening</a> (mittlerweile gerebranded)',
          },
        },
        {
          label: {
            en: 'Production of audio and video content for Radio Arabella',
            de: 'Umsetzen von Audio- und Videoprojekten für Radio Arabella',
          },
        },
        {
          label: {
            en: 'Automating most of my work at the district office',
            de: 'Autmatisierung eines Großteils meiner Arbeit am Bezirksamt Hernals',
          },
        },
        {
          label: {
            en: 'Contributions to Marketing Concept for Radio NRJ Austria',
            de: 'Mitarbeit an Marketingkonzept für Radio NRJ Österreich',
          },
        },
        {
          label: {
            en: 'Contributions to TV-Show "Brennweite"',
            de: 'Mitarbeit an TV-Sendungsformat "Brennweite" der FH Wien',
          },
        },
        {
          label: {
            en: 'Contributions to Radio NJoy',
            de: 'Mitarbeit an Sendungen für Radio NJoy',
          },
        },
        {
          label: {
            en: 'Logo- und Corporatedesign für lectureclips.com <i>(not active anymore)</i>',
            de: 'Logo- und Corporatedesign für lectureclips.com <i>(nicht mehr aktiv)</i>',
          },
        },
      ],
      tags: ['non-tech'],
    },
    {
      label: {
        en: 'District Office',
        de: 'Bezirksämter 16 & 17',
      },
      tagLine: {
        en: 'administrative penalties and trade/business law',
        de: 'Verwaltungstrafen und Gewerberecht',
      },
      time: {
        from: dayjs('05/15', DATE_FORMAT),
        to: dayjs('12/20', DATE_FORMAT),
      },
      list: [
        {
          label: {
            en: 'scrupulous legal work',
            de: 'gewissenhaftes juristisches Arbeiten',
          },
        },
        {
          label: {
            en: 'close cooperation with businesses as governmental body',
            de: 'enge Zusammenarbeit mit Wirtschaftstreibenden in Funktion als Behörde',
          },
        },
        {
          label: {
            en: 'confrontation with multiple aspects of applied law',
            de: 'Einsatz in einer Vielzahl von Rechtsmaterien (u.A.: GewO, NAG, LMSVG, AWEG, AuslBG, etc.)',
          },
        },
      ],
      tags: ['non-tech'],
    },
    {
      label: { en: 'MA 35', de: 'MA 35' },
      tagLine: {
        en: 'Immigration Office',
        de: 'Einwanderungsverfahren',
      },
      time: {
        from: dayjs('12/12', DATE_FORMAT),
        to: dayjs('04/15', DATE_FORMAT),
      },
      list: [
        {
          label: {
            en: 'politically and legally controversial matter',
            de: 'brisante politische und rechtliche Materie',
          },
        },
        {
          label: {
            en: 'challenging handling of clients',
            de: 'herausfordernder Kundenkontakt',
          },
        },
        {
          label: {
            en: 'enormous workload',
            de: 'enormes Arbeitsvolumen',
          },
        },
      ],
      tags: ['non-tech'],
    },
    {
      label: {
        en: 'various internships',
        de: 'diverse Praktika',
      },
      time: {
        from: dayjs('06/08', DATE_FORMAT),
        to: dayjs('12/12', DATE_FORMAT),
      },
      list: [
        { label: { en: 'Vetoquinol', de: 'Vetoquinol' } },
        {
          label: {
            en: 'Property Management Rosenberger',
            de: 'Hausverwaltung Rosenberger',
          },
        },
        {
          label: {
            en: 'Wiener Volkshochschulen',
            de: 'Wiener Volkshochschulen',
          },
        },
        {
          label: {
            en: 'Archdiocese Vienna',
            de: 'Erzdiözese Wien',
          },
        },
      ],
      tags: ['non-tech'],
    },
  ],
};

const cvEduItems: CvSectionType = {
  heading: {
    en: 'Education',
    de: 'Schul- und Berufsausbilungen',
  },
  items: [
    {
      label: {
        en: 'University of Applied Sciences for Management & Communication Vienna',
        de: 'FH der WKW',
      },
      time: {
        from: dayjs('09/2015', DATE_FORMAT),
        to: dayjs('10/2018', DATE_FORMAT),
      },
      tagLine: {
        en: 'Content Production & Digital Media Management, graduated with honors',
        de: 'Studium “Contentproduktion & digitales Medienmanagement”, Abschlussmit Auszeichnung',
      },
      tags: ['non-tech'],
    },
    {
      label: {
        en: 'Municipal department of Vienna',
        de: 'Magistrat Wien',
      },
      time: {
        from: dayjs('12/2014', DATE_FORMAT),
        to: dayjs('12/2014', DATE_FORMAT),
      },
      tagLine: {
        en: 'Service exam of the municipal district of Vienna (mainly public law)',
        de: 'Dienstprüfungskurs und Dienstprüfung <i>(hauptsächlich öffentliches Recht.)</i>',
      },
      tags: ['non-tech'],
    },
    {
      label: {
        en: 'University of Vienna',
        de: 'Universität Wien',
      },
      time: {
        from: dayjs('09/2010', DATE_FORMAT),
        to: dayjs('06/2011', DATE_FORMAT),
      },
      tagLine: {
        en: 'Catholic Theology and Latin',
        de: 'Katholische Theologie und Latein - Lehramtsstudium',
      },
      tags: ['non-tech'],
    },
    {
      label: {
        en: 'Vienna University of Economics and Business',
        de: 'Wirtschaftsuniversität Wien',
      },
      time: {
        from: dayjs('09/2009', DATE_FORMAT),
        to: dayjs('06/2010', DATE_FORMAT),
      },
      tagLine: {
        en: 'Economics',
        de: 'Studium der Betriebswirtschaftslehre',
      },
      tags: ['non-tech'],
    },
    {
      label: {
        en: 'University of Vienna',
        de: 'Universität Wien',
      },
      time: {
        from: dayjs('09/2008', DATE_FORMAT),
        to: dayjs('06/2009', DATE_FORMAT),
      },
      tagLine: {
        en: 'Catholic Theology',
        de: 'Studium der kath. Fachtheologie',
      },
      tags: ['non-tech'],
    },
    {
      label: {
        en: 'Highschool in Vienna, Austria',
        de: 'Bundesgymnasium Wien XIX',
      },
      time: {
        from: dayjs('09/2000', DATE_FORMAT),
        to: dayjs('06/2008', DATE_FORMAT),
      },
      tagLine: {
        en: 'graduated with Austrian "Matura"',
        de: 'AHS Matura (humanistischer Zweig)',
      },
      tags: ['non-tech'],
    },
  ],
};

const skills: CvSectionType = {
  heading: { en: 'Languages', de: 'Sprachen' },
  items: [
    {
      label: {
        en: 'German <i>(First Language)</i>',
        de: 'Deutsch <i>(Muttersprache)</i>',
      },
      tags: ['non-tech'],
    },
    {
      label: {
        en: 'English <i>(near-native Level)</i>',
        de: 'Englisch <i>(muttersprachliches Niveau)</i>',
      },
      tags: ['non-tech'],
    },
    {
      label: {
        en: 'Latin <i>(very helpful)</i>',
        de: 'Latein <i>(sehr hilfreich)</i>',
      },
      tags: ['non-tech'],
    },
    {
      label: {
        en: 'Anchient Greek <i>(even more helpful)</i>',
        de: 'Altgriechisch <i>(noch viel hilfreicher)</i>',
      },
      tags: ['non-tech'],
    },
    {
      label: {
        en: 'Russian <i>(A2)</i>',
        de: 'Russisch <i>(A2)</i>',
      },
      tags: ['non-tech'],
    },
  ],
};

export default {
  introText,
  overviewText,
  cvJobItems,
  cvEduItems,
  skills,
};
