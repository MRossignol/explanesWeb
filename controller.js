app.controller("PageController", function($scope, $timeout, $interval) {
    $scope.activeSection = 0;
    $scope.textHeight = 0;

    $scope.panels = [
	{"name":"Demo", "page":"pages/demo.html"},
	{"name":"Overview", "page":"pages/overview.html"},
	{"name":"Get started", "page":"pages/getting_started.html"},
	{"name":"Documentation", "page":"pages/documentation.html"},
	{"name":"Get involved", "page":"pages/involved.html"},
    ];

    $scope.setSection = function (i) {
	$scope.activeSection = i;
	$scope.textHeight = document.getElementById('panel-'+i).offsetHeight;
    }

    $scope.slides = [
	{position: 0, text:"Master", photo:"images/slide1.jpg", color:"#eea", textOpacity: 0, bullets:[
	    {text:"bullet 1"},
	    {text:"bullet 2"}]
	},
	{position: 1, text:"Ph.D.", photo:"images/slide2.jpg", color:"#aae", textOpacity: 0, bullets:[
	    {text:"bullet 1"},
	    {text:"bullet 2"},
	    {text:"bullet 3"},
	    {text:"bullet 4"}]
	},
	{position: 2, text:"Postdoctoral fellow", photo:"images/slide3.jpg", color:"#aea", textOpacity: 0, bullets:[
	    {text:"bullet 1"},
	    {text:"bullet 2"}]
	},
	{position: 3, text:"Tenured researcher", photo:"images/slide4.jpg", color:"#eaa", textOpacity: 0, bullets:[
	    {text:"bullet 1"},
	    {text:"bullet 2"},
	    {text:"bullet 3"}]
	}
    ];

    var hideBullets = function(slide) {
	var nbBullets = slide.bullets.length;
	var startY = -100;
	var endY = 500;
	for (var i=0; i<nbBullets; i++)
	    slide.bullets[i].style = {left:'810px', top:Math.round(startY+i*(endY-startY)/(nbBullets+1))+'px', opacity: 0, fontSize:'60px'};
    }

    var showBullet = function(slide, i) {
	var nbBullets = slide.bullets.length;
	var startY = 80;
	var endY = 280;
	slide.bullets[i].style = {left:'300px', top:Math.round(startY+i*(endY-startY)/(nbBullets+1))+'px', opacity: 1, fontSize:'18px'};
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
	$timeout(function () {
	    for (var i=0; i<nbSlices; i++) {
		slide.slices[i].x = slide.slices[i].targetX+(slide.slices[i].targetX-slide.slices[i].x)/2;
		slide.slices[i].w = slide.slices[i].targetW/3;
	    }}, 0);
	$timeout(function () {
	    for (var i=0; i<nbSlices; i++) {
		slide.slices[i].x = slide.slices[i].targetX;
		slide.slices[i].w = slide.slices[i].targetW;
		slide.textOpacity = 1;
		console.log(slide.slices[i]);
	    }}, 300);
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
    
    showSlide($scope.slides[0]);
    
    $interval(cycleSlides, 5000);
    
});
