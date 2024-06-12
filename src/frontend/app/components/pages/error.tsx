'use client';

import * as log from '#fe/lib/log.lib';

function ErrorPage({ error }) {
  log.error(error);
  // TODO: Implement error page
  return <>{'Error Page'}</>;
}

export default ErrorPage;
