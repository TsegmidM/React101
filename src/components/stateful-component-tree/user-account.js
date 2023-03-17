import { useContext } from "react";
import { NameContext } from ".";

export default function TreeContentChild2() {
  const { fullName } = useContext(NameContext);
  return (
    <div>
      {fullName.firstName} {fullName.lastName}
    </div>
  );
}
