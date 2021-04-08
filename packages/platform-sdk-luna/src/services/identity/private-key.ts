import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { deriveKey } from "./helpers";

export class PrivateKey implements Contracts.PrivateKey {
	public async fromMnemonic(mnemonic: string, options?: Contracts.IdentityOptions): Promise<string> {
		try {
			return deriveKey(mnemonic).privateKey.toString("hex");
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}
}