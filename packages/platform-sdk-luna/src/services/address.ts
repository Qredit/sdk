import { Services } from "@arkecosystem/platform-sdk";

import { deriveKey } from "./helpers";

export class AddressService extends Services.AbstractAddressService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		return { type: "bip39", address: deriveKey(mnemonic).accAddress };
	}

	public async validate(address: string): Promise<boolean> {
		return true;
	}
}