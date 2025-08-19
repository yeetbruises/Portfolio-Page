let count = 0
let portrait_previously = false

//rgb(144 202 249)
//

export default function resized() {
    
    function isPortrait() {
        console.log(window.innerHeight);
        console.log(window.innerWidth);
        return window.innerHeight > window.innerWidth;

    }

    function updateLayout() {
        const dashboard = document.querySelector('.dashboard'); // Ensure this is your target element
        if (document.querySelector("main")) {
            document.querySelector("main").style.maxHeight = `${window.innerHeight}px`;
            //document.querySelector("main").style.maxWidth = `${window.innerWidth}px`;
        }

        if (window.innerWidth < 1200) {
            if (document.querySelector("#mainpic") && document.querySelector("#mainpic2")) {
                document.querySelector("#mainpic").style.display = 'block';
                document.querySelector("#mainpic2").style.display = 'none';
            } 
            if (document.querySelector('.intro')){
                document.querySelector('.intro').style.display = "flex";
                document.querySelector('.intro').style.flexDirection = "column";
            }
            if (document.querySelector('#nameDiv')){
                document.querySelector('#nameDiv').style.margin = "auto auto auto auto";
            }
        }
        if (window.innerWidth > 1200) {
            if (document.querySelector("#mainpic") && document.querySelector("#mainpic2")) {
                document.querySelector("#mainpic").style.display = 'none';
                document.querySelector("#mainpic2").style.display = 'block';
            } 
            if (document.querySelector('.intro')){
                document.querySelector('.intro').style.display = "flex";
                document.querySelector('.intro').style.flexDirection = "row";
            }
            if (document.querySelector('#nameDiv')){
                document.querySelector('#nameDiv').style.margin = "auto auto auto 3em";
            }
        }

        // Check if the screen is in portrait mode
        if (isPortrait() && dashboard && document.querySelector('#slider-parent')) {
            // MOBILE VIEW 

            portrait_previously = true;
            //console.log("it is portrait");
            // Apply CSS styles for portrait mode
            document.querySelectorAll('.showcase').forEach(element => {
                element.style.width = '100%';
            });
            dashboard.style.display = 'flex';
            dashboard.style.position = 'relative';
            dashboard.style.top = '0';
            dashboard.style.zIndex = '1000';
            dashboard.style.flexDirection = 'row';
            dashboard.style.paddingTop = '0px';
            dashboard.style.flex = '0.8 1';
            dashboard.style.maxHeight = '60px';

            if (document.querySelector('#photolink')){
                document.querySelector('#photolink').style.display = 'none';
            }

            // make profile pic go on top
            if (document.querySelector('.intro')){
                document.querySelector('.intro').style.display = "flex";
                document.querySelector('.intro').style.flexDirection = "column";
            }
            if (document.querySelector("#mainpic") && document.querySelector("#mainpic2")) {
                document.querySelector("#mainpic").style.display = 'block';
                document.querySelector("#mainpic2").style.display = 'none';
            }  

            if (document.querySelector('#t1')){
                document.querySelector('#t1').style.width = "100%";
            }

            // Changing introduction slide
            if (document.querySelector('#introcard')) {
                document.querySelector('#introcard').style.height = '';
                document.querySelector('#introcard').style.width = '';
            }

            document.querySelector('.glass').style.display = 'flex';
            document.querySelector('.glass').style.flexDirection = 'column';
            document.querySelector('.glass').style.width = `${window.innerWidth-30}px`;
            document.querySelector('.glass').style.height = `${window.innerHeight-5}px`;
            document.querySelector('#slider-parent').style.position = 'fixed';
            document.querySelector('#slider-parent').style.width = '100%';

            // Getting navbar to mobile view
            var slider = document.querySelector('.slider');
            slider.style.width = '25%';
            var bar = document.querySelector('#bar');
            bar.style.height = '100%';
            document.querySelector('#slider-parent').style.minHeight = '0em'; //10em
            document.querySelector('#slider-parent').style.height = '60px';
            if (document.querySelector('.links')){
                document.querySelector('.links').style.alignItems = 'center';
                document.querySelector('.links').style.flexDirection = 'row';
            } 
            document.querySelector('.bar').style.background = '#1d508f';
            document.querySelector('.section').style.marginTop = '0rem';
            //********************/

            if (document.querySelector("main")) {
                document.querySelector("main").style.alignItems = 'baseline';
            }

            if (document.querySelector(".timeline-container")) {
                document.querySelector(".timeline-container").style.paddingLeft = '0px';
            }
            
            if (document.querySelector('.links') && document.querySelector('.slider')) {
                document.querySelector('.links').style.paddingTop = '0rem';
                document.querySelector('.slider').style.paddingTop = '0rem';
                document.querySelector('.slider').style.marginTop = '0rem';
            }
            if (document.querySelector('.un')) {
                var x = document.querySelectorAll('.un');
                x.forEach( y => {
                    y.style.paddingTop = '0%';
                })
            }

            if (document.querySelectorAll('.status')) {
                var x = document.querySelectorAll('.status');
                x.forEach( y => {
                    y.firstChild.style.fontSize = '2rem';
                })
            }

            if (document.querySelector('#phonepacman')) {
                document.querySelector('#phonepacman').style.display = 'block';
                document.querySelector('#phonepacman').style.width = '95%';
            }

            if (document.querySelector('#widepacman')) {
                document.querySelector('#widepacman').style.display = 'none';
            }

            if (document.querySelector('.contact-container')) {
                document.querySelector('.contact-container').style.display = 'contents';
            }


            if (document.querySelector('.section')) {
                document.querySelector('.section').style.marginLeft = '0rem';
                document.querySelector('.section').style.marginRight = '0rem';
            }
            if (document.querySelector('.section')) {
                document.querySelector('.section').style.paddingLeft = '1%';
                document.querySelector('.section').style.paddingRight = '1%';
            }

            document.querySelectorAll('.user').forEach(element => {
                element.style.visibility = 'hidden';
            });

        
            if (document.querySelector('#nameDiv')) {
                document.querySelector('#nameDiv').style.margin = '0rem';
                document.querySelector('#nameDiv').style.marginLeft = '0rem';
            }

            if (document.querySelector('#div0')) {
                document.querySelector('#div0').style.zoom = '0.6';
            }

            if (document.querySelector('#nonintro')) {
                document.querySelector('#nonintro').style.width = '100%';
            }

            if (document.querySelector(".cards .fade-section")) {
                document.querySelector(".cards .fade-section").style.width = '100%';
            }


            document.querySelectorAll('.card-info .work').forEach(element => {
                element.style.display = 'block';
            });

            /*document.querySelectorAll('p').forEach(element => {
                element.style.fontSize = '20px';
            });*/

            document.querySelectorAll('.social-link svg').forEach(element => {
                element.style.width = '2.5em';
                element.style.height = '2.5em';
            });

            document.querySelectorAll('#workedDates').forEach(element => {
                element.style.zoom = '0.8';
            });

            document.querySelectorAll('p').forEach(element => {
                element.style.fontSize = "clamp(16px, 5dvw, 25px)";
            });
            document.querySelectorAll('h2').forEach(element => {
                element.style.fontSize = "30px";
            });

            if (document.querySelector('#contactSection')) {
                document.querySelector('#contactSection').style.padding = '2rem';
            }

            /* TIMELINE VISIBILITY */
            if (document.querySelector('.timeline-container') && document.querySelector('.timeline-line')){
                document.querySelectorAll('.timeline-container').forEach(element => {
                    element.style.display = 'block';
                });
                document.querySelectorAll('.timeline-line').forEach(element => {
                    element.style.visibility = 'hidden';
                });
                if (document.querySelector('.section')) {
                    document.querySelector('.section').style.marginLeft = '0rem';
                    document.querySelector('.section').style.paddingRight = '0rem';
                }
            }

            // Project Grid/Not Grid
            if (document.querySelector('#t4 .cards')) {
                const el = document.querySelector('#t4 .cards');
                el.style.display = 'inherit';
            }

        } else if (portrait_previously) {
            // LANDSCAPE VIEW
            /*-----*/
            portrait_previously = false
            // UNDO EVERYTHING IN THE PREVIOUS SECTION OF THIS IF STATMENT //
            

            // Project Grid/Not Grid
            if (document.querySelector('#t4 .cards')) {
                const el = document.querySelector('#t4 .cards');
                el.style.display = 'grid';
            }

            /* TIMELINE VISIBILITY */
            if (document.querySelector('.timeline-container') && document.querySelector('.timeline-line')){
                document.querySelectorAll('.timeline-container').forEach(element => {
                    element.style.display = 'grid';
                });
                document.querySelectorAll('.timeline-line').forEach(element => {
                    element.style.visibility = 'visible';
                });
                if (document.querySelector('.section')) {
                    document.querySelector('.section').style.marginLeft = '0rem';

                    document.querySelector('.section').style.paddingLeft = '0rem';
                    document.querySelector('.section').style.paddingRight = '0rem';
                }
            }

            if (document.querySelector('#photolink')){
                document.querySelector('#photolink').style.display = 'block';
            }

            if (document.querySelector('#contactSection')) {
                document.querySelector('#contactSection').style.padding = '0rem';
            }

            document.querySelectorAll('.user').forEach(element => {
                element.style.visibility = 'visible';
            });

            document.querySelectorAll('p').forEach(element => {
                element.style.fontSize = "clamp(10px, 1.5dvw, 15px)";
            });
            document.querySelectorAll('h2').forEach(element => {
                element.style.fontSize = "25px";
            });

            // make profile pic go on the side
            if (document.querySelector('.intro')){
                document.querySelector('.intro').style.display = "flex";
                document.querySelector('.intro').style.flexDirection = "row";
            }
            if (document.querySelector("#mainpic") && document.querySelector("#mainpic2")) {
                document.querySelector("#mainpic").style.display = 'none';
                document.querySelector("#mainpic2").style.display = 'block';
            }  

            document.querySelector('.glass').style.width = '83%';
            document.querySelector('.glass').style.height = '360px';

            if (document.querySelector('#t1')){
                document.querySelector('#t1').style.width = "75%";
            }

            // Nav menu
            var slider = document.querySelector('.slider');
            slider.style.width = '100%';
            var bar = document.querySelector('#bar');
            bar.style.height = '20%';
            dashboard.style.maxHeight = '';
            document.querySelector('#slider-parent').style.minHeight = '10em';
            document.querySelector('#slider-parent').style.height = '';
            if (document.querySelector('.links')){
                document.querySelector('.links').style.alignItems = '';
                document.querySelector('.links').style.flexDirection = 'column';
            } 
            document.querySelector('.bar').style.background = 'linear-gradient(to right, rgba(0, 251, 255,1), rgba(0, 251, 255,0))';
            //document.querySelector('.section').style.marginTop = '1.5rem';

            // Changing introduction slide
            if (document.querySelector('#introcard')) {
                document.querySelector('#introcard').style.maxHeight = '';
                document.querySelector('#introcard').style.maxWidth = '';
            }

            if (document.querySelector("main")) {
                document.querySelector("main").style.alignItems = 'center';
            }

            document.querySelectorAll('.social-link svg').forEach(element => {
                element.style.width = '1em';
                element.style.height = '1em';
            });

            document.querySelectorAll('.card-info .work').forEach(element => {
                element.style.display = 'flex';
            });

            /*document.querySelectorAll('p').forEach(element => {
                element.style.fontSize = '15px';
            });*/

            if (document.querySelector('.card-info')) {
                document.querySelector('.card-info').style.margin = 'auto';
            }

            if (document.querySelector('#nameDiv')) {
                document.querySelector('#nameDiv').style.margin = 'auto';
                document.querySelector('#nameDiv').style.marginLeft = '3em';
            }

            if (document.querySelector(".timeline-container")) {
                document.querySelector(".timeline-container").style.paddingLeft = '50px';
            }
            

            if (document.querySelector(".cards .fade-section")) {
                document.querySelector(".cards .fade-section").style.width = '90%';
            }

            if (document.querySelector('.contact-container')) {
                document.querySelector('.contact-container').style.display = 'flex';
            }

            if (dashboard) {
                dashboard.style.display = 'inline-block';
                dashboard.style.position = 'static';
                dashboard.style.top = '';
                dashboard.style.zIndex = '';
                dashboard.style.flexDirection = 'column';
                dashboard.style.paddingTop = '3rem';
                dashboard.style.flex = '0.35 1';
            }

            if (document.querySelector('.glass') && document.querySelector('#slider-parent')) {
                document.querySelector('.glass').style.display = 'flex';
                document.querySelector('.glass').style.flexDirection = '';
                document.querySelector('#slider-parent').style.position = 'relative';
                document.querySelector('#slider-parent').style.width = '';
            }

            if (document.querySelector('.links') && document.querySelector('.slider')) {
                document.querySelector('.links').style.paddingTop = '0rem';
                document.querySelector('.slider').style.paddingTop = '';
                document.querySelector('.slider').style.marginTop = '0.5rem';
            }

            if (document.querySelector('.un')) {
                var x = document.querySelectorAll('.un');
                x.forEach( y => {
                    y.style.paddingTop = '8%';
                })
            }
            if (document.querySelector('#phonepacman')) {
                document.querySelector('#phonepacman').style.display = 'none';
                document.querySelector('#phonepacman').style.width = '95%';
            }
            if (document.querySelector('#widepacman')) {
                document.querySelector('#widepacman').style.display = 'block';
            }

            /*if (document.querySelector('.section')) {
                document.querySelector('.section').style.marginLeft = '5%';
                document.querySelector('.section').style.marginRight = '5%';
            }
            if (document.querySelector('.section')) {
                document.querySelector('.section').style.paddingLeft = '5%';
                document.querySelector('.section').style.paddingRight = '5%';
            }*/


            
            if (document.querySelectorAll('.status')) {
                var x = document.querySelectorAll('.status');
                x.forEach( y => {
                    y.firstChild.style.fontSize = '3rem';
                    y.firstChild.style.fontWeight = '600';
                })
            }

            if (document.querySelector('#nameDiv')) {
                document.querySelector('#nameDiv').style.margin = 'auto';
                document.querySelector('#nameDiv').style.marginLeft = '3em';
            }

            if (document.querySelector('#nonintro')) {
                document.querySelector('#nonintro').style.width = '75%';
            }

            if (document.querySelector('#div0')) {
                document.querySelector('#div0').style.zoom = '1';
            }


            document.querySelectorAll('#workedDates').forEach(element => {
                element.style.zoom = '1';
            });
            /*------*/

        } 


    }

    // Initial layout check
    updateLayout();

    // Listen for window resize events
    window.addEventListener("resize", updateLayout);
}