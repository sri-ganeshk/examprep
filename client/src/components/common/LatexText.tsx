import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

interface LatexTextProps {
  text: string;
  className?: string;
}

export function LatexText({ text, className = '' }: LatexTextProps) {
  if (!text) return null;

  // Split text by [latex]...[/latex] tags
  const parts = text.split(/(\[latex\].*?\[\/latex\])/s);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.startsWith('[latex]') && part.endsWith('[/latex]')) {
          const math = part.slice(7, -8);
          // Check if it should be block math (maybe starts with \n or specific tag, but default to inline)
          return <InlineMath key={index} math={math} />;
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
}
