import "./LoginInfo.css"

export default function LoginInfo(props) {
    let bannerHeight = props.bannerHeight;
    const height = screen.height
    console.log(bannerHeight)
    console.log(height)
    const imgHeight = height - bannerHeight;
    return (<>
    <div className="loginInfo">
        <img src= "src/components/Login/assets/loginInfo.png" alt="Login Information" style={{
            height: `calc(100vh - ${bannerHeight}px)`
        }}></img>
    </div>
    </>)
}