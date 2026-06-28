import Link from "next/link";
import { Fragment } from "react";

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

export function RichParagraph({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  LINK_PATTERN.lastIndex = 0;
  while ((match = LINK_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>);
    }
    parts.push(
      <Link key={key++} href={match[2]} className="text-cyan hover:underline">
        {match[1]}
      </Link>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>);
  }

  return <p className="text-base leading-relaxed text-text-dim">{parts}</p>;
}
