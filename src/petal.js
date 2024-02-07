
/*falling petals properties*/
var body = document.body;
var html = document.documentElement;
var MaxPetalTop = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight ) *0.75;
console.log(`Max petal top: ${MaxPetalTop}`);

const endOfPage = window.innerHeight;
const animationTime = 10;

var infos = document.getElementById("background");



// GETTING ALL THE PETALS //
var petalParent = document.getElementById("center");
var petals = [].slice.call(petalParent.children);


// APPLY A LISTENER FOR EVERY PETALS //
petals.forEach(p => {
    p.addEventListener('click', () => {

      // Scroll to the petal
    const pRect = p.getBoundingClientRect();
    window.scrollTo({
      left: pRect.left + window.scrollX - (window.innerWidth / 2) + (pRect.width / 2),
      top:  pRect.top + window.scrollY - (window.innerHeight / 2) + (pRect.height / 2),
      behavior:'smooth'
    });

    // Wait few miliseconds for the scrolling animation to finish
    setTimeout(()=>{
      // Add the animation by changing the class
      p.className +=  " animated";

      // Follow the flower
      folowAnimatedPetal(p);

    }, 1000);


    });
});




// MERCI CHATGPT //
  function folowAnimatedPetal(_petal) {
    const _p = _petal;
    var updateIntervalBuffer = undefined;

    function updateScroll() {
      /* Calculate where to scroll */
      const animatedDivRect = _p.getBoundingClientRect();
      const scrollLeft = animatedDivRect.left + window.scrollX - (window.innerWidth / 2) + (animatedDivRect.width / 2);
      const scrollTop = animatedDivRect.top + window.scrollY - (window.innerHeight / 2) + (animatedDivRect.height / 2);

      /* Scroll, WARNING => use behaviour:'instant' */
      window.scrollTo({
        left: scrollLeft,
        top: scrollTop,
        behavior: 'instant'
      });

      /*Scroll limits*/
      if (scrollTop >= MaxPetalTop)
      {
        clearInterval(updateIntervalBuffer);
        centerOnInfos();
      }
        

    }

    // Update the scroll position whenever the animatedDiv changes position
    updateIntervalBuffer = setInterval(updateScroll, 1000 / 60); // Adjust the interval as needed
  }


function centerOnInfos() {
  /* Calculate where to scroll */
  const iRect = infos.getBoundingClientRect();
  const scrollLeft = iRect.left + window.scrollX - (window.innerWidth / 2) + (iRect.width / 2);
  const scrollTop = iRect.top + window.scrollY - (window.innerHeight / 2) + (iRect.height / 2);
  infos.scrollIntoView();

  /*Scroll to infos*/
  window.scrollTo({
    left:scrollLeft,
    top:scrollTop,
    behavior:'smooth'
  });
}
