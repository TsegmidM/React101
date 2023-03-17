import { Button, Space } from "antd";
import { useEffect, useState } from "react";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import corngreen from "./corngreen.png";
import cornred from "./cornred.png";
import CornTekRedPill from "./nextPage";
import CornTekBLuePill from "./prevPage";

export default function PracticeInt1() {
  const [imgRed, setImgRed] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [showPrev, setShowPrev] = useState(false);
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  return (
    <div className="flex w-screen h-screen justify-center items-center bg-neutral-100">
      {showNext ? (
        <CornTekRedPill setShowNext={setShowNext} />
      ) : showPrev ? (
        <CornTekBLuePill setShowPrev={setShowPrev} startTime={startTime} />
      ) : (
        <div className=" flex flex-col w-5/12">
          <div className="flex flex-col mb-2">
            <div className="text-xl font-bold ">Hello Corntek!</div>
            <div className="text-sm">My name is Ziggy M</div>
          </div>
          <div className="bg-white border border-1  h-80 w-full p-3">
            <div className="flex justify-between">
              <div className="flex p-2">
                <span className="flex">
                  <img src={imgRed ? corngreen : cornred}></img>
                </span>
                <span className="ml-3">
                  <div className="text-lg font-bold">Ronny Who</div>
                  <div className="text-sm">CEO of Cron Kernel Tech</div>
                </span>
              </div>

              <span
                className="m-2 "
                onClick={() => {
                  setImgRed(!imgRed);
                }}
              >
                {!imgRed ? (
                  <FaHeartBroken color="red" />
                ) : (
                  <FaHeart color="red" />
                )}
              </span>
            </div>
            <Space size={20} direction="vertical" className="p-3">
              <div
                className="rounded-md bg-gray-200 text-sm p-2"
                style={{ display: "inline-block" }}
              >
                Welcome to the future of the corn3 Security
              </div>
              <div className="rounded-md bg-gray-200 tex-sm p-2">
                Do you wish to go down the rabbit hole of Corn3 with Corn Kernel
                Tech or stay within your own metaverse that is reality?
              </div>
            </Space>
            <div className="flex mt-5 justify-around ">
              <Button
                className="rounded-2xl w-60 h-10 text-lg"
                style={{ backgroundColor: "#0ea5e9", color: "white" }}
                onClick={() => {
                  setShowPrev(true);
                }}
              >
                Uhh.. no.
              </Button>
              <Button
                className="rounded-2xl w-60 h-10 text-lg "
                style={{ backgroundColor: "#ef4444", color: "white" }}
                onClick={() => {
                  setShowNext(true);
                }}
              >
                Let's Go
              </Button>
            </div>
          </div>
          <div className="text-[10px] italic mt-2">
            *Disclaimer: This is not the real professor Ronghui Gu and is just a
            fun imitation for a technical assessment
          </div>
        </div>
      )}
    </div>
  );
}
