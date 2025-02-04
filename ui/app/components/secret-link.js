import { computed } from '@ember/object';
import Component from '@ember/component';
import { encodePath } from 'vault/utils/path-encoding-helpers';

export function linkParams({ mode, secret, queryParams }) {
  let params;
  const route = `vault.cluster.secrets.backend.${mode}`;

  if ((mode !== 'versions' && !secret) || secret === ' ') {
    params = [route + '-root'];
  } else {
    params = [route, encodePath(secret)];
  }

  if (queryParams) {
    params.push(queryParams);
  }

  return params;
}

export default Component.extend({
  onLinkClick() {},
  tagName: '',
  // so that ember-test-selectors doesn't log a warning
  supportsDataTestProperties: true,
  mode: 'list',

  secret: null,
  queryParams: null,
  ariaLabel: null,

  linkParams: computed('mode', 'secret', 'queryParams', function () {
    let data = { mode: this.mode, secret: this.secret, queryParams: this.queryParams };
    return linkParams(data);
  }),
});
