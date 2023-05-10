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
    let [popup, setPopup] = useState(false)

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
                    backgroundColor: (percent >= 100 ? "skyblue" : "red"),
                    borderTopRightRadius: (percent >= 200 ? "20px" : "0px"),
                    borderBottomRightRadius: (percent >= 200 ? "20px" : "0px")
                    }}>


                    </div>
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
            if (id == chosen)
            {
                setChosen(0)
                setCost(0)
            }
            else
            {
                setChosen(id)
                setCost(cost)
            }
            
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
                    <Town chosen={chosen} setChosen={setChosen} cost={cost} setCost={setCost} active={!popup}/>
                    <div className="statsViewport">
                        <img className="helpButton" src="/help_outline.svg" onClick={() => {setPopup(true)}}></img>
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
                    <div className="storeOtherOptions">
                        <div className="makeTreeButton">
                        <button 
                            style={{boxShadow: (chosen == 110 || chosen == 111 ? "6px 6px black" : "4px 4px gray")}}
                            onClick={() => {
                                setChosen(chosen == 110 || chosen == 111 ? 0 : 110 + Math.floor(Math.random() * 2))
                                setCost(0)
                                }}>Make Tree</button>
                        
                        </div>
                        <div className="destroyButton">
                            <button 
                            style={{boxShadow: (chosen == -1 ? "6px 6px black" : "4px 4px gray")}}
                            onClick={() => {
                                setChosen(chosen == -1 ? 0 : -1)
                                setCost(0)
                                }}>Destroy Building</button>
                        </div>
                    </div>
                </div>
                </div>
                <Sidebar />
                {popup && <div className="helpPopup">
                    <div className="helpPopupHeader">
                        <p>Welcome to your town!</p>
                        </div>
                    <div className="helpPopupBody">
                        <p>This is your town. You can make buildings to increase your stats and grow your population!</p>
                        <p>First things first, every resident needs a house. Additionally, there are five stats to keep track of: Food, water,
                            education, safety, and happiness. Every resident needs 1 point from each stat. You can increase how many stat points you
                            have for a stat by creating a building that increases that stat. If you have enough stat points for a new resident, one will move in!
                        </p>
                        <p>In order to buy buildings, you need tokens. You earn tokens by completing tasks in your task scheduler. For every fifteen minutes of work
                            you complete, you earn one token times your healthiness score. You can see more information about your tasks and healthiness score in your health scheduler.
                            The more work you do, and the healthier you do it, the faster you can make new buildings
                            to grow your town!
                        </p>
                        <p>Once you buy a building, you'll need to place it down. Find a spot where the building can fit in your town and click on the
                            top left square of where you want to build it. Most buildings are 2 tiles by 2 tiles, so make sure you account for that. You can
                            also destroy a building to make room, but this will lower your stats, and you will NOT be refunded tokens for it.
                        </p>
                        <p>That's pretty much all you need to know! Grow your town and have fun!</p>
                        
                    </div>
                    <div className="helpPopupFooter">
                        <button onClick={() => {setPopup(false)}}>OK</button>
                    </div>
                    
                    </div>}
            </div>
        </>
    );
}