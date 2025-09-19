import './App.css';
import React from "react";
import { Helmet } from "react-helmet";
import { NavBar } from "./NavBar.js";
import { useInView } from "react-intersection-observer";
import { useRef, useEffect, useState } from "react";
import resized from './layout.js';
import HoverEffect from "./HoverEffect";
import { motion } from "framer-motion";
import { Arrow } from "./Arrow.jsx";
import { ArrowUp } from "./ArrowUp.jsx";
import ContactSection from './ContactForm.js';
import GeoDemoButton from "./GeoDemoButton";
import VSWordMark from './VSWordMark.jsx';
import TrustedDomains from "./TrustedDomains";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Photography from "./Photography";
import Gate from "./Gate"; // <-- add this

//inspo https://port-folio-nine-lemon-27.vercel.app/

function Home() {
    //const [hovered, setHovered] = useState(false);

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

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Trigger fade-in after component mounts
        setVisible(true);
    }, []);

    // inspo: https://www.pranavkonjeti.com/

    /*<button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>*/

    const lines = document.querySelectorAll('.timeline-line');
    let index = 0;

    function animateNextLine() {
        if (index >= lines.length) return;

        const currentLine = lines[index];

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start timeline growth
                    currentLine.classList.add('active');

                    // When the growth finishes...
                    currentLine.addEventListener('transitionend', () => {
                        const parent = currentLine.closest('.timeline-entry');

                        // Fade in dot and year
                        const yearLabel = currentLine.querySelector('.year-label');
                        const dot = currentLine.querySelector('.milestone-dot');
                        if (yearLabel) yearLabel.classList.add('visible');
                        if (dot) dot.classList.add('visible');

                        // Fade in associated card
                        const card = parent?.querySelector('.fade-section');
                        if (card) card.classList.add('visible');

                        // Now trigger the next one
                        index++;
                        animateNextLine();
                    }, { once: true });

                    observer.unobserve(currentLine);
                }
            });
        }, { threshold: 0.6 });

        observer.observe(currentLine);
    }

    animateNextLine();


    const fadeElements = document.querySelectorAll('.fade-section');

    const fadeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.4 });

    fadeElements.forEach(el => fadeObserver.observe(el));

    /* Create lightbox for images */
    document.addEventListener('click', (event) => {
        if (document.querySelector('.image-lightbox')) return;

        // Only respond if an image inside .showcase was clicked
        const clickedImg = event.target.closest('.showcase img');
        if (!clickedImg) 
            return;

        // Create the lightbox container
        const lightbox = document.createElement('div');
        lightbox.classList.add('image-lightbox');

        // Create the enlarged image
        const lightboxImage = document.createElement('img');
        lightboxImage.src = clickedImg.src;
        lightbox.appendChild(lightboxImage);

        // Create close button
        const closeButton = document.createElement('button');
        closeButton.classList.add('close-button');
        closeButton.innerHTML = '&times;';
        lightbox.appendChild(closeButton);

        // Append lightbox to body
        document.body.appendChild(lightbox);

        // Trigger transition
        requestAnimationFrame(() => {
        lightbox.classList.add('active');
        });

        // Close logic
        const close = () => {
        lightbox.classList.remove('active');
        setTimeout(() => lightbox.remove(), 300); // matches fade-out time
        };

        // Close on background click or button click
        lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === closeButton) {
            close();
        }
        });
    });

    document.getElementById('HurricaneDemo')?.addEventListener('click', () => {
        document.querySelector('.showcase img')?.click();
    });
      

    const div0Ref = useRef(null);
    const cropRef = useRef(null);

    useEffect(() => {
        const container = div0Ref.current;
        const stopper = cropRef.current;

        if (container && stopper) {
        const containerTop = container.getBoundingClientRect().top;
        const stopperBottom = stopper.getBoundingClientRect().bottom;
        const cropHeight = stopperBottom - containerTop;

        container.style.maxHeight = `${cropHeight}px`;
        }
    }, []);


    return (
    <>
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
                <title>Welcome!</title>
                <link rel="stylesheet" href="./style.css" />
            </Helmet>
            <main className='viewportRatio'>
                <section className={`glass ${theme}`} style={{border: '0.2px solid skyblue', height: '360px'}}>
                    <div className={`dashboard ${theme}`}>
                        <div className="user">
                            <VSWordMark size={50} stroke={2} />
                            <br/>
                            <div id="workedDates" style={{ width: '80%', height: 'auto', marginTop: '20px', containerType: 'inline-size' }}>
                                <p style={{ margin: 0 }}>
                                    <a
                                        href="https://sites.gatech.edu/vineet/"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'inline-block',
                                            maxWidth: '100%',
                                            fontSize: 'clamp(10px, 6cqw, 20px)', // 1cqw = 1% of container width
                                            lineHeight: 1,
                                            whiteSpace: 'normal',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis' // trims if it’s still too long
                                        }}
                                    >
                                    MSCS @ Georgia Tech
                                    </a>
                                </p>
                            </div>

                        </div>
                        <NavBar prop={classes} />
                        
                    </div>
                    <div id="div0" className="section" ref={div0Ref} style={{ height: '100%', overflowY: 'auto'}}>
                        <div style={{overflowY: "clip"}}>
                            <div style={{position: "relative"}}>
                                <img src="./images/testtree2.png" style={{opacity: "0.1", width: "auto", height: "2000px", marginTop: "0px", borderRadius: "10px", position: "absolute", zIndex: "-1", left: "0"}}/>
                                <img src="./images/testtree2.png" style={{opacity: "0.1", width: "auto", height: "2000px", marginTop: "2000px", borderRadius: "10px", position: "absolute", zIndex: "-1", left: "0"}}/>
                                <img src="./images/testtree2.png" style={{opacity: "0.1", width: "auto", height: "2000px", marginTop: "4000px", borderRadius: "10px", position: "absolute", zIndex: "-1", left: "0"}}/>
                            </div>

                            {/*<div style={{width: "90%", margin: "auto"}}>
                                <TrustedDomains allowed={[
                                    "www.coastalvinny.dev",
                                    "sites.gatech.edu/coastalvinny"
                                ]}/>
                            </div>*/}

                            <div id="t1" style={{margin: 'auto', width: "75%" }} ref={myRef1}>
                                <div className="cards" style={{ margin: 'auto', alignItems: 'center', display: 'flex', justifyContent: 'center'}}>

                                    <HoverEffect theme={theme} id="intoCard">
                                        {({ hovered }) => (
                                            <>
                                                <div className='intro' style={{flexDirection: 'row', display: 'flex'}}>
                                                    <img id="mainpic" style={{margin: 'auto', width: '100%', display: 'none'}} src="images/IMG_4549.jpg" />
                                                    <img id="mainpic2" style={{display: 'block', margin: 'auto'}} src="images/IMG_4549_portrait.webp" />
                                                    <div id='nameDiv' style={{ margin: 'auto', marginLeft: '3em' }}>
                                                        <h1 style={{ color: hovered ? "lime" : "white", paddingBottom: '10px' }} className={`${theme}`}>Vineet Saraf</h1>
                                                        <p className={`${theme}`}>
                                                            Hello! My name is Vineet Saraf and I'm an interning software engineer at LPL Financial. 
                                                            I graduated from Clemson University very recently and I am currently pursuing a Masters degree in computer science. 
                                                        </p>
                                                        <br/>
                                                        <p>
                                                        This site showcases some of my 
                                                        work. I have a passion for full-stack web development, creative data visuals, and AI. 
                                                        </p>
                                                        <br/>
                                                        <p>
                                                        Here's what I'm working on right now:
                                                        <br/>• Working on fleshing out a CPU simulator, with the goal of running a game on it.
                                                        <br/>• Starting my Masters Degree at <a href="https://www.gatech.edu/"><b>Georgia Tech</b></a> in Computer Science.
                                                        <br/>• Studying High Performance Computing Architecture and Databases atm.
                                                        <br/>• Seeking full-time opportunities for a new graduate.
                                                        </p>
                                                        <br />
                                                        <br />
                                                        <ul class="Landing_social_ul_hero__bHIN8 social-bar">
                                                            <li>
                                                                <a href="https://www.linkedin.com/in/vineet-saraf/"
                                                                    rel="noopener noreferrer"
                                                                    title="Open LinkedIn Profile"
                                                                    class="Landing_here_svg__fGEgQ social-link">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                                    <path d="M6.94048 4.99993C6.94011 5.81424 6.44608 6.54702 5.69134 6.85273C4.9366 7.15845 4.07187 6.97605 3.5049 6.39155C2.93793 5.80704 2.78195 4.93715 3.1105 4.19207C3.43906 3.44699 4.18654 2.9755 5.00048 2.99993C6.08155 3.03238 6.94097 3.91837 6.94048 4.99993ZM7.00048 8.47993H3.00048V20.9999H7.00048V8.47993ZM13.3205 8.47993H9.34048V20.9999H13.2805V14.4299C13.2805 10.7699 18.0505 10.4299 18.0505 14.4299V20.9999H22.0005V13.0699C22.0005 6.89993 14.9405 7.12993 13.2805 10.1599L13.3205 8.47993Z"/>
                                                                </svg>
                                                                </a>
                                                            </li>
                                                            <br /><br /><br />
                                                            <li>
                                                                <a href="https://github.com/yeetbruises"
                                                                    rel="noopener noreferrer"
                                                                    title="Open GitHub Profile"
                                                                    class="Landing_here_svg__fGEgQ social-link">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                                    <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"/>
                                                                </svg>
                                                                </a>
                                                            </li>
                                                            <br /><br /><br />
                                                            <li>
                                                                <a href="#t5"
                                                                    rel="noopener noreferrer"
                                                                    title="Send an Email"
                                                                    class="Landing_here_svg__fGEgQ social-link">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                                    <path d="M20.7134 8.12811L20.4668 8.69379C20.2864 9.10792 19.7136 9.10792 19.5331 8.69379L19.2866 8.12811C18.8471 7.11947 18.0555 6.31641 17.0677 5.87708L16.308 5.53922C15.8973 5.35653 15.8973 4.75881 16.308 4.57612L17.0252 4.25714C18.0384 3.80651 18.8442 2.97373 19.2761 1.93083L19.5293 1.31953C19.7058 0.893489 20.2942 0.893489 20.4706 1.31953L20.7238 1.93083C21.1558 2.97373 21.9616 3.80651 22.9748 4.25714L23.6919 4.57612C24.1027 4.75881 24.1027 5.35653 23.6919 5.53922L22.9323 5.87708C21.9445 6.31641 21.1529 7.11947 20.7134 8.12811ZM2 4C2 3.44772 2.44772 3 3 3H14V5H4.5052L12 11.662L16.3981 7.75259L17.7269 9.24741L12 14.338L4 7.22684V19H20V11H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4Z"/>
                                                                </svg>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </HoverEffect>

                                </div>
                            </div>
                            
                            <div id="nonintro" style={{width: "75%", margin: "auto"}}>
                                <br/><br/><br/>
                                <div id="t2" ref={myRef2}>
                                    <div className="status">
                                        <h1 className={`${theme}`}>School</h1>
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
                                                    <br/>
                                                    <p style={{color: "lime"}}><b>GPA: x.xx</b></p>
                                                    <br/>
                                                    <p>Incoming Masters student at Georgia Tech for Computer Science!</p>
                                                    <div class="hoveredGTLabel" style={{marginTop: '20px'}}>
                                                        <a href="https://sites.gatech.edu/vineet/"  target="_blank"> 
                                                            <b style={{color: 'white'}}> Check Out My Georgia Tech Website </b>
                                                        </a>
                                                    </div>
                                                    <div className="showcase"></div>
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
                                                    <br/>
                                                    <p style={{color: "lime"}}><b>GPA: 3.55</b> — (1x) President’s List, (4x) Dean’s List</p>
                                                    <br/>
                                                    <p><b>Academic Honors:</b> UPE–Upsilon Pi Epsilon | Palmetto Fellows Scholarship, SC Life Scholarship</p>
                                                    <br/>
                                                    <p><b>Relevant Coursework:</b> Reinforcement Learning, Linear Algebra, Machine Learning, Data Science, Networking, Software
                                                    Engineering, Databases, Data Structures, Computer Architecture, Operating Systems, Differential Equations</p>
                                                    <div className="showcase">
                                                    </div>
                                                </div>
                                            </div>
                                        </HoverEffect>
                                    </div>
                                </div>
                                <br/><br/><br/>
                                <div id="t3" ref={myRef3}>
                                    <div className="status">
                                        <h1 className={`${theme}`}>Work</h1>
                                    </div>
                                    <p className={`${theme}`} id="3"></p>
                                    <div id="timeline-outer">
                                        <div className="timeline-container">
                                            {/* LPL Financial */}
                                            <div className="timeline-line">
                                                <div class="milestone-dot"></div>
                                                <div className="year-label">2025</div>
                                            </div>
                                            <div className="cards fade-section">
                                                <HoverEffect theme={theme}>
                                                    {({ hovered }) => (
                                                        <>
                                                            <div style={{ textAlign: 'left' }}>
                                                                <img src="/images/LPL.png" alt="LPL Financial Logo" style={{ minWidth: '200px', width: '10vw', height: 'auto' }} />
                                                            </div>
                                                            <div className="card-info work" style={{ justifyContent: "space-between", display: 'flex', gap: '0.9rem' }}>
                                                                <h2 style={{ color: hovered ? "lime" : "white"}} className={`${theme}`}>Software Engineering Intern</h2>
                                                                <div id="workedDates">
                                                                    <p className={`${theme}`}>June 2025 - Present</p>
                                                                </div>
                                                            </div>
                                                            <p className={`${theme}`}>I am an incoming summer intern at LPL Financial.</p>
                                                        </>
                                                    )}
                                                </HoverEffect>
                                            </div>

                                            {/* Capstone */}
                                            <div className="timeline-line">
                                                <div class="milestone-dot"></div>
                                                <div className="year-label">2024</div>
                                            </div>
                                            <div className="cards fade-section">
                                                <HoverEffect theme={theme}>
                                                    {({ hovered }) => (
                                                        <>
                                                            <div style={{ textAlign: 'left' }}>
                                                                <img src="/images/arc.png" alt="Arccos Golf Logo" style={{ minWidth: '200px', width: '10vw', height: 'auto' }} />
                                                            </div>
                                                            <div className="card-info work" style={{ justifyContent: "space-between", display: 'flex', gap: '0.9rem'  }}>
                                                                <h2 style={{ color: hovered ? "lime" : "white"}} className={`${theme}`}>Arccos Golf - University Senior Design Capstone Program</h2>
                                                                <div id="workedDates">
                                                                    <p className={`${theme}`}>August 2024 - December 2024</p>
                                                                </div>
                                                            </div>
                                                            <p className={`${theme}`}>As part of the university senior design capstone program, I am creating a custom AI segmentation model from the ground up. This project leverages machine learning to optimize map feature segmentation, aiming to improve user experience by filtering out inaccurate data from the Arccos Golf app. My work involves processing extensive USGS datasets in Python and training deep learning AI models to effectively create segments in GIS software.</p>
                                                        </>
                                                    )}
                                                </HoverEffect>
                                            </div>

                                            {/* JR Automation */}
                                            <div className="timeline-line">
                                                <div className="milestone-dot"></div>
                                                <div className="year-label">2023–24</div>
                                            </div>
                                            <div className="cards fade-section">
                                                <HoverEffect theme={theme}>
                                                    {({ hovered }) => (
                                                        <>
                                                            <div style={{ textAlign: 'left' }}>
                                                                <img src="/images/jrautologo.png" alt="JR Automation" style={{ minWidth: '200px', width: '10vw', height: 'auto' }} />
                                                            </div>
                                                            <div className="card-info work" style={{ justifyContent: "space-between", display: 'flex', gap: '0.9rem'}}>
                                                                
                                                                <h2 style={{ color: hovered ? "lime" : "white"}} className={`${theme}`}> Software Engineering Intern</h2>
                                                                
                                                                <div id="workedDates">
                                                                    <p className={`${theme}`}>Summer 2023 and Summer 2024</p>
                                                                </div>

                                                            </div>
                                                            <p className={`${theme}`}>During my internship at JR Automation, I gained practical experience in software engineering. I created a full-stack web application using C# frameworks to fetch and display data, utilizing various JavaScript libraries. I designed and developed APIs and wrote LINQ queries to navigate SQL databases in C#. My role involved managing tasks and creating issues on DevOps, where I applied Agile methodologies to efficiently complete work assignments.</p>
                                                            <br />
                                                            <p className={`${theme}`}>I also troubleshot an internal employee data management system in C# to prevent data loss. Throughout the internship, I focused on developing a responsive front-end using CSS flexbox, ensuring optimal performance on different devices. I integrated DataTables.js for dynamic tables and Chart.js for visual data representations. JavaScript played a significant role in handling real-time data updates, making the user experience more interactive. By the end of the summer, I successfully refined the project into a fully functional product through Agile iterations and the usage of Azure DevOps.</p>
                                                        </>
                                                    )}
                                                </HoverEffect>
                                            </div>

                                            {/* Creative Inquiry */}
                                            <div className="timeline-line">
                                                <div className="milestone-dot"></div>
                                                <div className="year-label">2024–25</div>
                                            </div>
                                            <div className="cards fade-section">
                                                <HoverEffect theme={theme}>
                                                    {({ hovered }) => (
                                                        <>
                                                            <div style={{ textAlign: 'left' }}>
                                                                <img src="/images/creativeinquirylogo.png" alt="Creative Inquiry Program Logo" className="card-logo" style={{ minWidth: '200px', width: '10vw', height: 'auto' }} />
                                                            </div>
                                                            <div className="card-info work" style={{ justifyContent: "space-between", display: 'flex', gap: '0.9rem' }}>
                                                                <h2 style={{ color: hovered ? "lime" : "white"}} className={`${theme}`}>Undergraduate Researcher with Watt AI</h2>
                                                                <div id="workedDates"> 
                                                                    <p className={`${theme}`}>August 2024 - May 2025</p>
                                                                </div>
                                                            </div>
                                                            <p className={`${theme}`}>As a member of a collaborative team with Dr. Carl Ehrett, I am involved in training a large language model (LLM) to analyze social media posts and extract frames. We utilize LabelBox for the labeling process and Trello to manage our tasks, which includes providing weekly data analyses supported by Pandas and Matplotlib. This project aims to fine-tune an LLM for the automatic extraction of frames from social media content, specifically leveraging data from Twitter and YouTube.</p>
                                                        </>
                                                    )}
                                                </HoverEffect>
                                            </div>
                                        </div>
                                    </div>

                                    
                                </div>
                                <br/><br/><br/>
                                <div id="t4" ref={myRef4}>
                                    <div className="status">
                                        <h1 className={`${theme}`}>Projects</h1>
                                    </div>
                                    <div className="cards" id="projects">
                                        <HoverEffect theme={theme} style={{padding: '0rem'}}>
                                            {({ hovered }) => (
                                                <>
                                                    <div className="showcase">
                                                        <img src="/images/hurricane.gif" alt="Hurricane Helene Power Outage Visual" />
                                                    </div>
                                                    <div className="card-info">
                                                        <h2 style={{ color: hovered ? "lime" : "white"}} className={`${theme}`} >Hurricane Helene Power Outage Visual</h2>
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
                                                        <p className={`${theme}`} style={{display: "flex"}}>
                                                            <a style={{marginTop: "auto", marginBottom: "auto"}} class='repolink' href="https://github.com/yeetbruises/Hurricane-Helene-Power-Outage-Visual/tree/main"  target="_blank"> 
                                                                Click for Repo  
                                                            </a>
                                                            <button id="HurricaneDemo" className="send-button" style={{borderRadius: "10px", margin: "auto", paddingUp: "5px", paddingDown: "5px", paddingLeft: "10px", paddingRight: "10px"}}> 
                                                                Check It Out!    
                                                            </button>
                                                        </p>
                                                        <br/>
                                                        <div className='tools'>
                                                            <img src="/images/badges/python.svg" />
                                                            <img src="/images/badges/selenium.svg" />
                                                            <img src="/images/badges/qgis.png" />
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </HoverEffect>

                                        {/* Geoguessr on Discord */}
                                        <HoverEffect theme={theme}>
                                            {({ hovered }) => (
                                                <>
                                                    <div className="showcase">
                                                        <img src="/images/gg.png" alt="Geoguessr on Discord"></img>
                                                    </div>
                                                    <div className="card-info">
                                                        <h2 style={{ color: hovered ? "lime" : "white"}} className={`${theme}`}>Geoguessr on Discord</h2>
                                                        <p className={`${theme}`}>
                                                            Developed a multiplayer game in Python using the Discord.py library and the Google 
                                                            Streetview API. This project employs the MVC design pattern and effective API design. 
                                                            I successfully published the game and had it merged into an existing Discord bot that 
                                                            services over 2000 users on a university server. Additionally, I created GeoJSON maps 
                                                            in QGIS software, which were used to fine-tune potential player locations within the game.
                                                        </p>
                                                        <br/>
                                                        <p className={`${theme}`} style={{display: "flex"}}>
                                                            <a style={{marginTop: "auto", marginBottom: "auto"}} class='repolink' href="https://github.com/yeetbruises/GeoGuessrImplementation"  target="_blank"> 
                                                                Click for Repo  
                                                            </a>
                                                            <GeoDemoButton /> 
                                                        </p>
                                                        <br/>
                                                        <div className='tools'>
                                                            <img src="/images/badges/discord.svg" />
                                                            <img src="/images/badges/python.svg" />
                                                            <img src="/images/badges/googlecloud.svg" />
                                                            <img src="/images/badges/qgis.png" />
                                                            <img src="/images/badges/sqllite.svg" />
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </HoverEffect>

                                        {/* Training a Two Arm Actuator Using Reinforcement Learning */}
                                        <HoverEffect theme={theme}>
                                            {({ hovered }) => (
                                                <>
                                                    <div className="showcase" style={{gap: "0em", flexWrap: "nowrap", display: "flex", overflow: "hidden", alignItems: "center", justifyContent: "center"}}>
                                                        <img src="/images/graph2.png" alt="Training a Two Arm Actuator" />
                                                        <img src="/images/graph.png" alt="Training a Two Arm Actuator" />
                                                    </div>
                                                    <div className="card-info">
                                                        <h2 style={{ color: hovered ? "lime" : "white"}} className={`${theme}`}>Training a Two Arm Actuator Using Reinforcement Learning</h2>
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
                                                        <p className={`${theme}`} style={{display: "flex"}}>
                                                            <a class='repolink' href="https://github.com/yeetbruises/Two-Arm-Actuator-AI-RL-Sim"  target="_blank"> 
                                                                Click for Repo  
                                                            </a>
                                                        </p>
                                                        <br/>
                                                        <div className='tools'>
                                                            <img src="/images/badges/gym.png" />
                                                            <img src="/images/badges/python.svg" />
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </HoverEffect>

                                        {/* Json to CSV project*/}
                                        <HoverEffect theme={theme}>
                                            {({ hovered }) => (
                                                <>
                                                    <div className="card-info">
                                                        <h2 style={{ color: hovered ? "lime" : "white"}} className={`${theme}`}>Discord Chat JSON to CSV Converter</h2>
                                                        <p className={`${theme}`}>This is a JSON to CSV converter that allows exported Discord chat data to easily be converted into a more readable format for data visualization purposes.</p>
                                                        <br/>
                                                        <p className={`${theme}`} style={{display: "flex"}}>
                                                            <a class='repolink' href="https://github.com/yeetbruises/JSONCSVConverter"  target="_blank"> 
                                                                Click for Repo  
                                                            </a>
                                                        </p>
                                                        <br/>
                                                    </div>
                                                </>
                                            )}
                                        </HoverEffect>
                                    </div>
                                </div>       
                                <br/><br/>
                                <div className="cards" id="projects">
                                    <HoverEffect theme={theme} style={{padding: '0rem'}}>
                                        {({ hovered }) => (
                                            <>
                                                <div className="card-info">
                                                    <h2 style={{ fontSize: "34px", color: hovered ? "lime" : "white"}} className={`${theme}`}>
                                                        Photography
                                                    </h2>
                                                    <p className={`${theme}`} style={{color:"white"}}>
                                                        Check out my photography!
                                                    </p>
                                                    <br/>
                                                    <a href="/photography" target="" rel="noopener noreferrer" style={{textDecoration: "none"}}>
                                                        <p className={`${theme}`} style={{display: "flex"}}>
                                                            <button id="HurricaneDemo" className="send-button" 
                                                                style={{ borderRadius: "10px", 
                                                                        margin: "auto", 
                                                                        paddingUp: "5px", 
                                                                        paddingDown: "5px", 
                                                                        paddingLeft: "10px", 
                                                                        paddingRight: "10px"}}> 
                                                                Check It Out!    
                                                            </button>
                                                        </p>
                                                    </a>
                                                </div>
                                            </>
                                        )}
                                    </HoverEffect>  
                                </div>  
                                <br/>
                                <motion.div
                                    className='card'
                                    style={{
                                        border: "1px solid var(--accent)",
                                        background: "black",
                                        position: "relative",
                                        borderRadius: "12px",
                                        width: "100%",
                                        transform: "scale(0.96)"
                                    }}
                                >

                                    <div id="internal-card" className="card-info">
                                        <>
                                            <div className="card-info">
                                                <ContactSection />
                                            </div>
                                        </>
                                    </div>

                                </motion.div>
                            </div> 
                            <br/><br/>
                            <br/>    
                            <img id="phonepacman" src='./images/pacman.gif' style={{display: 'none', height: "auto", width: "99%", margin: "1px", backgroundColor: "black", borderRadius: "10px"}}/>       
                            <div ref={cropRef} style={{backgroundColor: "black", borderRadius: "10px", display:"flex"}}>
                                <div style={{display: "flex"}}> 
                                    <img id="widepacman" src='./images/pacman.gif' style={{height: "65%", marginLeft: "auto", marginRight: "auto", marginTop: "auto", marginBottom: "auto", backgroundColor: "black", borderRadius: "10px"}}/>       
                                </div>
                                
                                <img align="right" style={{width: "auto", height: "65%", marginTop: "auto", marginBottom: "auto", marginLeft: "auto", marginRight: "auto", display:"block"}} 
                                    src="https://visit-counter.vercel.app/counter.png?page=&s=20&c=00ff00&bg=00000000&no=2&ff=alien&tb=Visits%3A+&ta=" />   
                            </div>
                        </div>
                    </div>
                    <a class="backToTop" href="#t1" style={{marginLeft: "auto", marginRight: "auto"}}>
                        <ArrowUp></ArrowUp>
                    </a>
                    
                </section>
            
            </main>

            <div className={`circle1 ${theme}`}></div>

            <div className={`circle2 ${theme}`}></div>
        </div>
    </>
    )
}

export function App() {
    return (
      <Gate>
            <BrowserRouter>
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/photography" element={<Photography />} />
                </Routes>
            </BrowserRouter>
      </Gate>
    );
  }

export default App;
