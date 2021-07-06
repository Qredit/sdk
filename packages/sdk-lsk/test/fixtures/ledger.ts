export const ledger = {
	appVersion: {
		record: `
            => e0590000020001
            <= 01020001009000
            => e05a00000109
            <= 020200d970020000009000
            => e05b000000
            <= 020500312e332e3104006c69736b9000
        `,
		result: "1.3.1",
	},
	bip44: {
		path: "44'/134'/0'/0/0",
	},
	message: {
		record: `
            => e059000002001c
            <= 0102001c009000
            => e05a00001c06038000002c8000008680000000000b0048656c6c6f20576f726c64
            <= 020200b2c8020000009000
            => e05b000000
            <= 014000bfdd03c0a857361814b0e225a163619e58b7535bd803af8a52b4456e547e6ae013e9ab54ce3152c31c0c9819088279fc31424e39e9935bfa05447b80aba302059000
        `,
		payload: "48656C6C6F20576F726C64",
		result: "bfdd03c0a857361814b0e225a163619e58b7535bd803af8a52b4456e547e6ae013e9ab54ce3152c31c0c9819088279fc31424e39e9935bfa05447b80aba30205",
	},
	publicKey: {
		record: `
            => e059000002000f
            <= 0102000f009000
            => e05a00000f0400038000002c8000008680000000
            <= 020200756d020000009000
            => e05b000000
            <= 022000ceb7bb7475a14b729eba069dfb27715331727a910acf5773a950ed4f863c89ed1400393439383632383833323331333436343735334c9000
        `,
		result: "ceb7bb7475a14b729eba069dfb27715331727a910acf5773a950ed4f863c89ed",
	},
	transaction: {
		record: `
            => e0590000020086
            <= 01020086009000
            => e05a00008605038000002c800000868000000000750000b87fe8030b68c5d745d47998768a14b92b221ded2292e21b62846f8f968fdbcd9b52ae4d000000000000007b6400000000000000ae6a6f11527213a5eb9b7b673579f06ec94722fd07c9cbd5269e0ce34b659453712c0ff259454dbad9eb4d3f713cb6deb446a18cea067dafa8828bed219f8104
            <= 020200d72f020000009000
            => e05b000000
            <= 0140007769836da06abc6b1f56e415f4025381e8bae96d04d6c8d3ae16106b124669564cea8e70981c2ec8b2de725de27555a21992f6043b1ee38baacf0a989c2528099000
        `,
		payload:
			"00b87fe8030b68c5d745d47998768a14b92b221ded2292e21b62846f8f968fdbcd9b52ae4d000000000000007b6400000000000000ae6a6f11527213a5eb9b7b673579f06ec94722fd07c9cbd5269e0ce34b659453712c0ff259454dbad9eb4d3f713cb6deb446a18cea067dafa8828bed219f8104",
		result: "7769836da06abc6b1f56e415f4025381e8bae96d04d6c8d3ae16106b124669564cea8e70981c2ec8b2de725de27555a21992f6043b1ee38baacf0a989c252809",
	},
	wallets: {
		record: `
            => e059000002000f
            <= 0102000f009000
            => e05a00000f0400038000002c8000008680000000
            <= 020200756d020000009000
            => e05b000000
            <= 022000d48522677df50defd175c85072309c7643dbc6bdc63c7665a302579ed2ccaedb1400373339393938363233393038303535313535304c9000
            => e059000002000f
            <= 0102000f009000
            => e05a00000f0400038000002c8000008680000001
            <= 020200547d020000009000
            => e05b000000
            <= 022000635ec78f25eefe8dcb7b4e7f5685c5aad1fef54048c596ee4e74cdf5e7b0f37c150031313630333033343538363636373433383634374c9000
            => e059000002000f
            <= 0102000f009000
            => e05a00000f0400038000002c8000008680000002
            <= 020200374d020000009000
            => e05b000000
            <= 022000675a66400f45ce948bd3e558c731736323d78ef3e3cf29b6ce14303a51ed74561400383236313736363334393536323130343734324c9000
            => e059000002000f
            <= 0102000f009000
            => e05a00000f0400038000002c8000008680000003
            <= 020200165d020000009000
            => e05b000000
            <= 0220005c12c704e97b79a7abd0cdb36336e4bdc675fcec5b8844d1fc95380c1d5db052150031303830363436383837343138373136383430344c9000
            => e059000002000f
            <= 0102000f009000
            => e05a00000f0400038000002c8000008680000004
            <= 020200f12d020000009000
            => e05b000000
            <= 022000fa89575425ac1e58dc6e418ff545def9f8bd782a578917eb2128293a1bc4ed081400363139393839343233343739353438333430354c9000
`,
	},
};