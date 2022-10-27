import React from "react";
import "./App.css";
// import CarOwners from "./car-owner/carOwner";
// import TodoList from "./todo-list/todo-list";
import HouseListing from "./components/airbnb/house-info";
import DemoUseState from "./components/useState-demo";
import DemoUseStateObj from "./components/useState-demo/object-example";
import FireworkState from "./components/useState-demo/fireworks";
import CounterComp from "./components/useState-demo/counter";
import StatusPicker from "./components/useState-demo/status-picker/statusPicker";
import LanguagePicker from "./components/useState-demo/language-picker/languagePicker";
import Name from "./components/props-demo/name-field";
import ProfileInfo from "./components/props-demo/profile-card/profile-info";
import Star from "./components/props-demo/star-rating/star";
import DestructingJson from "./components/destructuringJson/destructuringJson";

function App() {
  return (
    <div className="App">
      {/* {<CarOwners/>} */}
      {/* {<TodoList/>} */}
      {/* {<HouseListing/>} */}
      {/* <DemoUseStateObj/> */}
      {/* <FireworkState/> */}
      {/* <CounterComp/> */}
      {/* <StatusPicker/> */}
      {/* <LanguagePicker/> */}
      {/* <Name/> */}
      {/* <ProfileInfo/> */}
      <Star/>
      {/* <DestructingJson/> */}
    </div>
  );
}

export default App;
