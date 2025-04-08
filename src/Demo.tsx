import React from 'react';

import ReactDOM from 'react-dom/client';

import { withCopyButton } from './CodeWithCopyButton';

const str = `
function MersenneTwister(seed) {
  if (arguments.length == 0) {
    seed = new Date().getTime();
  }

  this._mt = new Array(624);
  this.setSeed(seed);
}
`;

const CodeWithCopyButton = withCopyButton(({ children }) => <pre><code>{children}</code></pre>);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CodeWithCopyButton>{str}</CodeWithCopyButton>
  </React.StrictMode>,
);
