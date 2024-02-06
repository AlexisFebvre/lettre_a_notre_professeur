
/*falling petals properties*/
const MaxPetalTop = window.innerHeight-(0.2*window.innerHeight);
console.log(`Max petal top: ${MaxPetalTop}`);

var petal1 = document.getElementById("petal 1");
var petal2 = document.getElementById("petal2");
var infos = document.getElementById("background");

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
