import { createContext } from "react";
import { useState } from "react";
import { FaAlipay } from "react-icons/fa";
import TreeContent from "./content";
import TreeFooter from "./footer";
import TreeHeader from "./header";

export const NameContext = createContext();
export default function TreeComponent() {
  const [firstName, setFirstName] = useState("Ziggy");
  const [lastName, setLastName] = useState("MN");
  const [fullName, setFullName] = useState({firstName:"Ziggy",lastName:"MN", alias:""});

  return (
    <NameContext.Provider value={{ fullName,setFullName}}>
      <div>
        <TreeHeader />
        <TreeContent />
        <TreeFooter />
      </div>
    </NameContext.Provider>
  );
}
