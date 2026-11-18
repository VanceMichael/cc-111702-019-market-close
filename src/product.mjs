import { readFile } from 'node:fs/promises';
import { Store } from './store.mjs';
import { Source } from './source.mjs';
import { prepare } from './sessions.mjs';
import { accept } from './quotes.mjs';
import { present } from './closing.mjs';
export async function createProduct({ sourceUrl, statePath = null }) {
  const config = JSON.parse(await readFile(new URL('./domain.json', import.meta.url), 'utf8'));
  const store = new Store(config.initial, statePath); await store.open();
  const source = new Source(sourceUrl, config.route);
  return {
    async collect(input) {
      return store.update(async state => { const request = prepare(state, input); const data = await source.request(request); accept(state, request, data); return present(state); });
    },
    view() { return present(store.snapshot()); },
  };
}
