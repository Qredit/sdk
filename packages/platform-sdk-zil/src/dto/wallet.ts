import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { convertQaToZil } from "../zilliqa";

export class WalletData extends DTO.AbstractWalletData implements Contracts.WalletData {
	public primaryKey(): string {
		return this.address();
	}

	public address(): string {
		return this.data.address;
	}

	public publicKey(): string | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, this.publicKey.name);
	}

	public balance(): BigNumber {
		return BigNumber.make(convertQaToZil(this.data.balance));
	}

	public nonce(): BigNumber {
		return BigNumber.make(this.data.nonce);
	}

	public secondPublicKey(): string | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, this.secondPublicKey.name);
	}

	public username(): string | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, this.username.name);
	}

	public rank(): number | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, this.rank.name);
	}

	public votes(): BigNumber | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, this.votes.name);
	}

	public entities(): Contracts.Entity[] {
		throw new Exceptions.NotImplemented(this.constructor.name, this.entities.name);
	}

	public multiSignature(): Contracts.WalletMultiSignature {
		throw new Exceptions.NotImplemented(this.constructor.name, this.multiSignature.name);
	}

	public isDelegate(): boolean {
		return false;
	}

	public isResignedDelegate(): boolean {
		return false;
	}

	public isMultiSignature(): boolean {
		return false;
	}

	public isSecondSignature(): boolean {
		return false;
	}
}