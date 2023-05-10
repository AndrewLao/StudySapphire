import { useState, useEffect, useRef, useContext, useLayoutEffect } from "react";
import { UserContext } from "../../App";
// import GameNavbar from "./GameNavBar";
import IDtoObject from "./IDtoObject";
import Banner from "../Banner";
import "./Game.css";
import Sidebar from "../Sidebar";
import Town from "./Town";


export default function Game({ getUserData, postUserData }) {

    const canvasRef = useRef();
    const { userData, setUserData } = useContext(UserContext);
    const [mousePos, setMousePos] = useState({});
    const [relMousePos, setRelMousePos] = useState({ x: 0, y: 0 })
    const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })

    const [chosen, setChosen] = useState(0)
    const [cost, setCost] = useState(0)

    const [food, setFood] = useState(0)
    const [water, setWater] = useState(0)
    const [education, setEducation] = useState(0)
    const [safety, setSafety] = useState(0)
    const [happiness, setHappiness] = useState(0)
    const [capacity, setCapacity] = useState(0)
    const [houses, setHouses] = useState(0)

    let [tileSize, setTileSize] = useState(0)

    useEffect(() => {
        getUserData();
    }, []);

    useEffect(() => {
        if (userData)
        {
            postUserData();
            console.log("saved user data as");
            console.log(userData);
        }
        
    }, [userData]);

    useEffect(() => {
        calculateStats();
    }, [userData])

    function calculateStats() {
        if (!userData)
        {
            return
        }
            
        let buildings = {
            50: 0,
            60: 0,
            70: 0,
            80: 0,
            90: 0,
            100: 0
        }
        userData.TOWN.MAP.forEach((row) => {
            row.forEach(tile => {
                if ([50, 60, 70, 80, 90, 100].includes(tile))
                    buildings[tile] += 1
            })
        })
        console.log(buildings)
        let houses = buildings[50]
        let bakeries = buildings[60]
        let blacksmiths = buildings[70]
        let farms = buildings[80]
        let schools = buildings[90]
        let wells = buildings[100]
        let newFood = (2 * farms) + bakeries + 2
        let newWater = (3 * wells + 2)
        let newEducation = (4 * schools + 2)
        let newSafety = (4 * blacksmiths + 2)
        let newHappiness = ((2 * bakeries) + schools + 2)
        let newCapacity = houses
        let population = userData.TOWN.POPULATION
        console.log(newFood, newWater, newEducation, newSafety, newHappiness, newCapacity)
        if (Math.min(newFood, newWater, newEducation, newSafety, newHappiness, newCapacity) > population)
        {
            population += 1
            let userCopy = JSON.parse(JSON.stringify(userData))
            userCopy.TOWN.POPULATION = population
            setUserData(userCopy)
        }
        setFood((newFood / population) * 100)
        setWater((newWater / population) * 100)
        setEducation((newEducation/ population) * 100)
        setSafety((newSafety / population) * 100)
        setHappiness((newHappiness / population) * 100)
        setCapacity((newCapacity / population) * 100)
        setHouses(newCapacity)
    }


    function ProgressBar({name, percent})
    {
    return (
        <div>
            <div className="progressBar">
                <div style={{marginTop:"0.15em"}}>{name}</div>
                
                <div className="barHolder">
                    <div className="ticks">
                        <div></div><div></div><div></div>
                    </div>
                    <div className="barProgress" 
                    style={{width: (percent / 2) + "%", 
                    backgroundColor: (percent >= 100 ? "skyblue" : "red")}}></div>
                </div>
                <div></div>
                <div className="percents">
                    <div>33%</div>
                    <div>100%</div>
                    <div>166%</div>
                </div>
            </div>
        </div>
    )
    }

    function BuyButton({id, cost})
    {
    if (!userData)
        return (<></>)
    if (userData.TOKENS < cost)
    {
        return ( <button className="cantBuyButton">Buy</button>)
    }
    return (
        <button className="buyButton" onClick={() => {
            setChosen(id)
            setCost(cost)
        }}>Buy</button>
    )
    }

    function StoreCard({name, imgname, id, tokens, stats})
    {
        return ( <div className="storeCard" style={{boxShadow: (chosen == id ? "6px 6px black" : "4px 4px gray")}}>
            <div className="storeCardTop">
                <p>{name}</p>
                
                <div className="tokenPrice">
                    {tokens}
                    <img src={"coin.svg"} />
                </div>
            </div>
            <div className="storeCardDescription">
            <img src={"src/components/Game/game-assets/buildings/" + imgname + ".png"} />
                {stats.map((stat) => {
                    return (<p>{stat}</p>)
                })}
            </div>
            <div className="storeCardBuy">
                <BuyButton id={id} cost={tokens} />
            </div>
        </div>)
    }

    return (
        <>
            <div className="game-wrapper-div">
                <Banner tokens={userData ? userData.TOKENS : 100}/>
                <div className="gameViewport">
                <div className="gameAndStats">
                    <Town chosen={chosen} setChosen={setChosen} cost={cost} setCost={setCost}/>
                    <div className="statsViewport">
                        <p className="importantStat">Stats</p>
                        <ProgressBar name={"Food:"} percent={food} />
                        <ProgressBar name={"Water:"} percent={water} />
                        <ProgressBar name={"Education:"} percent={education} />
                        <ProgressBar name={"Safety:"} percent={safety} />
                        <ProgressBar name={"Happiness:"} percent={happiness} />
                        <p className="importantStat">Population: {userData ? userData.TOWN.POPULATION : 0} / {houses}</p>
                    </div>
                </div>
                <div></div>
                <div className="storeViewport">
                    <StoreCard name={"House"} imgname={"house"} id={50} tokens={10} stats={["+1 Capacity"]} />
                    <StoreCard name={"Farm"} imgname={"farm"} id={80} tokens={10} stats={["+2 Food"]} />
                    <StoreCard name={"Well"} imgname={"well"} id={100} tokens={5} stats={["+3 Water"]} />
                    <StoreCard name={"Bakery"} imgname={"bakery"} id={60} tokens={15} stats={["+2 Happiness", "+1 Food"]} />
                    <StoreCard name={"School"} imgname={"school"} id={90} tokens={20} stats={["+4 Education", "+1 Happiness"]} />
                    <StoreCard name={"Blacksmith"} imgname={"blacksmith"} id={70} tokens={20} stats={["+4 Safety"]} />
                    <div className="destroyButton">
                        <button 
                        style={{boxShadow: (chosen == -1 ? "6px 6px black" : "4px 4px gray")}}
                        onClick={() => {setChosen(-1)}}>Destroy Building</button>
                    </div>
                </div>
                </div>
                
                <Sidebar />
            </div>
        </>
    );
}