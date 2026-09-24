import { isTodo } from '../data/resume';

/** Visible amber placeholder for anything left bracketed in the brief. */
export default function Todo({ note }) {
  return <mark className="todo">TODO: {note}</mark>;
}

/**
 * Renders a value that may be a string, a TODO marker, or an array of both.
 * Keeps the JSX in the sections free of placeholder plumbing.
 */
export function Value({ of }) {
  if (Array.isArray(of)) {
    return (
      <>
        {of.map((part, i) =>
          isTodo(part) ? <Todo key={i} note={part.__todo} /> : <span key={i}>{part}</span>
        )}
      </>
    );
  }
  return isTodo(of) ? <Todo note={of.__todo} /> : <>{of}</>;
}
