import { Coins, Services } from "@arkecosystem/platform-sdk";

import { ExtendedTransactionData } from "./transaction.dto";
import { transformTransactionData, transformTransactionDataCollection } from "./transaction.mapper";
import { IReadWriteWallet } from "./contracts";
import { ExtendedTransactionDataCollection } from "./transaction.collection";
import { ITransactionIndex } from "./contracts";

export class TransactionIndex implements ITransactionIndex {
	readonly #wallet: IReadWriteWallet;

	public constructor(wallet: IReadWriteWallet) {
		this.#wallet = wallet;
	}

	/** {@inheritDoc ITransactionIndex.all} */
	public async all(query: Services.ClientTransactionsInput = {}): Promise<ExtendedTransactionDataCollection> {
		return this.#fetch({ ...query, addresses: [this.#wallet.address()] });
	}

	/** {@inheritDoc ITransactionIndex.sent} */
	public async sent(query: Services.ClientTransactionsInput = {}): Promise<ExtendedTransactionDataCollection> {
		return this.#fetch({ ...query, senderId: this.#wallet.address() });
	}

	/** {@inheritDoc ITransactionIndex.received} */
	public async received(query: Services.ClientTransactionsInput = {}): Promise<ExtendedTransactionDataCollection> {
		return this.#fetch({ ...query, recipientId: this.#wallet.address() });
	}

	/** {@inheritDoc ITransactionIndex.findById} */
	public async findById(id: string): Promise<ExtendedTransactionData> {
		return transformTransactionData(
			this.#wallet,
			await this.#wallet.getAttributes().get<Coins.Coin>("coin").client().transaction(id),
		);
	}

	/** {@inheritDoc ITransactionIndex.findByIds} */
	public async findByIds(ids: string[]): Promise<ExtendedTransactionData[]> {
		return Promise.all(ids.map((id: string) => this.findById(id)));
	}

	async #fetch(query: Services.ClientTransactionsInput): Promise<ExtendedTransactionDataCollection> {
		const result = await this.#wallet.getAttributes().get<Coins.Coin>("coin").client().transactions(query);

		for (const transaction of result.items()) {
			transaction.setMeta("address", this.#wallet.address());
			transaction.setMeta("publicKey", this.#wallet.publicKey());
		}

		return transformTransactionDataCollection(this.#wallet, result);
	}
}