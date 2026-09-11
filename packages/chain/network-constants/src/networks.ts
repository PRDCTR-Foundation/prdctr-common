import type { PredictorNetwork, PredictorNetworkId } from "./network";
import { PREDICTOR_SS58_PREFIX } from "./ss58";

/**
 * The block-explorer route namespace shared by every PRDCTR network. It is
 * the block-explorer's `network.name`
 * (block-explorer/packages/frontend/src/networks.json :: `predictor.name`) and
 * appears in the bridge dapp's hardcoded explorer links
 * (`/predictor/extrinsic/...`).
 */
const EXPLORER_NETWORK_PATH = "predictor";

/** Strip trailing slashes so `explorerBaseUrl` joins cleanly - mirrors the
 * `.replace(/\/+$/, "")` normalisation the faucet and bridge dapp both apply. */
function normaliseBaseUrl(url: string): string {
	return url.replace(/\/+$/, "");
}

function defineNetwork(net: PredictorNetwork): PredictorNetwork {
	return { ...net, explorerBaseUrl: normaliseBaseUrl(net.explorerBaseUrl) };
}

/**
 * PRDCTR mainnet, live since 2026-07-28.
 *
 * Provenance: the launch record of 2026-07-28 - chain at
 * `wss://chain-external.prdctr.io`, explorer at `explorer.prdctr.io`. The
 * coordinates (SS58 42, 10 decimals, PRD) are the same as testnet; only the
 * endpoints differ.
 */
export const PREDICTOR_MAINNET: PredictorNetwork = defineNetwork({
	id: "mainnet",
	displayName: "PRDCTR Mainnet",
	ss58Prefix: PREDICTOR_SS58_PREFIX,
	decimals: 10,
	tokenSymbol: "PRD",
	wsEndpoints: ["wss://chain-external.prdctr.io"],
	explorerBaseUrl: "https://explorer.prdctr.io",
	explorerNetworkPath: EXPLORER_NETWORK_PATH,
});

/**
 * The public PRDCTR testnet, code-named "Cassandra".
 *
 * Provenance:
 * - displayName, wsEndpoints[0], explorerBaseUrl:
 *   faucet/packages/backend/src/config.ts (`DEFAULT_CHAIN_NAME`,
 *   `DEFAULT_EXPLORER_URL`) and faucet/packages/backend/src/chain.ts
 *   (`DEFAULT_WS_ENDPOINT`).
 * - ss58Prefix / decimals / tokenSymbol: faucet chain.ts `CHAIN`, matching
 *   block-explorer networks.json.
 */
export const PREDICTOR_TESTNET: PredictorNetwork = defineNetwork({
	id: "testnet",
	displayName: "Cassandra - PRDCTR Public Testnet",
	ss58Prefix: PREDICTOR_SS58_PREFIX,
	decimals: 10,
	tokenSymbol: "PRD",
	wsEndpoints: ["wss://chain-external.testnet.prdctr.io"],
	explorerBaseUrl: "https://explorer.testnet.prdctr.io",
	explorerNetworkPath: EXPLORER_NETWORK_PATH,
});

/**
 * The internal PRDCTR development network.
 *
 * Provenance:
 * - explorerBaseUrl: prdctr-bridge-dapp/src/config/bridgeConfig.ts default for
 *   `PREDICTOR_EXPLORER_BASE_URL` (`https://explorer.dev.prdctr.io`).
 * - wsEndpoints[0]: `wss://rpc-node.dev.prdctr.io`, the hosted dev RPC named by
 *   prdctr-bridge-dapp's `.env.example` and prdctr-squids' `metadata:explore`
 *   script. An earlier revision of this file recorded that no hosted dev
 *   endpoint existed in any repo and used the bridge dapp's *local-run*
 *   default instead; that was wrong. A local node is an override, not the
 *   meaning of "dev".
 * - ss58Prefix / decimals / tokenSymbol: identical to testnet (bridge dapp
 *   `prdDecimals` default 10; SS58 42; symbol "PRD" from the shared coords).
 */
export const PREDICTOR_DEV: PredictorNetwork = defineNetwork({
	id: "dev",
	displayName: "PRDCTR Dev",
	ss58Prefix: PREDICTOR_SS58_PREFIX,
	decimals: 10,
	tokenSymbol: "PRD",
	wsEndpoints: ["wss://rpc-node.dev.prdctr.io"],
	explorerBaseUrl: "https://explorer.dev.prdctr.io",
	explorerNetworkPath: EXPLORER_NETWORK_PATH,
});

/** All known PRDCTR networks, keyed by their {@link PredictorNetworkId}. */
export const PREDICTOR_NETWORKS: Readonly<Record<PredictorNetworkId, PredictorNetwork>> = {
	mainnet: PREDICTOR_MAINNET,
	testnet: PREDICTOR_TESTNET,
	dev: PREDICTOR_DEV,
};

/** Total-function lookup: every {@link PredictorNetworkId} resolves to a network. */
export function getPredictorNetwork(id: PredictorNetworkId): PredictorNetwork {
	return PREDICTOR_NETWORKS[id];
}
