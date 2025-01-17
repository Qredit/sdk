import { Networks } from "@payvo/sdk";

// @TODO: type
export const constants = {
	slip44: 1815,
};

export const transactions: Networks.NetworkManifestTransactions = {
	expirationType: "height",
	types: ["transfer"],
	fees: {
		type: "static",
		ticker: "ADA",
	},
	utxo: true,
};

export const importMethods: Networks.NetworkManifestImportMethods = {
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

export const featureFlags: Networks.NetworkManifestFeatureFlags = {
	Client: ["transaction", "transactions", "wallet", "broadcast"],
	Address: ["mnemonic.bip44", "publicKey", "validate"],
	KeyPair: ["mnemonic.bip44"],
	PrivateKey: ["mnemonic.bip44"],
	PublicKey: ["mnemonic.bip44"],
	Message: ["sign", "verify"],
	Transaction: ["estimateExpiration", "transfer"],
};

export const explorer: Networks.NetworkManifestExplorer = {
	block: "block/{0}",
	transaction: "tx/{0}",
	wallet: "address/{0}",
};
