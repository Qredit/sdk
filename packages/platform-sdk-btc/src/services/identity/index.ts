import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { AddressService } from "./address";
import { ExtendedAddressService } from "./address-list";
import { KeyPairService } from "./keys";
import { PrivateKeyService } from "./private-key";
import { PublicKeyService } from "./public-key";
import { WIFService } from "./wif";

export class IdentityService implements Contracts.IdentityService {
	readonly #network: string;

	private constructor(network: Coins.NetworkManifest) {
		this.#network = network.id.split(".")[1];
	}

	public static async __construct(config: Coins.Config): Promise<IdentityService> {
		return new IdentityService(config.get<Coins.NetworkManifest>("network"));
	}

	public async __destruct(): Promise<void> {
		//
	}

	public address(): AddressService {
		return new AddressService(this.#network);
	}

	public extendedAddress(): ExtendedAddressService {
		return new ExtendedAddressService();
	}

	public publicKey(): PublicKeyService {
		return new PublicKeyService();
	}

	public privateKey(): PrivateKeyService {
		return new PrivateKeyService();
	}

	public wif(): WIFService {
		return new WIFService();
	}

	public keyPair(): KeyPairService {
		return new KeyPairService();
	}
}
