import { FC } from "react";
import { SignMessage } from "../../components/SignMessage";
import { SendTransaction } from "../../components/SendTransaction";
import { SendVersionedTransaction } from "../../components/SendVersionedTransaction";
import { CreatePool } from "components/CreatePool";

export const PoolView: FC = ({}) => {
  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl text-transparent bg-clip-text bg-gradient-to-br bg-orange-500 mb-4 uppercase font-extrabold">
          Pool
        </h1>
        {/* CONTENT GOES HERE */}
        <div className="text-center">
          <CreatePool />
        </div>
      </div>
    </div>
  );
};
