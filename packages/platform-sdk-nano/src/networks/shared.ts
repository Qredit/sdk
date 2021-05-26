import { Coins } from "@arkecosystem/platform-sdk";

export const transactions: Coins.NetworkManifestTransactions = {
	expirationType: "height",
	types: ["transfer"],
	fees: {
		type: "free",
		ticker: "NANO",
	},
	memo: true,
};

export const importMethods: Coins.NetworkManifestImportMethods = {
	address: {
		default: false,
		permissions: ["read"],
	},
	bip44: {
		default: true,
		permissions: ["read", "write"],
	},
	publicKey: {
		default: false,
		permissions: ["read"],
	},
};

export const featureFlags: Coins.NetworkManifestFeatureFlags = {
	Client: [
		"transaction",
		"transactions",
		"wallet",
		"wallets",
		"delegate",
		"delegates",
		"votes",
		"voters",
		"configuration",
		"fees",
		"syncing",
		"broadcast",
	],
	Fee: ["all"],
	Identity: [
		"address.mnemonic.bip44",
		"address.privateKey",
		"address.publicKey",
		"address.validate",
		"keyPair.mnemonic.bip44",
		"privateKey.mnemonic.bip44",
		"publicKey.mnemonic.bip44",
		"wif.mnemonic.bip44",
	],
	Link: ["block", "transaction", "wallet"],
	Message: ["sign", "verify"],
	Peer: ["validate"],
	Transaction: ["transfer"],
};