app.controller("PageController", function($scope, $timeout, $interval) {
    $scope.activeSection = 0;
    $scope.textHeight = 0;

    $scope.panels = [
	{"name":"Overview", "page":"pages/overview.html", "anchor":"overview"},
	{"name":"Get started", "page":"pages/getting_started.html", "anchor":"get_started"},
	{"name":"Demos", "page":"pages/demo.html", "anchor":"demos"},
	{"name":"Documentation", "page":"pages/documentation.html", "anchor":"doc"},
	//{"name":"Get involved", "page":"pages/involved.html", "anchor":""},
    ];

    $scope.setSection = function (i) {
	$scope.activeSection = i;
	$timeout(function() {
	    var e = document.getElementById('panel-'+i);
	    if (e) $scope.textHeight = e.offsetHeight;}, 0);
    }

    $scope.slides = [
	{position: 0, text:"Master", photo:"images/slide-1.jpg", color:"#eea", textOpacity: 0, bullets:[
	    {text:"First steps in the scientific community"},
	    {text:"Compare your work with existing references"}]
	},
	{position: 1, text:"Ph.D.", photo:"images/slide-2.jpg", color:"#aae", textOpacity: 0, bullets:[
	    {text:"Keep track of large amount of code and experiments"},
	    {text:"Make your experimental results publishable"},
	    {text:"Stay focused and efficient on the long run"}]
	},
	{position: 2, text:"Postdoctoral fellow", photo:"images/slide-3.jpg", color:"#aea", textOpacity: 0, bullets:[
	    {text:"Stay organized, with many different projects to juggle at once"},
	    {text:"Publish!"}]
	},
	{position: 3, text:"Tenured researcher", photo:"images/slide-4.jpg", color:"#eaa", textOpacity: 0, bullets:[
	    {text:"Easily switch between numerous projects"},
	    {text:"Keep your computer working for you while you're in meetings"},
	    {text:"Standardize the way your students organize their code and data"}]
	}
    ];

    var hideBullets = function(slide) {
	var nbBullets = slide.bullets.length;
	var startY = -100;
	var endY = 500;
	for (var i=0; i<nbBullets; i++)
	    slide.bullets[i].style = {left:'810px', top:Math.round(startY+i*(endY-startY)/(nbBullets+1))+'px', opacity: 0, fontSize:'60px', width:'1400px'};
    }

    var showBullet = function(slide, i) {
	var nbBullets = slide.bullets.length;
	var startY = 80;
	var endY = 280;
	slide.bullets[i].style = {left:'380px', top:Math.round(startY+i*(endY-startY)/(nbBullets+1))+'px', opacity: 1, fontSize:'18px', width:'400px'};
    }

    var showBullets = function (slide) {
	for (var i=0, l=slide.bullets.length; i<l; i++)
	    $timeout(showBullet.curry(slide, i), 800+2500*i/l)
    }

    var nbSlices = 8;
    var showSlide = function (slide) {
	slide.slices = [];
	var width = 800;
	var sliceSizes = [];
	var total = 0;
	for (var i=0; i<nbSlices; i++) {
	    var r = .1+Math.random();
	    total += r;
	    sliceSizes.push(r);
	}
	var accW = 0;
	var acc = 0;
	for (var i=0; i<nbSlices; i++) {
	    var w = Math.round(800*((sliceSizes[i]+acc)/total))-accW;
	    slide.slices.push({
		x: Math.floor(800*Math.random()),
		w: 0,
		targetX: accW,
		targetW: w
	    });
	    accW += w;
	    acc += sliceSizes[i];
	}
	// $timeout(function () {
	//     for (var i=0; i<nbSlices; i++) {
	// 	slide.slices[i].x = slide.slices[i].targetX+(slide.slices[i].targetX-slide.slices[i].x)/2;
	// 	slide.slices[i].w = slide.slices[i].targetW/3;
	//     }}, 0);
	$timeout(function () {
	    for (var i=0; i<nbSlices; i++) {
		slide.slices[i].x = slide.slices[i].targetX;
		slide.slices[i].w = slide.slices[i].targetW;
		slide.textOpacity = 1;
	    }}, 0);
	showBullets(slide);
    }
    
    var cycleSlides = function() {
	for (var s=0, nbSlides = $scope.slides.length; s<nbSlides; s++) {
	    var slide = $scope.slides[s];
	    slide.position--;
	    if (slide.position == -2) {
		slide.position += nbSlides;
		slide.display = 'none';
		hideBullets(slide);
	    } else if (slide.position == -1) {
		slide.textOpacity = 0;
	    } else if (slide.position == 0) {
		slide.display='';
		showSlide(slide);
	    }
	}
    }

    for (var s=0, nbSlides = $scope.slides.length; s<nbSlides; s++)
	hideBullets($scope.slides[s]);
    
    $timeout(showSlide.curry($scope.slides[0]), 0);
    
    $interval(cycleSlides, 5000);
    
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
