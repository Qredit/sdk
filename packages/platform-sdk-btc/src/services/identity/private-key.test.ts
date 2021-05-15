import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { PrivateKey } from "./private-key";

let subject: PrivateKey;

beforeEach(async () => (subject = new PrivateKey()));

describe("PrivateKey", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toBe(identity.privateKey);
	});

	it("should generate an output from a wif", async () => {
		const result = await subject.fromWIF(identity.wif);

		expect(result).toBe(identity.privateKey);
	});
});