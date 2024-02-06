
let center = document.getElementById("center");
let infos = document.getElementById("background");

function scrollToInfos() {
    // window.scroll(0, window.innerHeight*3);
    // console.log(infos.top);
    // console.log("Scroll");
    // infos.scrollIntoView({behaviour:'smooth'});
    var yPos = center.getBoundingClientRect().top + window.scrollX;
    smoothScrollBy(yPos, 2);
}

center.addEventListener("click", scrollToInfos);

var speed = undefined
var iterations = undefined
var animationIntervale = undefined;
/**
 * Scroll smoothly and with a set speed to a position
 * @param {Int} posY the Y position of the target (in px)
 * @param {Float} time the time it'll take to get to the target in seconds
 */
function smoothScrollBy(posY, time) {
    const refreshRate = 10 // in ms
    // Calculate the speed -> speed in px/ms
    speed = posY/time*refreshRate; // px*ms*s-1

    // Calculate the iterations
    console.log(`Speed before: ${speed}`);
    iterations = speed/posY;
    console.log(`Speed after: ${speed}`);

    console.log(iterations);

    // launch the function
    currentIteration = 0;

    setTimeout(() => {
        console.log(`
        Speed: ${speed}
        Iterations! ${iterations}
        PosY: ${posY}
        Time: ${time}
        RefreshRate: ${refreshRate}`);
        animationIntervale = setInterval(smoothScrollByInterval, refreshRate);
    }, 1000);
    
}

var currentIteration = 0;
function smoothScrollByInterval() {

    console.log(`
        Speed: ${speed}
        Iterations! ${iterations}
        `);

    window.scrollBy(0, speed);

    // check for the end
    currentIteration++;
    if (currentIteration >= iterations+90) {
        clearInterval(animationIntervale);
        currentIteration = 0;
    }
}