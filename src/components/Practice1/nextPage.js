import { Button } from "antd";

export default function CornTekRedPill({ setShowNext }) {
  return (
    <div className=" flex flex-col w-5/12">
      <div className="flex flex-col mb-2">
        <div className="text-xl font-bold ">Hello Corntek!</div>
        <div className="text-sm">My name is Ziggy M</div>
      </div>
      <div className="bg-white rounded border-2 border-red-500 h-80 w-full">
        <div className="text-3xl flex justify-center w-full h-1/4 items-center bg-black text-white font-light ">
          CERTIK
        </div>
        <div className="flex flex-col p-3">
          <div className="text-xl font-bold">Welcome to Corn Kernel Tech!</div>
          <div className="flex text-lg font-medium ">
            Well not yet, but you're one step closer to becominga CornTek-er and
            learning more about Cor3.
          </div>
          <div className="mt-3 text-lg italic">"Provable trust for all"</div>
        </div>
        <div className="flex mt-7 justify-center">
          <Button
            type="link"
            onClick={() => {
              setShowNext(false);
            }}
            className="rounded-2xl w-60 h-10 text-lg text-blue-400 flex justify-center"
            // style={{ backgroundColor: "#0ea5e9", color: "white" }}
          >
            Actually, nevermind take me back.
          </Button>
        </div>
      </div>
      <div className="text-[10px] italic mt-2">
        *Disclaimer: This is not the real professor Ronghui Gu and is just a fun
        imitation for a technical assessment
      </div>
    </div>
  );
}
