import { useEffect, useState } from "react";

export default function useCounter(initValue = 0) {
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    setValue(initValue);
  }, []);

  const incrementValue = () => setValue((currState) => currState + 1);

  const decrementValue = () => setValue((currState) => currState - 1);

  return [value, incrementValue, decrementValue];
}
export const useNumberValidator = (initValue) => {
  const [zipData, setZipData] = useState(initValue);

  useEffect(() => {
    setZipData(initValue);
  }, []);
  const changeZip = (zip) => {
    const regPattern = /^[0-9]*$/;
    if (regPattern.test(zip)) {
      setZipData(zip);
    } else {
      window.alert("MUST BE NUMBERS!");
    }
  };
  return [zipData, changeZip];
};
