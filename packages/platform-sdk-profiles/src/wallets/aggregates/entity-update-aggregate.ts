import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { EntityAggregate } from "./entity-aggregate";

export class EntityUpdateAggregate extends EntityAggregate {
	public async all(query: Contracts.ClientPagination = {}): Promise<Coins.TransactionDataCollection> {
		return this.aggregate("all", "update", query);
	}

	public async businesses(query: Contracts.ClientPagination = {}): Promise<Coins.TransactionDataCollection> {
		return this.aggregate("business", "update", query);
	}

	public async delegates(query: Contracts.ClientPagination = {}): Promise<Coins.TransactionDataCollection> {
		return this.aggregate("delegate", "update", query);
	}

	public async plugins(query: Contracts.ClientPagination = {}): Promise<Coins.TransactionDataCollection> {
		return this.aggregate("plugin", "update", query);
	}

	public async corePlugins(query: Contracts.ClientPagination = {}): Promise<Coins.TransactionDataCollection> {
		return this.aggregate("corePlugin", "update", query);
	}

	public async desktopWalletPlugins(
		query: Contracts.ClientPagination = {},
	): Promise<Coins.TransactionDataCollection> {
		return this.aggregate("desktopWalletPlugin", "update", query);
	}
}