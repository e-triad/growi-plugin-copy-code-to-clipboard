import innerText from 'react-innertext';
import React from 'react';
import { growiReact } from '@growi/pluginkit';

import './CodeWithCopyButton.css';

const CopyButton = ({ text }: { text: string }): JSX.Element => {
  const growiReactInstance = growiReact(React);
  const { useState } = growiReactInstance;
  const [copied, setCopied] = useState(false);

  const clickHandler = async() => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="copy-button-wrapper">
      {copied && <span className="copy-feedback">Copied!</span>}
      <button
        className="btn btn-sm btn-outline-secondary border-0 text-muted"
        data-toggle="tooltip" data-placement="top" title="Copy to clipboard"
        onClick={clickHandler}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      </button>
    </div>
  );
};

export const withCopyButton = (Code: React.FunctionComponent<any>): React.FunctionComponent<any> => {
  return ({ children, inline, ...props }) => {
    if (inline) {
      return <Code {...props} inline>{children}</Code>;
    }

    return (
      <div className="code-block-container">
        <div className="copy-button-position">
          <CopyButton text={innerText(children)} />
        </div>
        <Code {...props}>{children}</Code>
      </div>
    );
  };
};
