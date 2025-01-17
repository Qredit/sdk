import "jest-extended";

import { IoC, Services } from "@payvo/sdk";
import nock from "nock";

import { createService, require } from "../test/mocking";
import { ClientService } from "./client.service";
import { SignedTransactionData } from "./signed-transaction.dto";
import { ConfirmedTransactionData } from "./confirmed-transaction.dto";
import { WalletData } from "./wallet.dto";

let subject: ClientService;

beforeAll(async () => {
	nock.disableNetConnect();

	subject = await createService(ClientService, undefined, (container) => {
		container.constant(IoC.BindingType.Container, container);
		container.constant(IoC.BindingType.DataTransferObjects, {
			SignedTransactionData,
			ConfirmedTransactionData,
			WalletData,
		});
		container.singleton(IoC.BindingType.DataTransferObjectService, Services.AbstractDataTransferObjectService);
	});
});

afterEach(() => nock.cleanAll());

describe("ClientService", () => {
	describe("#transaction", () => {
		it("should succeed", async () => {
			nock(/.+/)
				.get("/api/transactions/3e3817fd0c35bc36674f3874c2953fa3e35877cbcdb44a08bdc6083dbd39d572")
				.reply(200, await require(`../test/fixtures/client/transaction.json`));

			const result = await subject.transaction(
				"3e3817fd0c35bc36674f3874c2953fa3e35877cbcdb44a08bdc6083dbd39d572",
			);

			expect(result).toBeInstanceOf(ConfirmedTransactionData);
		});
	});

	describe("#transactions", () => {
		describe("should work with Core 2.0", () => {
			beforeEach(async () => {
				subject = await createService(ClientService, "ark.mainnet", (container) => {
					container.constant(IoC.BindingType.Container, container);
					container.constant(IoC.BindingType.DataTransferObjects, {
						SignedTransactionData,
						ConfirmedTransactionData,
						WalletData,
					});
					container.singleton(
						IoC.BindingType.DataTransferObjectService,
						Services.AbstractDataTransferObjectService,
					);
				});
			});
			it("single address", async () => {
				nock(/.+/)
					.get("/api/transactions")
					.query({ address: "DBk4cPYpqp7EBcvkstVDpyX7RQJNHxpMg8", page: "0" })
					.reply(200, await require(`../test/fixtures/client/transactions.json`));

				const result = await subject.transactions({
					identifiers: [{ type: "address", value: "DBk4cPYpqp7EBcvkstVDpyX7RQJNHxpMg8" }],
					cursor: "0",
				});

				expect(result).toBeObject();
				expect(result.items()[0]).toBeInstanceOf(ConfirmedTransactionData);
			});

			it("multiple addresses", async () => {
				nock(/.+/)
					.get("/api/transactions")
					.query({
						page: "0",
						address: "DBk4cPYpqp7EBcvkstVDpyX7RQJNHxpMg8,DRwgqrfuuaPCy3AE8Sz1AjdrncKfHjePn5",
					})
					.reply(200, await require(`../test/fixtures/client/transactions.json`));

				const result = await subject.transactions({
					identifiers: [
						{ type: "address", value: "DBk4cPYpqp7EBcvkstVDpyX7RQJNHxpMg8" },
						{ type: "address", value: "DRwgqrfuuaPCy3AE8Sz1AjdrncKfHjePn5" },
					],
					cursor: "0",
				});

				expect(result).toBeObject();
				expect(result.items()[0]).toBeInstanceOf(ConfirmedTransactionData);
			});
		});

		describe("should work with Core 3.0", () => {
			beforeEach(async () => {
				subject = await createService(ClientService, "ark.devnet", (container) => {
					container.constant(IoC.BindingType.Container, container);
					container.constant(IoC.BindingType.DataTransferObjects, {
						SignedTransactionData,
						ConfirmedTransactionData,
						WalletData,
					});
					container.singleton(
						IoC.BindingType.DataTransferObjectService,
						Services.AbstractDataTransferObjectService,
					);
				});
			});

			it("single address", async () => {
				nock(/.+/)
					.get("/api/transactions")
					.query({ address: "DBk4cPYpqp7EBcvkstVDpyX7RQJNHxpMg8" })
					.reply(200, await require(`../test/fixtures/client/transactions.json`));

				const result = await subject.transactions({
					identifiers: [{ type: "address", value: "DBk4cPYpqp7EBcvkstVDpyX7RQJNHxpMg8" }],
				});

				expect(result).toBeObject();
				expect(result.items()[0]).toBeInstanceOf(ConfirmedTransactionData);
			});

			it("multiple addresses", async () => {
				nock(/.+/)
					.get("/api/transactions")
					.query({ address: "DBk4cPYpqp7EBcvkstVDpyX7RQJNHxpMg8,DRwgqrfuuaPCy3AE8Sz1AjdrncKfHjePn5" })
					.reply(200, await require(`../test/fixtures/client/transactions.json`));

				const result = await subject.transactions({
					identifiers: [
						{ type: "address", value: "DBk4cPYpqp7EBcvkstVDpyX7RQJNHxpMg8" },
						{ type: "address", value: "DRwgqrfuuaPCy3AE8Sz1AjdrncKfHjePn5" },
					],
				});

				expect(result).toBeObject();
				expect(result.items()[0]).toBeInstanceOf(ConfirmedTransactionData);
			});

			it("for advanced search", async () => {
				nock(/.+/)
					.get("/api/transactions")
					.query({
						address: "DBk4cPYpqp7EBcvkstVDpyX7RQJNHxpMg8",
						"asset.type": "4",
						"asset.action": "0",
						type: 0,
						typeGroup: 1,
					})
					.reply(200, await require(`../test/fixtures/client/transactions.json`));

				const result = await subject.transactions({
					identifiers: [{ type: "address", value: "DBk4cPYpqp7EBcvkstVDpyX7RQJNHxpMg8" }],
					asset: { type: 4, action: 0 },
					type: "transfer",
				});

				expect(result).toBeObject();
				expect(result.items()[0]).toBeInstanceOf(ConfirmedTransactionData);
			});
		});
	});

	describe("#wallet", () => {
		it("should succeed", async () => {
			nock(/.+/)
				.get("/api/wallets/DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9")
				.reply(200, await require(`../test/fixtures/client/wallet.json`));

			const result = await subject.wallet({
				type: "address",
				value: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
			});

			expect(result).toBeInstanceOf(WalletData);
		});
	});

	describe("#wallets", () => {
		it("should work with Core 2.0", async () => {
			subject = await createService(ClientService, "ark.mainnet", (container) => {
				container.constant(IoC.BindingType.Container, container);
				container.constant(IoC.BindingType.DataTransferObjects, {
					SignedTransactionData,
					ConfirmedTransactionData,
					WalletData,
				});
				container.singleton(
					IoC.BindingType.DataTransferObjectService,
					Services.AbstractDataTransferObjectService,
				);
			});

			nock(/.+/)
				.get("/api/wallets")
				.query({ address: "DBk4cPYpqp7EBcvkstVDpyX7RQJNHxpMg8" })
				.reply(200, await require(`../test/fixtures/client/wallets.json`));

			const result = await subject.wallets({
				identifiers: [{ type: "address", value: "DBk4cPYpqp7EBcvkstVDpyX7RQJNHxpMg8" }],
			});

			expect(result).toBeObject();
			expect(result.items()[0]).toBeInstanceOf(WalletData);
		});

		it("should work with Core 3.0", async () => {
			subject = await createService(ClientService, "ark.devnet", (container) => {
				container.constant(IoC.BindingType.Container, container);
				container.constant(IoC.BindingType.DataTransferObjects, {
					SignedTransactionData,
					ConfirmedTransactionData,
					WalletData,
				});
				container.singleton(
					IoC.BindingType.DataTransferObjectService,
					Services.AbstractDataTransferObjectService,
				);
			});

			nock(/.+/)
				.get("/api/wallets")
				.query({ address: "DBk4cPYpqp7EBcvkstVDpyX7RQJNHxpMg8" })
				.reply(200, await require(`../test/fixtures/client/wallets.json`));

			const result = await subject.wallets({
				identifiers: [{ type: "address", value: "DBk4cPYpqp7EBcvkstVDpyX7RQJNHxpMg8" }],
			});

			expect(result).toBeObject();
			expect(result.items()[0]).toBeInstanceOf(WalletData);
		});
	});

	describe("#delegate", () => {
		it("should succeed", async () => {
			nock(/.+/)
				.get("/api/delegates/arkx")
				.reply(200, await require(`../test/fixtures/client/delegate.json`));

			const result = await subject.delegate("arkx");

			expect(result).toBeInstanceOf(WalletData);
		});
	});

	describe("#delegates", () => {
		it("should succeed", async () => {
			nock(/.+/)
				.get("/api/delegates")
				.reply(200, await require(`../test/fixtures/client/delegates.json`));

			const result = await subject.delegates();

			expect(result).toBeObject();
			expect(result.items()[0]).toBeInstanceOf(WalletData);
		});
	});

	describe("#votes", () => {
		let fixture;

		beforeEach(async () => {
			fixture = await require(`../test/fixtures/client/wallet.json`);
		});

		it("should succeed", async () => {
			nock(/.+/).get("/api/wallets/arkx").reply(200, fixture);

			const result = await subject.votes("arkx");

			expect(result).toBeObject();
			expect(result.used).toBe(1);
			expect(result.available).toBe(0);
			expect(result.votes).toMatchInlineSnapshot(`
			Array [
			  Object {
			    "amount": 0,
			    "id": "03bbfb43ecb5a54a1e227bb37b5812b5321213838d376e2b455b6af78442621dec",
			  },
			]
		`);
		});

		it("should succeed without vote", async () => {
			const fixtureWithoutVote = {
				data: {
					...fixture.data,
					attributes: {
						...fixture.data.attributes,
						vote: undefined,
					},
					vote: undefined,
				},
			};

			nock(/.+/).get("/api/wallets/arkx").reply(200, fixtureWithoutVote);

			const result = await subject.votes("arkx");

			expect(result).toBeObject();
			expect(result.used).toBe(0);
			expect(result.available).toBe(1);
			expect(result.votes).toMatchInlineSnapshot(`Array []`);
		});

		it("should succeed without attributes when no vote", async () => {
			const fixtureWithoutVote = {
				data: {
					...fixture.data,
					attributes: undefined,
					vote: undefined,
				},
			};

			nock(/.+/).get("/api/wallets/arkx").reply(200, fixtureWithoutVote);

			const result = await subject.votes("arkx");

			expect(result).toBeObject();
			expect(result.used).toBe(0);
			expect(result.available).toBe(1);
			expect(result.votes).toMatchInlineSnapshot(`Array []`);
		});

		it("should succeed without attributes", async () => {
			const fixtureWithoutVote = {
				data: {
					...fixture.data,
					attributes: undefined,
				},
			};

			nock(/.+/).get("/api/wallets/arkx").reply(200, fixtureWithoutVote);

			const result = await subject.votes("arkx");

			expect(result).toBeObject();
			expect(result.used).toBe(1);
			expect(result.available).toBe(0);
			expect(result.votes).toMatchInlineSnapshot(`
			Array [
			  Object {
			    "amount": 0,
			    "id": "03bbfb43ecb5a54a1e227bb37b5812b5321213838d376e2b455b6af78442621dec",
			  },
			]
		`);
		});
	});

	describe("#voters", () => {
		it("should succeed", async () => {
			nock(/.+/)
				.get("/api/delegates/arkx/voters")
				.reply(200, await require(`../test/fixtures/client/voters.json`));

			const result = await subject.voters("arkx");

			expect(result).toBeObject();
			expect(result.items()[0]).toBeInstanceOf(WalletData);
		});
	});

	describe("#broadcast", () => {
		let fixture;

		beforeEach(async () => {
			fixture = await require(`../test/fixtures/client/broadcast.json`);
		});

		it("should accept 1 transaction and reject 1 transaction", async () => {
			nock(/.+/).post("/api/transactions").reply(422, fixture);

			const mock = { toBroadcast: () => "" } as SignedTransactionData;
			const result = await subject.broadcast([mock]);

			expect(result).toEqual({
				accepted: ["e4311204acf8a86ba833e494f5292475c6e9e0913fc455a12601b4b6b55818d8"],
				rejected: ["d4cb4edfbd50a5d71d3d190a687145530b73f041c59e2c4137fe8b3d1f970216"],
				errors: {
					d4cb4edfbd50a5d71d3d190a687145530b73f041c59e2c4137fe8b3d1f970216: "Already forged.",
				},
			});
		});

		it("should read errors in non-array format", async () => {
			const errorId = Object.keys(fixture.errors)[0];
			const nonArrayFixture = {
				data: fixture.data,
				errors: { [errorId]: fixture.errors[errorId][0] },
			};

			nock(/.+/).post("/api/transactions").reply(422, nonArrayFixture);

			const mock = { toBroadcast: () => "" } as SignedTransactionData;
			const result = await subject.broadcast([mock]);

			expect(result).toEqual({
				accepted: ["e4311204acf8a86ba833e494f5292475c6e9e0913fc455a12601b4b6b55818d8"],
				rejected: ["d4cb4edfbd50a5d71d3d190a687145530b73f041c59e2c4137fe8b3d1f970216"],
				errors: {
					d4cb4edfbd50a5d71d3d190a687145530b73f041c59e2c4137fe8b3d1f970216: "Already forged.",
				},
			});
		});
	});
});
