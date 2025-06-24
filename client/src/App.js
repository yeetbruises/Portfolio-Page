import './App.css';
import React from "react";
import { Helmet } from "react-helmet";
import { NavBar } from "./NavBar.js";
import { useInView } from "react-intersection-observer";
import { useRef, useEffect, useState } from "react";
import resized from './layout.js';
import HoverEffect from "./HoverEffect";
import { motion } from "framer-motion";



function App() {
    const [hovered, setHovered] = useState(false);

const { ref: myRef1, inView: obj, entry} = useInView();
const { ref: myRef2, inView: obj2, entry2} = useInView();
const { ref: myRef3, inView: obj3, entry3} = useInView();
const { ref: myRef4, inView: obj4, entry4} = useInView();

var classes = obj === true 
        ? "slider-anim-0" 
        : (obj2 === true 
        ? "slider-anim-50" 
        : (obj3 === true 
        ? "slider-anim-100" 
        : (obj4 === true 
        ? "slider-anim-150"
        : "")));

const [theme, setTheme] = useState('dark');

const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
};

const [backendData, setBackendData] = useState([{}])

useEffect(() => {
    fetch("/api").then(
    response => response.json()
    ).then(
    data => (
        setBackendData(data)
    )
    )
}, [])

const boxStyle = {
    background: `linear-gradient(to right top, rgba(0, 63, 122, 0.8), rgba(0, 0, 0, 0.5))`
}

resized();


// inspo: https://www.pranavkonjeti.com/

/*<button onClick={toggleTheme}>
    Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
</button>*/

return (
    <div className={`App ${theme}`}>
        
        <Helmet>
            <meta charset="UTF-8" />
            <script src="./layout.js"></script>
            <script src="./script.js"></script>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Exo+2&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Exo+2&display=swap" rel="stylesheet" />      
            <title>Portfolio Page</title>
            <link rel="stylesheet" href="./style.css" />
        </Helmet>
        <main>
            <section className={`glass ${theme}`} style={{border: '0.2px solid skyblue', height: '360px'}}>
                <div className={`dashboard ${theme}`}>
                    <div className="user">
                        <img src="images/favicon.png" />
                    </div>
                    <NavBar prop={classes} />
                    
                </div>
                <div id="div0" className="section" style={{ height: '100%', overflowY: 'auto'}}>
                    <div id="t1" ref={myRef1} style={{opacity: obj === true ? 1 : 0}}>
                        <div className="cards" style={{alignItems: 'center', display: 'flex', justifyContent: 'center'}}>
                            
                            <HoverEffect theme={theme} id="intoCard">
                                <div className='intro' style={{ display: 'inline-flex', margin: 'auto' }}>
                                    <img style={{alignSelf: "center"}} className='rotate-2' src="images/IMG_4549.webp" />
                                    <div id='nameDiv' style={{ margin: 'auto', marginLeft: '3em' }}>
                                        <h1 className={`${theme}`} style={{ paddingBottom: '10px' }}>Vineet Saraf</h1>
                                        <p className={`${theme}`}>
                                            Hello! My name is Vineet Saraf and I'm an interning software engineer at LPL Financial. 
                                            I graduated from Clemson University very recently and I am currently pursuing a Masters degree in computer science. 
                                        </p>
                                        <br/>
                                        <p>
                                        This site showcases some of my 
                                        work. I have a passion for full-stack web development, creative data visuals, and AI. 
                                        </p>
                                        
                                        <div className='tools' style={{ marginTop: '10px' }}>
                                            <a href='https://www.linkedin.com/in/vineet-saraf'>
                                                <img src="https://camo.githubusercontent.com/8c0692475a5bfc1d9e7361074bdb648e567cae7b5b40ffd32adae31180b0d7b6/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c696e6b6564496e2d3030373742353f7374796c653d666f722d7468652d6261646765266c6f676f3d6c696e6b6564696e266c6f676f436f6c6f723d7768697465" />
                                            </a>
                                            <a href='https://github.com/yeetbruises'>
                                                <img src="https://camo.githubusercontent.com/17a3cfebe6cf2dcf7b339b7b008adb9a55ddc15aec622a27a2a66b207e1e357a/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4769744875622d3130303030303f7374796c653d666f722d7468652d6261646765266c6f676f3d676974687562266c6f676f436f6c6f723d7768697465" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </HoverEffect>


                        </div>
                    </div>
                    
                    <div id="t2" ref={myRef2}>
                        <div className="status">
                            <h1 className={`${theme}`}>Education</h1>
                        </div>
                        <div className="cards">
                            <HoverEffect theme={theme} id="msCard">
                                <div>
                                    <div className="card-info" style={{width:"100%"}}>
                                        <div style={{ display: 'flex'}}>
                                            <img style={{width: "5rem", height: "min-content"}} src="images/gt.png" alt="Georgia Tech Logo"/>
                                            <div style={{paddingLeft:"2%", marginTop:"auto", marginBottom:"auto"}}>
                                                <h2 className={`${theme}`}>Georgia Institute of Technology</h2>
                                                <p style={{color:"white"}}>Masters of Science in Computer Science</p>
                                            </div>
                                        </div>
                                        <p className={`${theme}`}></p>
                                        <p><b>GPA: x.xx</b></p>
                                        <p>Incoming Masters student at Georgia Tech for Computer Science!</p>
                                        <br/>
                                        <div class="showcase">
                                        </div>
                                    </div>
                                </div>
                            </HoverEffect>
                            <HoverEffect theme={theme} id="eduCard">

                                <div>
                                    <div className="card-info">
                                        <div style={{ display: 'flex'}}>
                                            <img style={{width: "5rem", height: "min-content"}} src="images/clem.png" alt="Georgia Tech Logo"/>
                                            <div style={{paddingLeft:"2%", marginTop:"auto", marginBottom:"auto"}}>
                                                <h2 className={`${theme}`}>Clemson University</h2>
                                                <p style={{color:"white"}}>Bachelor of Science in Computer Science, Mathematics Minor </p>
                                            </div>
                                        </div>
                                        <p className={`${theme}`}></p>
                                        <p><b>GPA: 3.55</b> — (1x) President’s List, (4x) Dean’s List</p>
                                        <p><b>Academic Honors:</b> UPE–Upsilon Pi Epsilon | Palmetto Fellows Scholarship, SC Life Scholarship</p>
                                        <p><b>Relevant Coursework:</b> Reinforcement Learning, Linear Algebra, Machine Learning, Data Science, Networking, Software
                                        Engineering, Databases, Data Structures, Computer Architecture, Operating Systems, Differential Equations</p>
                                        <br/>
                                        <div class="showcase">
                                        </div>
                                    </div>
                                </div>
                            </HoverEffect>
                        </div>
                    </div>
                    <div id="t3" ref={myRef3}>
                        <div className="status">
                            <h1 className={`${theme}`}>Experience</h1>
                        </div>
                        <p className={`${theme}`} id="3"></p>
                        <div className="cards">
                            {/* LPL Financial */}
                            <HoverEffect theme={theme}>
                                <div className="card-info">
                                    <div style={{textAlign: 'center'}}>
                                        <img src="/images/LPL.png" alt="LPL Financial Logo" style={{ width: '45%' }} />
                                    </div>
                                    <h2 className={`${theme}`}>Software Engineering Intern</h2>
                                    <p className={`${theme}`}>June 2025 - Present</p>
                                    <p className={`${theme}`}>I am an incoming summer intern at LPL Financial.</p>
                                </div>
                            </HoverEffect>

                            {/* Capstone */}
                            <HoverEffect theme={theme}>
                                <div className="card-info">
                                    <div style={{textAlign: 'center'}}>
                                        <img src="/images/arc.png" alt="Arccos Golf Logo" style={{ width: '45%' }} />
                                    </div>
                                    <h2 className={`${theme}`}>Arccos Golf - University Senior Design Capstone Program</h2>
                                    <p className={`${theme}`}>August 2024 - December 2024</p>
                                    <p className={`${theme}`}>As part of the university senior design capstone program, I am creating a custom AI segmentation model from the ground up. This project leverages machine learning to optimize map feature segmentation, aiming to improve user experience by filtering out inaccurate data from the Arccos Golf app. My work involves processing extensive USGS datasets in Python and training deep learning AI models to effectively create segments in GIS software.</p>
                                </div>
                            </HoverEffect>

                            {/* JR Automation Experience Card */}
                            <HoverEffect theme={theme}>

                                <div className="card-info">
                                    <div style={{textAlign: 'center'}}>
                                        <img src="/images/jrautologo.png" alt="JR Automation"/>
                                    </div>
                                    <h2 className={`${theme}`}>Software Engineering Intern</h2>
                                    <p className={`${theme}`}>Summer 2023 and Summer 2024 (May to August)</p>
                                    <p className={`${theme}`}>During my internship at JR Automation, I gained practical experience in software engineering. I created a full-stack web application using C# frameworks to fetch and display data, utilizing various JavaScript libraries. I designed and developed APIs and wrote LINQ queries to navigate SQL databases in C#. My role involved managing tasks and creating issues on DevOps, where I applied Agile methodologies to efficiently complete work assignments.</p>
                                    <br/>
                                    <p className={`${theme}`}>I also troubleshot an internal employee data management system in C# to prevent data loss. Throughout the internship, I focused on developing a responsive front-end using CSS flexbox, ensuring optimal performance on different devices. I integrated DataTables.js for dynamic tables and Chart.js for visual data representations. JavaScript played a significant role in handling real-time data updates, making the user experience more interactive. By the end of the summer, I successfully refined the project into a fully functional product through Agile iterations and the usage of Azure DevOps.</p>
                                </div>
                            </HoverEffect>

                            {/* Creative Inquiry Experience Card */}
                            <HoverEffect theme={theme}>                             
                                <div className="card-info">
                                    <div style={{textAlign: 'center'}}>
                                        <img src="/images/creativeinquirylogo.png" alt="Creative Inquiry Program Logo" className="card-logo" />
                                    </div>
                                    <h2 className={`${theme}`}>Undergraduate Researcher with Watt AI</h2>
                                    <p className={`${theme}`}>August 2024 - May 2025</p>
                                    <p className={`${theme}`}>As a member of a collaborative team with Dr. Carl Ehrett, I am involved in training a large language model (LLM) to analyze social media posts and extract frames. We utilize LabelBox for the labeling process and Trello to manage our tasks, which includes providing weekly data analyses supported by Pandas and Matplotlib. This project aims to fine-tune an LLM for the automatic extraction of frames from social media content, specifically leveraging data from Twitter and YouTube. The model's performance is evaluated by comparing its outputs against human-labeled frames, ultimately striving to create AI-powered tools for enhanced frame extraction and analysis in social media contexts.</p>
                                </div>
                            </HoverEffect>

                        </div>   
                    </div>

                    <div id="t4" ref={myRef4}>
                        <div className="status">
                            <h1 className={`${theme}`}>Projects</h1>
                        </div>
                        <div className="cards">
                            <HoverEffect theme={theme}>
                                <div className="card-info">
                                    <h2 className={`${theme}`} >Hurricane Helene Power Outage Visual</h2>
                                    <p className={`${theme}`}>
                                        This project was developed in Python using various packages like 
                                        Selenium, GeoPandas, and Shapely. I completed it over the span of 24 hours. 
                                        It started when I came across an interesting data source on USAToday's 
                                        website and built a Selenium scraper to compile the data into a CSV file. 
                                        Using Pandas, I processed the CSV and linked the county names to a shapefile of U.S. 
                                        counties. To achieve this, I converted the county names to FIPS IDs, which the 
                                        shapefile used. The final output was displayed using Matplotlib, resulting in an 
                                        automated system for data collection and visualization.
                                    </p>
                                    <br/>
                                    <p className={`${theme}`}>
                                    <a href="https://github.com/yeetbruises/Hurricane-Helene-Power-Outage-Visual/tree/main"  target="_blank"> 
                                        Click for Repo  
                                    </a>
                                    </p>
                                    <br/>
                                    <div class="showcase">
                                        <img src="/images/hurricane.gif" alt="Hurricane Helene Power Outage Visual" />
                                    </div>
                                    <div class='tools'>
                                        <img src="/images/badges/python.svg" />
                                        <img src="/images/badges/selenium.svg" />
                                        <img src="/images/badges/qgis.svg" />
                                    </div>
                                </div>

                            </HoverEffect>

                            {/* Geoguessr on Discord */}
                            <HoverEffect theme={theme}>
                                <div className="card-info">
                                    <h2 className={`${theme}`}>Geoguessr on Discord</h2>
                                    <p className={`${theme}`}>
                                        Developed a multiplayer game in Python using the Discord.py library and the Google 
                                        Streetview API. This project employs the MVC design pattern and effective API design. 
                                        I successfully published the game and had it merged into an existing Discord bot that 
                                        services over 2000 users on a university server. Additionally, I created GeoJSON maps 
                                        in QGIS software, which were used to fine-tune potential player locations within the game.
                                    </p>
                                    <br/>
                                    <p>
                                        Coming soon, I will be adding a live demo of the game to this site!
                                    </p>
                                    <p className={`${theme}`}>
                                    <a href="https://github.com/yeetbruises/GeoGuessrImplementation"  target="_blank"> 
                                        Click for Repo  
                                    </a>
                                    </p>
                                    <br/>
                                    <div class="showcase">
                                        <img src="/images/gg.png" alt="Geoguessr on Discord"></img>
                                    </div>
                                    <div class='tools'>
                                        <img src="/images/badges/discord.svg" />
                                        <img src="/images/badges/python.svg" />
                                        <img src="/images/badges/googlecloud.svg" />
                                        <img src="/images/badges/qgis.svg" />
                                        <img src="/images/badges/sqllite.svg" />
                                    </div>
                                </div>
                            </HoverEffect>

                            {/* Training a Two Arm Actuator Using Reinforcement Learning */}
                            <HoverEffect theme={theme}>
                                <div className="card-info">
                                    <h2 className={`${theme}`}>Training a Two Arm Actuator Using Reinforcement Learning</h2>
                                    <p className={`${theme}`}>
                                        The purpose of this project is to recreate a model seen in the paper "Actuator 
                                        Trajectory Planning for UAVs with Overhead Manipulator using Reinforcement Learning," 
                                        authored by Hazim Alzorgan, Abolfazl Razi, and Ata Jahangir Moshayed. The paper describes 
                                        an application of reinforcement learning on a virtual drone, where various kinematics 
                                        are taken into account in the simulation. Additionally, the drone is equipped with a 
                                        two-arm actuator on top, featuring a tip known as an end effector. Its goal is to 
                                        detect a viable base path and follow a target path with the tip of the end effector. 
                                        This project utilizes methods from the paper, such as inverse kinematic equations and 
                                        Q-Learning formulas, to recreate a more bare-bones version of what was presented in 
                                        the original research.
                                    </p>
                                    <br/>
                                    <p className={`${theme}`}>
                                    <a href="https://github.com/yeetbruises/Two-Arm-Actuator-AI-RL-Sim"  target="_blank"> 
                                        Click for Repo  
                                    </a>
                                    </p>
                                    <br/>
                                    <div class="showcase">
                                        <img src="/images/graph2.png" alt="Training a Two Arm Actuator" />
                                        <img src="/images/graph.png" alt="Training a Two Arm Actuator" />
                                    </div>
                                    <div class='tools'>
                                        <img src="/images/badges/gym.png" />
                                        <img src="/images/badges/python.svg" />
                                    </div>
                                </div>
                            </HoverEffect>

                            {/* Json to CSV project*/}
                            <HoverEffect theme={theme}>
                                <div className="card-info">
                                    <h2 className={`${theme}`}>Discord Chat JSON to CSV Converter</h2>
                                    <p className={`${theme}`}>This is a JSON to CSV converter that allows exported Discord chat data to easily be converted into a more readable format for data visualization purposes.</p>
                                </div>
                            </HoverEffect>
                        </div>
                    </div>  
                    <br/>
                    <img src='./images/pacman.gif'/>
                    
                    <img align="right" style={{marginRight: "auto", display:"block", width:"8em"}} src="https://visit-counter.vercel.app/counter.png?page=&s=20&c=00ff00&bg=00000000&no=2&ff=alien&tb=Visits%3A+&ta=" /> 
                    
                </div>
                
            </section>
        </main>

        <div className={`circle1 ${theme}`}></div>

        <div className={`circle2 ${theme}`}></div>
    </div>
)
}

export default App;
