import {
  Children,
  isValidElement,
  type ReactNode,
} from "react";
import {
  CallApplyBindDiagram,
  EventLoopDiagram,
  ThisBindingDiagram,
} from "@/components/blog-diagrams";

function nodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(nodeText).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return nodeText(node.props.children);
  }

  return "";
}

function highlightLine(line: string) {
  const tokens = line.split(
    /(\b(?:var|let|const|for|function|return|if|else|new)\b|\b(?:setTimeout|console\.log)\b|\b\d+\b|=>)/g,
  );

  return tokens.map((token, index) => {
    if (!token) {
      return null;
    }

    let className = "";

    if (/^(var|let|const|for|function|return|if|else|new)$/.test(token)) {
      className = "text-clay";
    } else if (/^(setTimeout|console\.log)$/.test(token)) {
      className = "text-sky";
    } else if (/^\d+$/.test(token)) {
      className = "text-sage";
    } else if (token === "=>") {
      className = "text-plum";
    }

    return (
      <span key={index} className={className || undefined}>
        {token}
      </span>
    );
  });
}

function CodePre({ children }: { children?: ReactNode }) {
  const child = Children.toArray(children)[0];
  const childProps = isValidElement<{ className?: string; children?: ReactNode }>(
    child,
  )
    ? child.props
    : null;
  const language =
    childProps?.className?.match(/language-([\w-]+)/)?.[1] ?? "code";
  const raw = nodeText(childProps?.children ?? children).replace(/\n$/, "");
  const lines = raw.split("\n");

  return (
    <div className="overflow-hidden rounded-lg border border-line/80 bg-[#f0e8dc]/70">
      <div className="border-b border-line/70 px-4 py-2">
        <span className="font-mono text-[0.64rem] tracking-[0.12em] text-muted">
          {language}
        </span>
      </div>
      <pre
        tabIndex={0}
        aria-label={`${language} code example`}
        className="overflow-x-auto px-4 py-4 font-mono text-[0.77rem] leading-[1.85] text-ink"
      >
        <code className="block min-w-max">
          {lines.map((line, index) => (
            <span key={index} className="flex">
              <span
                aria-hidden="true"
                className="w-7 shrink-0 select-none pr-3 text-right text-muted/45"
              >
                {index + 1}
              </span>
              <span className="whitespace-pre">{highlightLine(line)}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

function Callout({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <aside className="rounded-lg border border-clay/20 bg-clay/[0.055] px-4 py-3.5">
      {label ? (
        <p className="text-[0.64rem] uppercase tracking-[0.14em] text-clay">
          {label}
        </p>
      ) : null}
      <div className="mt-1 text-body normal-case text-ink [&_p]:m-0">
        {children}
      </div>
    </aside>
  );
}

export const mdxComponents = {
  pre: CodePre,
  Callout,
  ThisBindingDiagram,
  CallApplyBindDiagram,
  EventLoopDiagram,
};
