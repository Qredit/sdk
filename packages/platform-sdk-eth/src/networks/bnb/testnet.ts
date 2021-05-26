import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "bnb.testnet",
	type: "test",
	name: "Testnet",
	coin: "Binance",
	currency: {
		ticker: "BNB",
		symbol: "BNB",
	},
	constants: {
		slip44: 714,
	},
	hosts: [
		{
			type: "full",
			host: "https://data-seed-prebsc-1-s1.binance.org:8545",
		},
		{
			type: "explorer",
			host: "https://binance.mintscan.io",
		},
	],
	transactions,
	importMethods,
	featureFlags,
};

export default network;