import { Button } from "antd";
import { useEffect, useState } from "react";

export default function CornTekBLuePill({ setShowPrev, startTime }) {
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    setTimeSpent((Date.now() - startTime) / 1000);
  }, []);

  return (
    <div className=" flex flex-col w-5/12">
      <div className="flex flex-col mb-2">
        <div className="text-xl font-bold ">Hello Corntek!</div>
        <div className="text-sm">My name is Ziggy M</div>
      </div>
      <div className="bg-blue-400 rounded h-80 w-full text-white">
        <div className="flex flex-col p-3">
          <div className="text-xl mb-2">
            It took you <span className="font-bold">{timeSpent} seconds</span>{" "}
            to say no?
          </div>
          <div className="flex text-xl w-9/12 ">
            Well you worked, had a happy family, went on vacations, and died
            surrounded by everyone you love in your fake "reality"...
          </div>
          <div className="mt-3 text-xl ">Wait, that doesnt sound so bad?</div>
          <div className="mt-3 text-xl ">
            But there's a lingering uneasiness...
          </div>
        </div>
        <div className="flex mt-7 justify-center">
          <Button
            // type="primary"
            onClick={() => {
              setShowPrev(false);
            }}
            className="rounded-2xl w-11/12 h-14 text-xl font-medium bg-white text-black flex justify-center items-center"
            // style={{ backgroundColor: "#0ea5e9", color: "white" }}
          >
            I'm unsatisfied, let's try again
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
