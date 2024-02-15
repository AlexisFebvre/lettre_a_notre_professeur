let textBox = undefined;

console.log(textBox);

let lines = [
    "Pour nous avoir suporté pendant ce début d'année",
    "Nous avons décidé de vous remercier",
    "Pour nous avoir appris la passion informatique",
    "Nous vous avons concocté ce poème lyrique",
    "Que-dis-je ? Cette page idyllique",
    "Alors prenez place dans votre chaise",
    "Afin que cette experience vous mette à votrre aise."
]

// ANIMATIONS
const fadeOutSteps = [
    {opacity:1},
    {opacity:0}
];
const fadeInSteps = [
    {opacity:1},
    {opacity:0}
];
const fadeTiming = {
        duration:1000,
        iteration:1
};


let lineIndex = 0;
let nextTextIntervalBuffer = undefined;
function NextText() {
    // stop when finished
    if (lineIndex >= lines.length-1) {
        clearInterval(nextTextIntervalBuffer);
        nextTextIntervalBuffer = undefined 
        // canStart = true;

        // make the up btn appear

    }

    // fade out
    textBox.style.opacity = 0
    textBox.animate(fadeInSteps, fadeTiming);
    console.log("Fade out");

    // wait for the previous anim to finish
    setTimeout(()=> {
        // modify text
        textBox.innerText = lines[lineIndex];
        lineIndex++;

        // fade in
        textBox.style.opacity = 1
        textBox.animate(fadeOutSteps.reverse(), fadeTiming);
        console.log("Fade in");
    }, 2100)

}



let canStart = true;
function StartPoeme() {
    if (!canStart)
        return

    // else
    textBox =  document.getElementsByClassName("poem")[0];

    canStart = false;

    console.log("Poeme started")
    nextTextIntervalBuffer = setInterval(NextText, 6000);
}


