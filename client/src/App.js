import './App.css';
import React from "react";
import { Helmet } from "react-helmet";
import { NavBar } from "./NavBar.js";
import { useInView } from "react-intersection-observer";
import { useRef, useEffect, useState } from "react";

function App() {

  const { ref: myRef1, inView: obj, entry} = useInView();
  const { ref: myRef2, inView: obj2, entry2} = useInView();
  const { ref: myRef3, inView: obj3, entry3} = useInView();

  var classes = obj === true 
        ? "slider-anim-0" 
        : (obj2 === true 
          ? "slider-anim-50" 
          : (obj3 === true 
            ? "slider-anim-100" 
            : ""));

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

  return (
      <div className='App'>
          <Helmet>
              <meta charset="UTF-8" />
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
              <section className="glass">
                  <div className="dashboard">
                      <div className="user">
                          <img src="/images/profile.png" style={{borderRadius: '100%'}} />
                          <h3>Vineet Saraf</h3>
                          <p>Software Engineer</p>
                      </div>
                      <NavBar prop={classes} />
                  </div>
                  <div id="div0" className="section" style={{overflowY: 'auto'}}>
                      <div id="t1" ref={myRef1} style={{opacity: obj === true ? 1 : 0}}>
                        <div className="status">
                            <h1>About</h1>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <div className="card-info">
                                    <h2>Vineet Saraf</h2>
                                    <hr style={{ border: '1px solid white', margin: '0.5em 0' }} />
                                    <p>
                                        My name is Vineet Saraf, and I'm a computer science student based in South Carolina. 
                                        As a senior, I am currently pursuing a master's degree in computer science. 
                                        I have a passion for technology and innovation, which drives my academic and personal projects.
                                    </p>
                                    <br/>
                                    <div class="showcase">
                                        <img src="/images/banner2.png"></img>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                      </div>
                      <div id="t2" ref={myRef2}>
                          <div className="status">
                              <h1>Projects</h1>
                          </div>
                          <div className="cards">
                              <div className="card">
                                <div className="card-info">
                                    <h2>Hurricane Helene Power Outage Visual</h2>
                                    <hr style={{ border: '1px solid white', margin: '0.5em 0' }} />
                                    <p>
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
                                    <div class="showcase">
                                        <img src="/images/hurricane.gif" alt="Hurricane Helene Power Outage Visual" />
                                    </div>
                                    <p><strong>Date:</strong> 10/05/2024</p>
                                </div>

                              </div>

                              {/* Geoguessr on Discord */}
                              <div className="card">
                                  <div className="card-info">
                                      <h2>Geoguessr on Discord</h2>
                                      <hr style={{ border: '1px solid white', margin: '0.5em 0' }} />
                                      <p>
                                          Developed a multiplayer game in Python using the Discord.py library and the Google 
                                          Streetview API. This project employs the MVC design pattern and effective API design. 
                                          I successfully published the game and had it merged into an existing Discord bot that 
                                          services over 2000 users on a university server. Additionally, I created GeoJSON maps 
                                          in QGIS software, which were used to fine-tune potential player locations within the game.
                                      </p>
                                      <br/>
                                      <div class="showcase">
                                          <img src="/images/gg.png" alt="Geoguessr on Discord"></img>
                                      </div>
                                      <p><strong>Date:</strong> 8/20/2023</p>
                                  </div>
                              </div>

                              {/* Training a Two Arm Actuator Using Reinforcement Learning */}
                              <div className="card">
                                  <div className="card-info">
                                      <h2>Training a Two Arm Actuator Using Reinforcement Learning</h2>
                                      <hr style={{ border: '1px solid white', margin: '0.5em 0' }} />
                                      <p>
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
                                      <img src="/images/graph2.png" alt="Training a Two Arm Actuator" />
                                      <img src="/images/graph.png" alt="Training a Two Arm Actuator" />
                                      <p><strong>Date:</strong> 12/14/2023</p>
                                  </div>
                              </div>

                              {/* Json to CSV project*/}
                              <div className="card">
                                  <div className="card-info">
                                      <h2>Discord Chat JSON to CSV Converter</h2>
                                      <hr style={{ border: '1px solid white', margin: '0.5em 0' }} />
                                      <p>This is a JSON to CSV converter that allows exported Discord chat data to easily be converted into a more readable format for data visualization purposes.</p>
                                      <p><strong>Date:</strong> 1/27/2023</p>
                                  </div>
                              </div>
                          </div>
                      </div>  
                      <div id="t3" ref={myRef3}>
                          <div className="status">
                              <h1>Experience</h1>
                          </div>
                          <p id="3"></p>
                          <div className="cards">

                              {/* Capstone */}
                              <div className="card">
                                  <div className="card-info">
                                      <div style={{textAlign: 'center'}}>
                                          <img src="/images/arc.png" alt="Arccos Golf Logo" style={{ width: '45%' }} />
                                      </div>
                                      <h2>Arccos Golf - University Senior Design Capstone Program</h2>
                                      <hr style={{ border: '1px solid white', margin: '0.5em 0' }} />
                                      <p>August 2024 - Present</p>
                                      <hr style={{ border: '1px solid white', margin: '0.5em 0' }} />
                                      <p>As part of the university senior design capstone program, I am creating a custom AI segmentation model from the ground up. This project leverages machine learning to optimize map feature segmentation, aiming to improve user experience by filtering out inaccurate data from the Arccos Golf app. My work involves processing extensive USGS datasets in Python and training deep learning AI models to effectively create segments in GIS software.</p>
                                  </div>
                              </div>

                              {/* JR Automation Experience Card */}
                              <div className="card">

                                  <div className="card-info">
                                      <div style={{textAlign: 'center'}}>
                                          <img src="/images/jrautologo.png" alt="JR Automation"/>
                                      </div>
                                      <h2>Software Engineering Intern</h2>
                                      <hr style={{ border: '1px solid white', margin: '0.5em 0' }} />
                                      <p>Summer 2023 and Summer 2024 (May to August)</p>
                                      <hr style={{ border: '1px solid white', margin: '0.5em 0' }} />
                                      <p>During my internship at JR Automation, I gained practical experience in software engineering. I created a full-stack web application using C# frameworks to fetch and display data, utilizing various JavaScript libraries. I designed and developed APIs and wrote LINQ queries to navigate SQL databases in C#. My role involved managing tasks and creating issues on DevOps, where I applied Agile methodologies to efficiently complete work assignments.</p>
                                      <br/>
                                      <p>I also troubleshot an internal employee data management system in C# to prevent data loss. Throughout the internship, I focused on developing a responsive front-end using CSS flexbox, ensuring optimal performance on different devices. I integrated DataTables.js for dynamic tables and Chart.js for visual data representations. JavaScript played a significant role in handling real-time data updates, making the user experience more interactive. By the end of the summer, I successfully refined the project into a fully functional product through Agile iterations and the usage of Azure DevOps.</p>
                                  </div>
                              </div>

                              {/* Creative Inquiry Experience Card */}
                              <div className="card">                                  
                                  <div className="card-info">
                                      <div style={{textAlign: 'center'}}>
                                          <img src="/images/creativeinquirylogo.png" alt="Creative Inquiry Program Logo" className="card-logo" />
                                      </div>
                                      <h2>Undergraduate Researcher with Watt AI</h2>
                                      <hr style={{ border: '1px solid white', margin: '0.5em 0' }} />
                                      <p>August 2024 - Present</p>
                                      <hr style={{ border: '1px solid white', margin: '0.5em 0' }} />
                                      <p>As a member of a collaborative team with Dr. Carl Ehrett, I am involved in training a large language model (LLM) to analyze social media posts and extract frames. We utilize LabelBox for the labeling process and Trello to manage our tasks, which includes providing weekly data analyses supported by Pandas and Matplotlib. This project aims to fine-tune an LLM for the automatic extraction of frames from social media content, specifically leveraging data from Twitter and YouTube. The model's performance is evaluated by comparing its outputs against human-labeled frames, ultimately striving to create AI-powered tools for enhanced frame extraction and analysis in social media contexts.</p>
                                  </div>
                              </div>

                          </div>   
                      </div>
                  </div>
                  
              </section>
          </main>

          <div className="circle1"></div>

          <div className="circle2"></div>
     </div>
  )
}

export default App;
