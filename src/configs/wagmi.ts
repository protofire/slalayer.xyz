import { http, cookieStorage, createConfig, createStorage } from 'wagmi';
import { holesky } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

export const config = createConfig({
  chains: [holesky],
  connectors: [injected()],
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  transports: {
    [holesky.id]: http(),
  },
});
