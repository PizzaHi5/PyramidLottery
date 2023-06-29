import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  Account,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  TransactionMessage,
  TransactionSignature,
  VersionedTransaction,
} from "@solana/web3.js";
import { FC, useCallback, useState } from "react";
import { notify } from "../utils/notifications";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { Lottery, IDL } from "../idl/lottery";
import { getUserBalance } from "utils";

export const CreatePool: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [accounts, setAccounts] = useState({});

  const anchorWallet = useAnchorWallet();
  const anchorProvider = new AnchorProvider(connection, anchorWallet, {});

  // const programId = new PublicKey(""); // Enter de Id
  // const program = new Program<Lottery>(IDL, programId);

  const createAccount = useCallback(async () => {
    // Create Accounts
    const lottery = new Account();
    const lottery_admin = new Account();
    const player1 = new Account();
    const player2 = new Account();
    const skintPlayer3 = new Account();
    const oracle = new Account();

    console.log(
      lottery.publicKey,
      lottery_admin.publicKey,
      player1.publicKey,
      player2.publicKey,
      skintPlayer3.publicKey,
      oracle.publicKey
    );
    setAccounts({
      ...accounts,
      lottery,
      lottery_admin,
      player1,
      player2,
      skintPlayer3,
      oracle,
    });

    // We need to have 6 accounts with balance

    // await anchorProvider.connection.confirmTransaction(
    //   await anchorProvider.connection.requestAirdrop(
    //     player1.publicKey,
    //     1 * LAMPORTS_PER_SOL
    //   )
    // );

    // await anchorProvider.connection.confirmTransaction(
    //   await anchorProvider.connection.requestAirdrop(
    //     player1.publicKey,
    //     1 * LAMPORTS_PER_SOL
    //   )
    // );
    // await anchorProvider.connection.confirmTransaction(
    //   await anchorProvider.connection.requestAirdrop(
    //     lottery_admin.publicKey,
    //     1 * LAMPORTS_PER_SOL
    //   )
    // );
    // await anchorProvider.connection.confirmTransaction(
    //   await anchorProvider.connection.requestAirdrop(
    //     skintPlayer3.publicKey,
    //     0.4 * LAMPORTS_PER_SOL
    //   )
    // );

    // Object.keys(accounts).map((element) => {
    //   console.log(
    //     "balances",
    //     getUserBalance(accounts[element].publicKey, connection)
    //   );
    // });

    const player1Balance = await getUserBalance(player1.publicKey, connection);
    console.log("player1Blaance", player1Balance);

    console.log("accounts", accounts);
  }, [accounts]);

  const onClick = useCallback(async () => {
    if (!publicKey) {
      notify({ type: "error", message: `Wallet not connected!` });
      console.log("error", `Send Transaction: Wallet not connected!`);
      return;
    }

    let signature: TransactionSignature = "";
    try {
      // Create instructions to send, in this case a simple transfer
      const instructions: TransactionInstruction[] = [];

      // const lottery_admin = anchor.web3.Keypair.generate();

      // Logic here
      // program.methods.initialiseLottery({
      //   name: "test",
      //   ticketPrice: new BN(100)
      // })

      // Get the lates block hash to use on our transaction and confirmation
      let latestBlockhash = await connection.getLatestBlockhash();

      // Create a new TransactionMessage with version and compile it to legacy
      const messageLegacy = new TransactionMessage({
        payerKey: publicKey,
        recentBlockhash: latestBlockhash.blockhash,
        instructions,
      }).compileToLegacyMessage();

      // Create a new VersionedTransacction which supports legacy and v0
      const transation = new VersionedTransaction(messageLegacy);

      // Send transaction and await for signature
      signature = await sendTransaction(transation, connection);

      // Send transaction and await for signature
      await connection.confirmTransaction(
        { signature, ...latestBlockhash },
        "confirmed"
      );

      console.log(signature);
      notify({
        type: "success",
        message: "Transaction successful!",
        txid: signature,
      });
    } catch (error: any) {
      notify({
        type: "error",
        message: `Transaction failed!`,
        description: error?.message,
        txid: signature,
      });
      console.log("error", `Transaction failed! ${error?.message}`, signature);
      return;
    }
  }, [publicKey, notify, connection, sendTransaction]);

  return (
    <>
      <div className="flex justify-center flex-col">
        <div className="relative group items-center">
          <div
            className="m-1 absolute -inset-0.5 bg-gradient-to-r bg-orange-500
                rounded-lg blur opacity-10 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"
          ></div>
          <button
            className="group w-60 m-2 btn animate-pulse bg-gradient-to-br bg-orange-500 text-black"
            onClick={createAccount}
            disabled={!publicKey}
          >
            <div className="hidden group-disabled:block ">
              Wallet not connected
            </div>
            <span className="block group-disabled:hidden">
              Create initial Accounts
            </span>
          </button>
          {/* <button
          className="group w-60 m-2 btn animate-pulse bg-gradient-to-br bg-orange-500 hover:from-white hover:to-orange-300 text-black"
          onClick={onClick}
          disabled={!publicKey}
          >
          <div className="hidden group-disabled:block ">
          Wallet not connected
          </div>
          <span className="block group-disabled:hidden">Send Transaction</span>
        </button> */}
        </div>
      </div>
      <div>
        Initial accounts:
        {Object.keys.length > 0 ? (
          Object.keys(accounts).map((element, index) => (
            <p key={index}>
              {element}: {accounts[element]._publicKey}
            </p>
          ))
        ) : (
          <span>No accounts</span>
        )}
      </div>
    </>
  );
};
