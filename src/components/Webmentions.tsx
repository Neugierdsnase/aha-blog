import { useEffect, useState } from "react";
import "./Webmentions.css";

interface WebmentionAuthor {
  name: string;
  photo?: string;
  url?: string;
}

interface Webmention {
  type: string;
  author: WebmentionAuthor;
  url: string;
  published?: string;
  content?: {
    text?: string;
    html?: string;
  };
}

interface WebmentionsProps {
  url: string;
}

function AuthorAvatar({ author }: { author: WebmentionAuthor }) {
  return author.photo ? (
    <img src={author.photo} alt={author.name} />
  ) : (
    <span>{author.name[0]}</span>
  );
}

function MentionFaces({
  label,
  mentions,
}: {
  label: string;
  mentions: Webmention[];
}) {
  if (mentions.length === 0) return null;

  return (
    <div className="webmention-section">
      <h4>
        {mentions.length} {label}
        {mentions.length !== 1 ? "s" : ""}
      </h4>
      <div className="webmention-faces">
        {mentions.map((mention, i) => (
          <a
            key={i}
            href={mention.author.url || mention.url}
            title={mention.author.name}
            className="webmention-face"
          >
            <AuthorAvatar author={mention.author} />
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Webmentions({ url }: WebmentionsProps) {
  const [mentions, setMentions] = useState<Webmention[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWebmentions = async () => {
      try {
        const response = await fetch(
          `https://webmention.io/api/mentions.jf2?target=${encodeURIComponent(url)}`,
        );
        const data = await response.json();
        setMentions(data.children || []);
      } catch (error) {
        console.error("Failed to fetch webmentions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWebmentions();
  }, [url]);

  if (loading || mentions.length === 0) {
    return null;
  }

  const likes = mentions.filter((m) => m.type === "like");
  const reposts = mentions.filter((m) => m.type === "repost");
  const replies = mentions.filter(
    (m) => m.type === "reply" || m.type === "mention",
  );

  return (
    <div className="webmentions">
      <h3>Webmentions</h3>

      <MentionFaces label="Like" mentions={likes} />
      <MentionFaces label="Repost" mentions={reposts} />

      {replies.length > 0 && (
        <div className="webmention-section">
          <h4>
            {replies.length} Repl{replies.length !== 1 ? "ies" : "y"}
          </h4>
          <div className="webmention-replies">
            {replies.map((mention, i) => (
              <div key={i} className="webmention-reply">
                <div className="webmention-reply-author">
                  {mention.author.photo && (
                    <img src={mention.author.photo} alt={mention.author.name} />
                  )}
                  <div>
                    <a href={mention.author.url || mention.url}>
                      {mention.author.name}
                    </a>
                    {mention.published && (
                      <time dateTime={mention.published}>
                        {new Date(mention.published).toLocaleDateString(
                          "de-DE",
                        )}
                      </time>
                    )}
                  </div>
                </div>
                {mention.content?.text && (
                  <div className="webmention-reply-content">
                    {mention.content.text}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
