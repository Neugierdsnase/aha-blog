import { getTranslation } from '../data';
import type { CvItemType, LanguageType } from '../types';
import dayjs from 'dayjs';
import { ArrowRightFromLine, ArrowRightToLine } from 'lucide-react';
import { Fragment, type FunctionComponent } from 'react';
  type CardProps = {
  activeLanguage: LanguageType;
  item: CvItemType;
};
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const CvItemCard: FunctionComponent<CardProps> = ({
  item,
  activeLanguage,
}) => {
  const label = getTranslation(activeLanguage, item.label) 
  const tagLine = getTranslation(activeLanguage, item.tagLine)

  return (
    <Card className="scrollfade">
        <CardHeader className="flex justify-between">
            <CardTitle
              className="text-balance"
              data-lang="en"
              dangerouslySetInnerHTML={{
                __html: label,
              }}
            />
            {item.tagLine && (
              <CardDescription
                className="text-balance"
                dangerouslySetInnerHTML={{
                  __html: tagLine,
                }}
              />
            )}
          <CardAction className="flex flex-nowrap items-center gap-2 whitespace-nowrap text-sm text-muted-foreground">
            {dayjs(item.time?.from).format('MMMM YYYY')}
            <ArrowRightFromLine size="14" className="inline-block" />
            {item.time?.to && (
              <Fragment>
                •
                <ArrowRightToLine size="14" className="inline-block" />
                {dayjs(item.time.to).format('MMMM YYYY')}
              </Fragment>
            )}
          </CardAction>
        </CardHeader>
        <CardContent>
          <ul className="list-inside list-disc">
            {item?.list?.map((listItem) => {
              const itemLabel = getTranslation( activeLanguage, listItem.label)

              return (
              <li
                key={listItem.label.en}
                className='[&_p]:inline'
                dangerouslySetInnerHTML={{
                  __html: itemLabel,
                }}
              />
            )})}
          </ul>
        </CardContent>
        <CardFooter>
          <ul className="flex flex-wrap gap-1">
            {item.tags?.map((tag) => (
              <span
                key={tag}
                className="badge-secondary bg-secondary whitespace-nowrap"
                dangerouslySetInnerHTML={{ __html: tag }}
              />
            ))}
          </ul>
        </CardFooter>
    </Card>
  );
};
