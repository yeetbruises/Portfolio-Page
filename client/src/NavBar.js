import styles from "./App.css";

export function NavBar({ prop }) {  
    
    const visible = prop;

    return (
        <div id="slider-parent">
            <div className="slider" id="slider">

            <div className={`bar ${visible}`} id="bar"></div>
            </div>
            <div className="links">
                <div style={{width:'100%'}}>
                    <h2 id="label1" className="un"><a href="#t1" style={{fontSize: '20px'}}>About</a></h2> 
                </div>
                <div style={{width:'100%'}}>
                    <h2 id="label2" className="un"><a href="#t2" style={{fontSize: '20px'}}>School</a></h2> 
                </div>
                <div style={{width:'100%'}}>
                    <h2 id="label3" className="un"><a href="#t3" style={{fontSize: '20px'}}>Work</a></h2> 
                </div>
                <div style={{width:'100%'}}>
                    <h2 id="label4" className="un"><a href="#t4" style={{fontSize: '20px'}}>Projects</a></h2> 
                </div>
                <div style={{width:'100%'}} id="photolink">
                    <h2 className="un"><a href="#t4" style={{fontSize: '20px'}}>Photography</a></h2> 
                </div>
            </div>
        </div>
    );
}

