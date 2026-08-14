# Changelog

## [0.2.0](https://github.com/PRDCTR-Foundation/prdctr-common/compare/papi-chain-v0.1.5...papi-chain-v0.2.0) (2026-08-14)


### ⚠ BREAKING CHANGES

* packages are published as @prdctr-foundation/*. Consumers must update their dependency names and their .npmrc scope mapping.
* **papi-chain:** smoldot callers must pass smoldot.createWorker.

### Features

* **papi-chain:** take the smoldot worker from the caller ([#24](https://github.com/PRDCTR-Foundation/prdctr-common/issues/24)) ([d06cf6a](https://github.com/PRDCTR-Foundation/prdctr-common/commit/d06cf6a42ba3fa3ab6cadf3106abdfddd16114cd))
* publish under the [@prdctr-foundation](https://github.com/prdctr-foundation) scope ([#25](https://github.com/PRDCTR-Foundation/prdctr-common/issues/25)) ([2219483](https://github.com/PRDCTR-Foundation/prdctr-common/commit/2219483005cfb7a1822f456e5958f8ec7788e29f))

## [0.1.5](https://github.com/Predictor-Foundation/prdctr-common/compare/papi-chain-v0.1.4...papi-chain-v0.1.5) (2026-07-30)


### Documentation

* **packages:** rename Predictor to PRDCTR in prose and repo references ([#22](https://github.com/Predictor-Foundation/prdctr-common/issues/22)) ([81dc592](https://github.com/Predictor-Foundation/prdctr-common/commit/81dc592f0d05d48a39f495cc94a5a701e9fd9dd6))

## [0.1.4](https://github.com/Predictor-Foundation/predictor-common/compare/papi-chain-v0.1.3...papi-chain-v0.1.4) (2026-07-14)


### Features

* **papi-chain:** add toggleable smoldot light-client transport ([#19](https://github.com/Predictor-Foundation/predictor-common/issues/19)) ([f381934](https://github.com/Predictor-Foundation/predictor-common/commit/f381934c540c6ca55a0cabb27cbd2d7a2aebc156))

## [0.1.3](https://github.com/Predictor-Foundation/predictor-common/compare/papi-chain-v0.1.2...papi-chain-v0.1.3) (2026-07-14)


### Features

* **packages:** harden secrets, add connection observability, and pnpm catalog + supply-chain cooldown ([#17](https://github.com/Predictor-Foundation/predictor-common/issues/17)) ([1bcb6e2](https://github.com/Predictor-Foundation/predictor-common/commit/1bcb6e24b15bfbeeb493b35804cdc075bf70aa8b))

## [0.1.2](https://github.com/Predictor-Foundation/predictor-common/compare/papi-chain-v0.1.1...papi-chain-v0.1.2) (2026-07-06)


### Features

* **packages:** extract shared service/web packages and group monorepo by layer ([#15](https://github.com/Predictor-Foundation/predictor-common/issues/15)) ([6997468](https://github.com/Predictor-Foundation/predictor-common/commit/69974685a44ea9fec6a9114c2787ebe4578fd00d))

## [0.1.1](https://github.com/Predictor-Foundation/predictor-common/compare/papi-chain-v0.1.0...papi-chain-v0.1.1) (2026-07-03)


### Features

* extract shared [@prdctr-foundation](https://github.com/predictor-foundation) packages ([#13](https://github.com/Predictor-Foundation/predictor-common/issues/13)) ([5365264](https://github.com/Predictor-Foundation/predictor-common/commit/536526487c0aec091c2cff744d29d2369829c42c))
