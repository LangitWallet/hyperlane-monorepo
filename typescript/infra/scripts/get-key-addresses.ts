import { getAllKeys } from '../src/agents/key-utils';

import { getEnvironmentConfig } from './utils';

async function main() {
  const config = await getEnvironmentConfig();
  const keys = getAllKeys(config.agent);

  const keyInfos = await Promise.all(
    keys.map(async (key) => {
      let address = '';
      try {
        await key.fetch();
        address = key.address;
      } catch (e) {}
      return {
        identifier: key.identifier,
        address,
      };
    }),
  );

  console.log(JSON.stringify(keyInfos, null, 2));
}

main().catch(console.error);