app.controller("PageController", function($scope, $timeout, $interval) {
    $scope.activeSection = 0;
    $scope.textHeight = 0;

    $scope.panels = [
	{"name":"Overview", "page":"pages/overview.html", "anchor":"overview"},
	{"name":"Download", "page":"pages/download.html", "anchor":"download"},
	{"name":"Get started", "page":"pages/getting_started.html", "anchor":"get_started"},
	{"name":"Demos", "page":"pages/demo.html", "anchor":"demos"},
	{"name":"Documentation", "page":"pages/documentation.html", "anchor":"doc"},
	//{"name":"Get involved", "page":"pages/involved.html", "anchor":""},
    ];


    var scrollSpeedMult = 0;
    var progressiveScrollTo = function (y) {
	scrollSpeedMult++;
	var delta = Math.round(scrollSpeedMult*(y-window.scrollY)*scrollSpeedMult/150);
	if (Math.abs(delta) < 5) window.scrollTo(0, y);
	else {
	    window.scrollTo(0, window.scrollY+delta);
	    setTimeout(progressiveScrollTo.curry(y), 50);
	}
    }
    
    $scope.scrollTo = function (id) {
	var coords = pageCoordinates(document.getElementById(id));
	scrollSpeedMult = 3;
	//window.scrollTo(0, coords.y - 50);
	progressiveScrollTo(coords.y - 50);
    }
    
    $scope.setSection = function (i) {
	$scope.activeSection = i;
	$timeout(function() {
	    var e = document.getElementById('panel-'+i);
	    if (e) $scope.textHeight = e.offsetHeight;}, 0);
    }

    $scope.slides = [
	{position: 0, text:"Master", photo:"images/slide-1.jpg", thumbnail:"images/thumb-profile-1.png", color:"#eea", textOpacity: 0, bullets:[
	    {text:"First steps in the scientific community"},
	    {text:"Compare your work with existing references"}]
	},
	{position: 1, text:"Ph.D.", photo:"images/slide-2.jpg", thumbnail:"images/thumb-profile-2.png", color:"#aae", textOpacity: 0, bullets:[
	    {text:"Keep track of large amount of code and experiments"},
	    {text:"Make your experimental results publishable"},
	    {text:"Stay focused and efficient on the long run"}]
	},
	{position: 2, text:"Postdoctoral fellow", photo:"images/slide-3.jpg", thumbnail:"images/thumb-profile-3.png", color:"#aea", textOpacity: 0, bullets:[
	    {text:"Stay organized, with many different projects to juggle at once"},
	    {text:"Publish!"}]
	},
	{position: 3, text:"Tenured researcher", photo:"images/slide-4.jpg", thumbnail:"images/thumb-profile-4.png", color:"#eaa", textOpacity: 0, bullets:[
	    {text:"Easily switch between numerous projects"},
	    {text:"Keep your computer working for you while you're in meetings"},
	    {text:"Standardize the way your students organize their code and data"}]
	}
    ];

    var showBulletTimeouts = [];

    var hideBullets = function(slide) {
	var nbBullets = slide.bullets.length;
	var startY = -100;
	var endY = 500;
	$timeout(function() {
	    for (var i=0; i<nbBullets; i++)
		slide.bullets[i].style = {left:'810px', top:Math.round(startY+i*(endY-startY)/(nbBullets+1))+'px', opacity: 0, fontSize:'60px', width:'1400px'};
	}, 300);
    }

    var showBullet = function(slide, i) {
	var nbBullets = slide.bullets.length;
	var startY = 80;
	var endY = 280;
	slide.bullets[i].style = {left:'380px', top:Math.round(startY+i*(endY-startY)/(nbBullets+1))+'px', opacity: 1, fontSize:'18px', width:'400px'};
    }

    var showBullets = function (slide) {
	for (var i=0, l=slide.bullets.length; i<l; i++)
	    showBulletTimeouts.push($timeout(showBullet.curry(slide, i), 800+2500*i/l));
    }
    
    var targetSlide = null;

    $scope.cycleTo = function (slide) {
	targetSlide = slide;
	$scope.cycleSlides();
    }

    $scope.cycleSlides = function(dir) {
	if (targetSlide) {
	    $interval.cancel($scope.profileInterval);
	    if (targetSlide.position == 0) {
		targetSlide = null;
		return;
	    } else {
		dir = targetSlide.position / Math.abs(targetSlide.position);
	    }
	} else if (dir) {
	    if (dir<0) dir = -1;
	    else dir = 1;
	    $interval.cancel($scope.profileInterval);
	} else {
	    dir = 1;
	}
	showBulletTimeouts.forEach(function(t){$timeout.cancel(t);});
	showBulletTimeouts = [];
	for (var s=0, nbSlides = $scope.slides.length; s<nbSlides; s++) {
	    var slide = $scope.slides[s];
	    slide.position -= dir;
	    slide.opacity = (!slide.position || dir*slide.position==-1) ? 1 : 0;
	    if (slide.position == 0)
		showBullets(slide);
	    else
		hideBullets(slide);
	    if (dir*slide.position <= -2)
		slide.position += dir*nbSlides;
	}
	if (targetSlide) $scope.cycleSlides();
    }

    for (var s=0, nbSlides = $scope.slides.length; s<nbSlides; s++)
	hideBullets($scope.slides[s]);
    

    $timeout(showBullets.curry($scope.slides[0]), 1000);
    
    $scope.profileInterval = $interval($scope.cycleSlides.curry(0), 5000);
    
    $scope.$on('$includeContentLoaded', function (e) {console.log(e); $scope.setSection(0);})
    $scope.setSection(0);

    $scope.isAbsolute = true;
    $scope.absoluteStyle = {position:"absolute", top: "100px", left:"10px"};
    $scope.fixedStyle = {position:"fixed", top: "0px", left:"10px"};
    window.addEventListener("optimizedScroll", function () {
	if (window.scrollY > 200 && $scope.isAbsolute)
	    $scope.$apply("isAbsolute = false");
	else if (window.scrollY <= 200 && !$scope.isAbsolute)
	    $scope.$apply("isAbsolute = true");
    });
    
});
