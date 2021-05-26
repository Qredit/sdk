import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BIP32 } from "@arkecosystem/platform-sdk-crypto";
import { PrivateKey, PublicKey } from "bitcore-lib";

export class KeyPairService implements Contracts.KeyPairService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.KeyPairDataTransferObject> {
		try {
			return this.normalize(new PrivateKey(BIP32.fromMnemonic(mnemonic).privateKey!.toString("hex")));
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromPrivateKey(privateKey: string): Promise<Contracts.KeyPairDataTransferObject> {
		try {
			return this.normalize(new PrivateKey(privateKey));
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromWIF(wif: string): Promise<Contracts.KeyPairDataTransferObject> {
		try {
			return this.normalize(PrivateKey.fromWIF(wif));
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromSecret(secret: string): Promise<Contracts.KeyPairDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}

	private normalize(privateKey: Buffer): Contracts.KeyPairDataTransferObject {
		try {
			return {
				publicKey: PublicKey.fromPrivateKey(privateKey).toString("hex"),
				privateKey: privateKey.toString("hex"),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
