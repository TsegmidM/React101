import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
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
import MemoryGame from "./components/memory-game";
import ToDoListV3 from "./components/todolist-v2/todolist";
import LiveClock from "./components/live-clock";
import TicTacToe2 from "./components/tictactoe/tictactoe2";
import EmployeeListCrud from "./components/employee-list-crud";
import Page1 from "./components/router-playground/page1";
import Page2 from "./components/router-playground/page2";
import Page3 from "./components/router-playground/page3";
import PageSharedLayout from "./components/layout-for-apps";
import ImageSlider from "./components/image-slider";
import BMITracker from "./components/BMI";
import ColorPicker from "./components/color-picker";
import ColorPicker2 from "./components/color-picker/index2";
import { EmployeeDetails } from "./components/employee-list-crud/emp-detail";
import ApiCallPlayground from "./components/api-call-playground";
import ChuchNorrisJokes from "./components/fetch-jokes";
import FetchGithub from "./components/fetch-github";
import FetchGithubFollowers from "./components/fetch-github-followers";
import FetchedFollowerDetails from "./components/fetch-github-followers/followers-detail";
import MovieDetails from "./components/tmdb-clone";
import CoinCapClone from "./components/coincap-clone";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/React101" element={<PageSharedLayout />}>
            <Route index element={<LiveClock />} />
            <Route path="employees">
              <Route index element={<EmployeeListCrud />} />
              <Route path=":employeeId" element={<EmployeeDetails />} />
            </Route>
            <Route path="todo-list" element={<ToDoListV3 />} />
            <Route path="memory-game" element={<MemoryGame />} />
            <Route path="tictactoe" element={<TicTacToe2 />} />
            <Route path="live-clock" element={<LiveClock />} />
            <Route path="airbnb" element={<HouseListing />} />
            <Route path="image-slider" element={<ImageSlider />} />
            <Route path="bmi-finder" element={<BMITracker />} />
            <Route path="memory-game" element={<MemoryGame />} />
            <Route path="color-picker" element={<ColorPicker />} />
            <Route path="color-picker2" element={<ColorPicker2 />} />
            <Route path="apiplayground" element={<ApiCallPlayground/>} />
            <Route path="chucknorrisjokes" element={<ChuchNorrisJokes/>} />
            <Route path="fetchgithub" element={<FetchGithub/>} />
            <Route path="tmdb-clone" element={<MovieDetails/>} />
            <Route path="coincap-clone" element={<CoinCapClone/>} />

            <Route path="fetchgithubfollowers" > 
            <Route index element={<FetchGithubFollowers/>}/>
            <Route path=":githubfollowersname" element={<FetchedFollowerDetails/>}/>
            </Route>
            
            <Route path="*" element={"404 Error"} />
          </Route>
        </Routes>
      </BrowserRouter>

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
      {/* <Star/> */}
      {/* <DestructingJson/> */}
      {/* <TicTacToe/> */}
      {/* <MemoryGame/> */}
      {/* <ToDoListV3/> */}
      {/* <LiveClock/> */}
      {/* <TicTacToe2/> */}
      {/* <EmployeeListCrud/> */}
    </div>
  );
}

export default App;
