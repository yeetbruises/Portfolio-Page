let count = 0
let portrait_previously = false

export default function resized() {
    
        function isPortrait() {
            console.log(window.innerHeight);
            console.log(window.innerWidth);
            return window.innerHeight > window.innerWidth;

        }

        function updateLayout() {
            const dashboard = document.querySelector('.dashboard'); // Ensure this is your target element

            // Check if the screen is in portrait mode
            if (isPortrait() && dashboard && document.querySelector('#slider-parent')) {
                portrait_previously = true;
                //console.log("it is portrait");
                // Apply CSS styles for portrait mode
                dashboard.style.display = 'flex';
                dashboard.style.position = 'relative';
                dashboard.style.top = '0';
                dashboard.style.zIndex = '1000';
                dashboard.style.flexDirection = 'row';
                dashboard.style.paddingTop = '0px';
                dashboard.style.flex = '0.8 1';

                document.querySelector('.glass').style.display = 'flex';
                document.querySelector('.glass').style.flexDirection = 'column';
                document.querySelector('.glass').style.width = `${window.innerWidth-30}px`;
                document.querySelector('.glass').style.height = `${window.innerHeight-80}px`;
                document.querySelector('#slider-parent').style.position = 'fixed';
                document.querySelector('#slider-parent').style.width = '100%';

                if (document.querySelector('#div0') && document.querySelector('.user')) {
                    // Append myDiv to containerDiv
                    document.querySelector('#div0').prepend(document.querySelector('.user'));
                    
                    if (!document.querySelector(".hr1")) {
                        const hrElement = document.createElement('hr');
                        hrElement.className = "hr1";
                        hrElement.style.border = '1px solid white';
                        hrElement.style.margin = '0.5em 0px';
                        document.querySelector('#div0').insertBefore(
                            hrElement, document.querySelector('#div0').children[1]
                        )                    
                    }

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

                if (document.querySelector('.section')) {
                    document.querySelector('.section').style.marginLeft = '1rem';
                    document.querySelector('.section').style.marginRight = '1rem';
                }
            } else if (portrait_previously) {
                /*-----*/
                portrait_previously = false
                // UNDO EVERYTHING IN THE PREVIOUS SECTION OF THIS IF STATMENT //

                document.querySelector('.glass').style.width = '83%';
                document.querySelector('.glass').style.height = '20em';
                

                if (dashboard) {
                    dashboard.style.display = 'inline-block';
                    dashboard.style.position = 'static';
                    dashboard.style.top = '';
                    dashboard.style.zIndex = '';
                    dashboard.style.flexDirection = 'column';
                    dashboard.style.paddingTop = '3rem';
                    dashboard.style.flex = '0.5 1';
                }

                if (document.querySelector('.glass') && document.querySelector('#slider-parent')) {
                    document.querySelector('.glass').style.display = 'flex';
                    document.querySelector('.glass').style.flexDirection = '';
                    document.querySelector('#slider-parent').style.position = 'relative';
                    document.querySelector('#slider-parent').style.width = '';
                }

                if (document.querySelector('.links') && document.querySelector('.slider')) {
                    document.querySelector('.links').style.paddingTop = '1.5rem';
                    document.querySelector('.slider').style.paddingTop = '';
                    document.querySelector('.slider').style.marginTop = '1.5rem';
                }

                if (document.querySelector('.un')) {
                    var x = document.querySelectorAll('.un');
                    x.forEach( y => {
                        y.style.paddingTop = '8%';
                    })
                }

                if (document.querySelector('.section')) {
                    document.querySelector('.section').style.marginLeft = '5%';
                    document.querySelector('.section').style.marginRight = '5%';
                }


                if (document.querySelector('#div0') && document.querySelector('.user') && document.querySelector('#div0').children[1]) {

                    document.querySelector('#div0').children[1].remove(); //remove horizontal line

                    document.querySelector('.dashboard').prepend(document.querySelector('.user'));

                }

                if (document.querySelectorAll('.status')) {
                    var x = document.querySelectorAll('.status');
                    x.forEach( y => {
                        y.firstChild.style.fontSize = '3rem';
                        y.firstChild.style.fontWeight = '600';
                    })
                }

                /*------*/

            } 


        }

        // Initial layout check
        updateLayout();

        // Listen for window resize events
        window.addEventListener("resize", updateLayout);
}