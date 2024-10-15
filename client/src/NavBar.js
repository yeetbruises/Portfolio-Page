import styles from "./App.css";

export function NavBar({ prop }) {  
    
    const visible = prop;

    return (
        <div id="slider-parent">
            <div className="slider" id="slider">

            <div className={`bar ${visible}`} id="bar"></div>
            </div>
            <div className="links">
                <div id="btn1" className="link">
                    <h2 id="label1" className="un"><a href="#t1">About</a></h2> 
                </div>
                <div id="btn2" className="link">
                    <h2 id="label2" className="un"><a href="#t2">Projects</a></h2> 
                </div>
                <div id="btn3" className="link">
                    <h2 id="label3" className="un"><a href="#t3">Experience</a></h2> 
                </div>
            </div>
        </div>
    );
}