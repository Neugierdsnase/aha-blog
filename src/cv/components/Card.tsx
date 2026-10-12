import { getTranslation } from "../data";
import type { CvItemType, LanguageType } from "../types";
import dayjs from "dayjs";
import { ArrowRightFromLine, ArrowRightToLine } from "lucide-react";
import { Fragment, type FunctionComponent } from "react";
type CardProps = {
  activeLanguage: LanguageType;
  item: CvItemType;
};

export const CvItemCard: FunctionComponent<CardProps> = ({
  item,
  activeLanguage,
}) => {
  const label = getTranslation(activeLanguage, item.label);
  const tagLine = getTranslation(activeLanguage, item.tagLine);

  return (
    <div className="card card-border scrollfade bg-base-100">
      <div className="card-body">
        <h3
          className="card-title text-balance font-soria"
          data-lang="en"
          dangerouslySetInnerHTML={{
            __html: label,
          }}
        />
        {item.tagLine && (
          <p
            className="text-balance text-base-content/70"
            dangerouslySetInnerHTML={{
              __html: tagLine,
            }}
          />
        )}
        <div className="flex flex-nowrap items-center gap-2 whitespace-nowrap text-xs text-base-content/60">
          {dayjs(item.time?.from).format("MMMM YYYY")}
          <ArrowRightFromLine size="14" className="inline-block" />
          {item.time?.to && (
            <Fragment>
              •
              <ArrowRightToLine size="14" className="inline-block" />
              {dayjs(item.time.to).format("MMMM YYYY")}
            </Fragment>
          )}
        </div>
        <ul className="list-inside list-disc">
          {item?.list?.map((listItem) => {
            const itemLabel = getTranslation(activeLanguage, listItem.label);

            return (
              <li
                key={listItem.label.en}
                className="[&_p]:inline"
                dangerouslySetInnerHTML={{
                  __html: itemLabel,
                }}
              />
            );
          })}
        </ul>
        <div className="card-actions flex-wrap gap-4">
          {item.tags?.map((tag) => (
            <span
              key={tag}
              className="badge badge-secondary whitespace-nowrap p-2"
              dangerouslySetInnerHTML={{ __html: tag }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
