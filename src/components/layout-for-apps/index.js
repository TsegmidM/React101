import { Button } from "antd";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function PageSharedLayout() {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="flex flex-wrap m-2">
        <Button onClick={() => navigate("")}>HOME</Button>
        <Button onClick={() => navigate("todo-list")}>Todo List</Button>
        <Button onClick={() => navigate("memory-game")}>Memory Game</Button>
        <Button onClick={() => navigate("tictactoe")}>TIC TAC TOE</Button>
        <Button onClick={() => navigate("live-clock")}>Live Clock</Button>
        <Button onClick={() => navigate("airbnb")}>Airbnb Clone</Button>
        <Button onClick={() => navigate("image-slider")}>Image Slider</Button>
        <Button onClick={() => navigate("bmi-finder")}>BMI Finder</Button>
        <Button onClick={() => navigate("color-picker")}>Color Picker</Button>
        <Button onClick={() => navigate("employees")}>Employee List</Button>
        <Button onClick={() => navigate("apiplayground")}>
          Api Playground
        </Button>
        <Button onClick={() => navigate("chucknorrisjokes")}>
          Chuck Norris Jokes
        </Button>
        <Button onClick={() => navigate("fetchgithub")}>Fetch Github</Button>
        <Button onClick={() => navigate("fetchgithubfollowers")}>
          Fetch Github Followers
        </Button>
        <Button onClick={() => navigate("tmdb-clone")}>Tmdb Clone</Button>
        <Button onClick={() => navigate("themechanger")}>Theme Changer</Button>
        <Button onClick={() => navigate("shopping-list")}>Shopping List</Button>
        <Button onClick={() => navigate("kahootclone")}>Kahoot Clone</Button>
        <Button onClick={() => navigate("crudapi")}>Crud Api</Button>
        <Button onClick={() => navigate("Interview2")}>Interview2</Button>
        <Button onClick={() => navigate("Interview1")}>Interview1</Button>
        
      </div>

      <Outlet />
    </div>
  );
}
