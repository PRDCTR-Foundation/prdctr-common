// This package compiles to CommonJS and its sources use extensionless relative
// imports, which Node's ESM resolver cannot follow. So the tests exercise the
// BUILT output rather than src/, and `test` builds first.
import assert from "node:assert/strict";
import { test } from "node:test";
import {
	getPredictorNetwork,
	PREDICTOR_DEV,
	PREDICTOR_MAINNET,
	PREDICTOR_NETWORKS,
	PREDICTOR_TESTNET,
	primaryWsEndpoint,
} from "../lib/index.js";

// Every network is reachable through the total lookup. A network defined but
// left out of the registry is the failure this catches: it type-checks, and
// then resolves to undefined at the one call site that asks for it by id.
test("every id in the registry resolves to the network it names", () => {
	for (const [id, net] of Object.entries(PREDICTOR_NETWORKS)) {
		assert.equal(net.id, id);
		assert.equal(getPredictorNetwork(net.id), net);
	}
});

test("mainnet, testnet and dev are all registered", () => {
	assert.deepEqual(Object.keys(PREDICTOR_NETWORKS).sort(), ["dev", "mainnet", "testnet"]);
});

// The coordinates are the same across networks; only the endpoints differ. A
// wrong prefix or decimals silently mis-renders every address and balance.
test("the chain coordinates are identical across networks", () => {
	for (const net of [PREDICTOR_MAINNET, PREDICTOR_TESTNET, PREDICTOR_DEV]) {
		assert.equal(net.ss58Prefix, 42, `${net.id} ss58Prefix`);
		assert.equal(net.decimals, 10, `${net.id} decimals`);
		assert.equal(net.tokenSymbol, "PRD", `${net.id} tokenSymbol`);
	}
});

// Endpoints must be distinct per network. Two networks sharing one is how a
// deployment silently reads or writes the wrong chain.
test("no two networks share a primary endpoint", () => {
	const seen = new Set();
	for (const net of Object.values(PREDICTOR_NETWORKS)) {
		const ep = primaryWsEndpoint(net);
		assert.ok(!seen.has(ep), `${net.id} reuses ${ep}`);
		seen.add(ep);
	}
});

test("every endpoint is a secure websocket on a prdctr.io host", () => {
	for (const net of Object.values(PREDICTOR_NETWORKS)) {
		for (const ep of net.wsEndpoints) {
			const url = new URL(ep);
			assert.equal(url.protocol, "wss:", `${net.id} ${ep} is not wss`);
			assert.ok(url.hostname.endsWith("prdctr.io"), `${net.id} ${ep} is not a prdctr.io host`);
		}
		assert.ok(net.explorerBaseUrl.startsWith("https://"), `${net.id} explorerBaseUrl is not https`);
	}
});
