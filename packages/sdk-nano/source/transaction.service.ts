import { Contracts, IoC, Services } from "@payvo/sdk";
import { DateTime } from "@payvo/intl";
import { computeWork } from "nanocurrency";
import { block, tools } from "nanocurrency-web";

import { NanoClient } from "./rpc";

@IoC.injectable()
export class TransactionService extends Services.AbstractTransactionService {
	#client!: NanoClient;

	@IoC.postConstruct()
	private onPostConstruct(): void {
		this.#client = new NanoClient(this.configRepository, this.httpClient);
	}

	public override async transfer(input: Services.TransferInput): Promise<Contracts.SignedTransactionData> {
		const { balance, representative, frontier } = await this.#client.accountInfo(input.signatory.address(), {
			representative: true,
		});

		const data = {
			walletBalanceRaw: balance,
			fromAddress: input.signatory.address(),
			toAddress: input.data.to,
			representativeAddress: representative,
			frontier,
			amountRaw: tools.convert(input.data.amount.toString(), "NANO", "RAW"),
			work: (await computeWork(frontier))!,
		};
		const signedData = { ...data, timestamp: DateTime.make() };
		const broadcastData = block.send(data, input.signatory.privateKey());

		return this.dataTransferObjectService.signedTransaction(broadcastData.signature, signedData, broadcastData);
	}
}
