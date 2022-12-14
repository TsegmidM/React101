import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react"
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";

const ChangeThemeContext = createContext();

export default function ThemeChanger(){
    const [isDark,setIsDark] = useState(false);

    return(
        <ChangeThemeContext.Provider value={{isDark,setIsDark}}>
        <div style={{display:"flex",alignItems:"center"}}>
            <RandomParagraph/>
            <ThemeButton/>
        </div>
        </ChangeThemeContext.Provider>
    )
}
const RandomParagraph = () => {
    const { isDark} = useContext(ChangeThemeContext)
    const [paragraphs,setParagraphs] = useState();
    useEffect(()=>{
randomPara();
    },[])
    const randomPara = () =>{
    axios
    .get('http://metaphorpsum.com/paragraphs/4')
    .then((res) => {
        if (res.status === 200) {
            console.log(res.data)
          setParagraphs(res.data);
        }
      })
      .catch((err) => {
        if (err.status === 404) {
          console.error("Either your endpoint is wrong or no data found!");
        }
      })
      .finally((finallyP) => {
        console.log("request is completed!", finallyP);
      });
    }
    return(
        <div style={{color: isDark ? "white" : "black", backgroundColor: isDark ? "#121212" : "white"}} >
          {paragraphs}
        </div>
    )

}
const ThemeButton = () =>{
    const { isDark, setIsDark } = useContext(ChangeThemeContext)
    return(
        <div>
            <button onClick={()=>{
                setIsDark(!isDark);
            }}>
                {isDark ? <MdDarkMode/> : <MdOutlineDarkMode/>}
            </button>
        </div>
    )

}