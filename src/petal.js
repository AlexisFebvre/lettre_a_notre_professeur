/*falling petals properties*/
var body = document.body;
var html = document.documentElement;
var MaxPetalTop = Math.max(body.scrollHeight, body.offsetHeight,
  html.clientHeight, html.scrollHeight, html.offsetHeight) * 0.75;
console.log(`Max petal top: ${MaxPetalTop}`);

const endOfPage = window.innerHeight;
const animationTime = 10;

var infos = document.getElementById("background");



// GETTING ALL THE PETALS //
var petalParent = document.getElementById("petal-parent");
var petals = [].slice.call(petalParent.children);


// APPLY A LISTENER FOR EVERY PETALS //
petals.forEach(p => {
  // get petal index by removing the "petal" out of his id
  const petalIndex = parseInt(p.id.replace("petal", ""));
  p.addEventListener('click', () => {

    // Scroll to the petal
    const pRect = p.getBoundingClientRect();
    window.scrollTo({
      left: pRect.left + window.scrollX - (window.innerWidth / 2) + (pRect.width / 2),
      top: pRect.top + window.scrollY - (window.innerHeight / 2) + (pRect.height / 2),
      behavior: 'smooth'
    });

    // Wait few miliseconds for the scrolling animation to finish
    setTimeout(() => {
      // Change the infos pages
      changeInfoPage(petalIndex);

      // Add the animation by changing the class
      p.className += " animated";

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
    if (scrollTop >= MaxPetalTop) {
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
    left: scrollLeft,
    top: scrollTop,
    behavior: 'smooth'
  });
  console.log("Center on infos");
}


// INFOS LOADING //
const dafaultPage = "<h1>Error 404</h1>";

const pages = [
  // Page 1
  `<h1>This is page 1!</h1>`,
  // Page ingénieur informaticien
  `<h1 id="mainTitle">Ingénieur informaticien!</h1>
  <div class="wrapper" id="infos">
      <div class="box" id="ingenieur">
          <h3 class="subtitle" id="ingenieur">Ingénieur informaticien:</h4>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/rlarCLhzfoU?si=WZG5dRsX9VFfXDXJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>

      <div class="box" id="expert-python">
          <h3 class="subtitle" id="expert-python">Expert python:</h3>
          
      </div>
  </div>`
];


function changeInfoPage(pageIndex) {
  if (pageIndex > pages.length-1) {
    console.log("ERROR: pageIndex out of bounds");
    infos.innerHTML = dafaultPage;
    return;
  }
  // else
  infos.innerHTML = pages[pageIndex];
}