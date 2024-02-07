
/*falling petals properties*/
var body = document.body;
var html = document.documentElement;
var MaxPetalTop = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight ) *0.8;
console.log(`Max petal top: ${MaxPetalTop}`);

const endOfPage = window.innerHeight;
const animationTime = 10;



var petal1 = document.getElementById("petal 1");
var petal2 = document.getElementById("petal2");
var petal3 = document.getElementById("petal3");

var infos = document.getElementById("background");



// BY CHATGPT //
// le code est bon, mais j'ai l'impréssion que les fonctions de scrolls sont trop demandantes en ressources donc c'est random, ça a pas bonne vitesse, bref c'est broken
function scrollToBottom(scrollTimeInSeconds) {
    const body = document.body;
    const html = document.documentElement;
    const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const targetScrollY = height;
    const currentScrollY = window.scrollY;
    const framesPerSecond = 1;
    const totalFrames = scrollTimeInSeconds * framesPerSecond;
    const distanceToScroll = targetScrollY - currentScrollY;
    const step = distanceToScroll / totalFrames;

    function animateScroll(frame) {
      if (frame < totalFrames) {
        window.scrollBy(0, step);
        requestAnimationFrame(() => animateScroll(frame + 1));
      } else {
        window.scrollTo(0, targetScrollY); // Ensure we reach the exact target position
      }
    }

    animateScroll(0);
  }


  function followAnimatedDiv() {
    const animatedDiv = document.getElementById('petal3');
    var updateIntervalBuffer = undefined;

    function updateScroll() {
      const animatedDivRect = animatedDiv.getBoundingClientRect();
      const scrollLeft = animatedDivRect.left + window.scrollX - (window.innerWidth / 2) + (animatedDivRect.width / 2);
      const scrollTop = animatedDivRect.top + window.scrollY - (window.innerHeight / 2) + (animatedDivRect.height / 2);

      window.scrollTo({
        left: scrollLeft,
        top: scrollTop,
        behavior: 'instant'
      });

      /*Scroll limits*/
      if (scrollTop >= MaxPetalTop)
        clearInterval(updateIntervalBuffer);

    }

    // Update the scroll position whenever the animatedDiv changes position
    updateIntervalBuffer = setInterval(updateScroll, 1000 / 60); // Adjust the interval as needed
  }

  // Trigger the scroll function when the page loads with a scroll time of 5 seconds (you can change this value)
petal3.addEventListener('click', () => {
    /* Scroll to get the pedal in center of the screen*/
    const petalRect = petal3.getBoundingClientRect();
    window.scrollTo({
        left: petalRect.left + window.scrollX - (window.innerWidth / 2) + (petalRect.width / 2),
        top: petalRect.top + window.scrollY - (window.innerHeight / 2) + (petalRect.height / 2),
        behavior:'smooth'
    });
    // wait so the scroll get time to append
    setTimeout(() => {
        // Set the animation by changing the class name
        petal3.className = "x y animated";
        
        console.log("Petal 3 clicked")
        followAnimatedDiv();
    }, 1000);
});








// Animation of follow the falling petal
petal1.addEventListener("click", () => {
    // Set the animation by changing the class name
    petal1.style.animation = "petal 10s, gravity 10s;";
    petal1.className = "x y animated";

    // choose between one of the following aniamtion 
    // Set the interval
    var petalInterval = setInterval(()=>{ petalFollow(petal1, petalInterval) }, 1000);
})

// Animation of simple scroll
petal2.addEventListener("click", () => {
    // Set the animation by changing the class name
    petal2.style.animation = "petal 10s, gravity 10s;";
    petal2.className = "x y animated";

    // choose between one of the following aniamtion 
    petalFallSimpleScroll();
})

// just go down and wait for petal
function petalFallSimpleScroll() {
    infos.scrollIntoView({ behavior:'smooth' });
}

function petalFollow(_petal, _petalInterval) {
    // check for stop
    if (_petal.getBoundingClientRect().top >= MaxPetalTop)
    {
        clearInterval(_petalInterval)
    }
    else {
        // else 
        console.log("Scroll\n" + _petal.getBoundingClientRect().top);
        // window.scrollTo(0, _petal.getBoundingClientRect().top);
        _petal.scrollIntoView({behaviour:'smooth'});

    } 

}
