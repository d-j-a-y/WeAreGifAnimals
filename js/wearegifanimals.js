/************************************************************************************/
// @source: transmission-libre.org                                                  */
/*                                                                                  */
/* WeAreGifAnimals , par Xavier Dubourdieu                                          */
/*                                                                                  */
/* @licstart  The following is the entire license notice for the JavaScript code in this page. ... */
/* @licstart  Ce qui suit est la totalité de la notice de licence pour le code JavaScript de cette page. ... */
/*                                                                                  */
/* Copyright (C)2015 Jerome Blanchi. The JavaScript code in this page is free       */
/* software: you can redistribute it and/or modify it under the terms of the GNU    */
/* General Public License (GNU GPL) as published by the Free Software Foundation,   */
/* either version 3 of the License, or (at your option) any later version.  The     */
/* code is distributed WITHOUT ANY WARRANTY; without even the implied warranty of   */
/* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU GPL for more   */
/* details. As additional permission under GNU GPL version 3 section 7, you may     */
/* distribute non-source (e.g., minimized or compacted) forms of that code without  */
/* the copy of the GNU GPL normally required by section 4, provided you include     */
/* this license notice and a URL through which recipients can access the            */
/* Corresponding Source.                                                            */
/*                                                                                  */
/* @licend  The above is the entire license notice for the JavaScript code in this page. */
/* @licend  Ce qui précède est la totalité de la notice de licence pour le code JavaScript de cette page. */
/*                                                                                  */
/* startRotate, stopRotate, rotateImage & getImageCentre  functions are             */
/* adapted from http://www.elated.com/articles/smooth-rotatable-images-css3-jquery/ */
/*                                                                                  */
/************************************************************************************/

var backgroundBank =     [
      './ressources/fond/bg_lastation.jpeg',
      './ressources/fond/bg_hublot.jpeg',
      './ressources/fond/bg_stroch.jpeg',
      './ressources/fond/bg_jardin.jpeg',
      './ressources/fond/bg_bibliotheque.jpeg',
      './ressources/fond/bg_garibaldi.gif'
     ];

var currentBackground = 0;                      // The actual background image index from backgroundBank table
var maxBackground = 0;                          // Size of the backgroundBank initialized in document.ready

var animemalBank = [{name:"abel", zindex:50, bottom:"10%", top:"auto", right:"auto", left:"2%", width: "120px", height:"auto" },
                    {name:"adam-c", zindex:20, bottom:"35%", top:"auto", right:"1%", left:"auto", width: "200px", height:"auto" },
                    {name:"adam-p", zindex:100, bottom:"auto", top:"8%", right:"auto", left:"40%", width: "130px", height:"auto" },
                    {name:"adam_panthere", zindex:100, bottom:"auto", top:"58%", right:"42%", left:"auto", width: "130px", height:"auto" },
                    {name:"alexandre_serpent", zindex:100, bottom:"auto", top:"18%", right:"auto", left:"10%", width: "130px", height:"auto" },
                    {name:"allya_renard", zindex:100, bottom:"auto", top:"8%", right:"auto", left:"40%", width: "130px", height:"auto" },
                    {name:"alicia", zindex:20, bottom:"auto", top:"40%", right:"20%", left:"auto", width: "400", height:"auto" },
                    {name:"amaury_komodo", zindex:100, bottom:"auto", top:"50%", right:"20%", left:"auto", width: "130px", height:"auto" },
                    {name:"amaury_panthere_rose", zindex:100, bottom:"auto", top:"60%", right:"auto", left:"25%", width: "100px", height:"auto" },
                    {name:"anais", zindex:100, bottom:"auto", top:"45%", right:"auto", left:"25%", width: "140px", height:"auto" },
                    {name:"anis", zindex:100, bottom:"20%", top:"auto", right:"40%", left:"auto", width: "130px", height:"auto" },
                    {name:"arthus_chat", zindex:100, bottom:"25%", top:"auto", right:"30%", left:"auto", width: "130px", height:"auto" },
                    {name:"baptiste", zindex:50, bottom:"2%", top:"auto", right:"auto", left:"15%", width: "250px", height:"auto" },
                    {name:"bryan_renard", zindex:50, bottom:"20%", top:"auto", right:"auto", left:"5%", width: "200px", height:"auto" },
                    {name:"carmen", zindex:0, bottom:"auto", top:"30%", right:"auto", left:"25%", width: "150px", height:"auto" },
                    {name:"chanette", zindex:50, bottom:"auto", top:"45%", right:"auto", left:"5%", width: "120px", height:"auto" },
                    {name:"clement_homard", zindex:50, bottom:"auto", top:"25%", right:"auto", left:"15%", width: "160px", height:"auto" },
                    {name:"eddy", zindex:200, bottom:"auto", top:"38%", right:"3%", left:"auto", width: "200px", height:"auto" },
                    {name:"eline", zindex:200, bottom:"auto", top:"30%", right:"20%", left:"auto", width: "200px", height:"auto" },
                    {name:"falou", zindex:150, bottom:"45%", top:"auto", right:"15%", left:"auto", width: "120px", height:"auto" },
                    {name:"halima", zindex:50, bottom:"auto", top:"20%", right:"15%", left:"auto", width: "143px", height:"auto" },
                    {name:"iles_aigle", zindex:50, bottom:"auto", top:"40%", right:"35%", left:"auto", width: "143px", height:"auto" },
/*                    {name:"jordy", zindex:50, bottom:"0%", top:"auto", right:"35%", left:"auto", width: "150px", height:"auto" }, */
                    {name:"kaouthar", zindex:50, bottom:"auto", top:"10%", right:"35%", left:"auto", width: "150px", height:"auto" },
                    {name:"khalima_faucon", zindex:50, bottom:"auto", top:"20%", right:"55%", left:"auto", width: "120px", height:"auto" },
                    {name:"laetitia_ours", zindex:50, bottom:"auto", top:"30%", right:"15%", left:"auto", width: "120px", height:"auto" },
                    {name:"lylou", zindex:50, bottom:"auto", top:"5%", right:"30%", left:"auto", width: "150px", height:"auto" },
                    {name:"maria_chat", zindex:150, bottom:"auto", top:"27%", right:"auto", left:"52%", width: "90px", height:"auto" },
                    {name:"mira", zindex:50, bottom:"auto", top:"22%", right:"30%", left:"auto", width: "120px", height:"auto" },
                    {name:"milo", zindex:150, bottom:"2%", top:"auto", right:"auto", left:"45%", width: "100px", height:"auto" },
                    {name:"mohamed_chien", zindex:150, bottom:"5%", top:"auto", right:"auto", left:"30%", width: "180px", height:"auto" },
                    {name:"oceane", zindex:50, bottom:"auto", top:"40%", right:"auto", left:"40%", width: "180px", height:"auto" },
                    {name:"pablo", zindex:50, bottom:"auto", top:"3%", right:"auto", left:"10%", width: "180px", height:"auto" },
                    {name:"prescillia_tortue", zindex:150, bottom:"20%", top:"auto", right:"20%", left:"auto", width: "120px", height:"auto" },
                    {name:"renda", zindex:50, bottom:"25%", top:"auto", right:"auto", left:"15%", width: "150px", height:"auto" },
                    {name:"ryan_lion", zindex:50, bottom:"30%", top:"auto", right:"auto", left:"35%", width: "100px", height:"auto" },
                    {name:"sarra_cheval", zindex:50, bottom:"60%", top:"auto", right:"auto", left:"3%", width: "130px", height:"auto" },
                    {name:"sherine_tigre", zindex:50, bottom:"58%", top:"auto", right:"3%", left:"auto", width: "130px", height:"auto" },
                    {name:"sondes", zindex:50, bottom:"55%", top:"auto", right:"auto", left:"10%", width: "150px", height:"auto" },
                    {name:"tania", zindex:50, bottom:"5%", top:"auto", right:"20%", left:"auto", width: "188px", height:"auto" },
                    {name:"wadah", zindex:150, bottom:"20%", top:"auto", right:"5%", left:"auto", width: "220px", height:"auto" },
                    {name:"wallid", zindex:150, bottom:"2%", top:"auto", right:"5%", left:"auto", width: "120px", height:"auto" },
                    {name:"xavier", zindex:150, bottom:"auto", top:"15%", right:"auto", left:"25%", width: "140px", height:"auto" },
                    {name:"xaviera_escargot", zindex:100, bottom:"5%", top:"auto", right:"auto", left:"52%", width: "140px", height:"auto" },
                    {name:"xaviera_sirene", zindex:100, bottom:"auto", top:"13%", right:"4%", left:"auto", width: "140px", height:"auto" },
                    {name:"zinedine", zindex:150, bottom:"auto", top:"5%", right:"15%", left:"auto", width: "170px", height:"auto" }];


var imageBeingRotated = false;  // The DOM image currently being rotated (if any)
var mouseStartAngle = false;    // The angle of the mouse relative to the image centre at the start of the rotation
var imageStartAngle = false;    // The rotation angle of the image at the start of the rotation

var indexCloned = 0;                            // Index of clone ID, use to duplicate the animals
/*var imagesCount = 25;	*///
var currentFactor = 1;                          // Resize factor for responsive design
var menuBasOriginalWidth ;                      //
var menuBasOriginalHeight;
var menuBasOriginalBottom;
var menuHautOriginalFontSize ;                  //

/* jquery document ready */
$(function() {
	window.onresize=function(){updateSceneSize();};
	
	$( ".draggable" ).draggable({ start: dragStart } ); // Make the animal draggable
	$( ".resizable" ).resizable({ aspectRatio : true , handles : "se" } ); // Make the animal resizable respecting the ratio and only from south-east corner

	$( ".rotatable").each(function (index){   // Make the animal rotatable	 
		var elementParent = $(this)[0].parentNode;	
		$.data(elementParent, 'currentRotation', 0 ); 
		$(this).mousedown( startRotate );
	});
    
	// Add an event handler to stop the rotation when the mouse button is released
	$(document).mouseup( stopRotate );
	
	$( ".duplicatable").each(function (index){
		$(this).click( duplicate);
	});
	
	$( ".animemal").each(function(index){  // Hide UI
		$(this).mouseover( showUI );
		$(this).mouseout( hideUI );
	}); 
	
	maxBackground = backgroundBank.length-1;
	menuBasOriginalWidth = parseInt($('#menubas').css('width'));
	menuBasOriginalHeight = parseInt($('#menubas').css('height'));
	menuBasOriginalBottom = parseInt($('#menubas').css('bottom'));
	menuHautOriginalFontSize = parseInt($('a.menuhaut').css('font-size'));
	
	resetAnimemalsPosition();	
	updateSceneSize();
});

function updateProgressBarTest(){ 
	var val = $('#loading strong').html(txt); 

	if(parseInt(val)>=90){	$('#progress').addClass("hidetransition");}

	console.log(val);
	
	var newVal = parseInt(val)+Math.ceil(100/animemalBank.length-1);
	var txt = Math.ceil(newVal)+'%'; 
	$('#loading strong').html(txt); 
}

function updateProgressBar(){ 
	var val = $('#progress progress').attr('value'); 
	var val2 = document.getElementById("progresselement").getAttribute('value');
/*
	if(val>=90){
		$('#progress').addClass("hidetransition");
	}
*/
//DEBUG
//	console.log("val " + val + ", val2 " + val2 )

	if(val2>=90){
		var progressClasses = document.getElementById("progress").className + " " + "hidetransition";
		document.getElementById("progress").className = progressClasses;
	}

	var newVal = parseInt(parseFloat(val)+parseFloat((100/(animemalBank.length-5)))); 

//DEBUG
//	console.log("newval " + newVal + "animemalBank.length" + animemalBank.length)	

	if(newVal > 100) {newVal = 100;}
	var txt = Math.ceil(newVal)+'%'; 
	$('#progress progress').attr('value',newVal).text(txt); 
	$('#progress strong').html(txt); 
}

function footerAfficheMenu(){
	// Change the background image
	var imagefond = document.body.style.backgroundImage;	
	document.body.style.backgroundImage = 'url(./ressources/fond/background-nb.jpeg)';
	
	var animals = document.getElementsByClassName("animemal");
	var i, all;
	for(i = 0, all =  animals.length ; i < all; i+=1) {
		animals[i].style.visibility = 'hidden';
	}
	
	var flips = document.getElementsByClassName("uielements");
	for(i = 0, all = flips.length; i < all; i+=1) {
		flips[i].style.visibility = 'hidden';
	}

	var menuhauts = document.getElementsByName("menuhaut");
	for(i = 0, all = menuhauts.length; i < all; i+=1) {
		menuhauts[i].style.visibility = 'visible';
	}

	// Update the event handler
	var divmenubas = document.getElementById("menubas");
	divmenubas.onclick = footerAfficheScene;
}

function footerAfficheScene(){
	// Restore the background image
	changebackground(0);

	var animals = document.getElementsByClassName("animemal");
	var i, all;
	for(i = 0, all = animals.length; i < all; i+=1) {
		animals[i].style.visibility = 'visible';
	}
	
	var flips = document.getElementsByClassName("uielements");
	for(i = 0, all = flips.length; i < all; i+=1) {
		flips[i].style.visibility = 'visible';
	}

	var menuhauts = document.getElementsByName("menuhaut");
	for(i = 0, all = menuhauts.length; i < all; i+=1){
		menuhauts[i].style.visibility = 'hidden';
	}

	// Update the event handler
	var divmenubas = document.getElementById("menubas");
	divmenubas.onclick = footerAfficheMenu;
}


function openMenu(menuHautToOpen){
	var menuHautsToClose = document.getElementsByName("menuhaut");
	var divToClose = menuHautsToClose.getElementsByTagName("div");
	for(var i = 0, all = divToClose.length; i < all; i+=1){
		divToClose[i].style.display = 'none';
	}

	document.getElementById(menuHautToOpen).style.display = 'block';
}


function changebackground(direction){	
	// Change the background image
	currentBackground+=direction;

	if(currentBackground < 0)
		currentBackground = maxBackground;
	else if (currentBackground > maxBackground)
		currentBackground = 0;

	document.body.style.backgroundImage = "url(" + backgroundBank[currentBackground] + ")";
}

// Update the scene to context client screen
function updateSceneSize() {
	
	var factor = 0.5;
	if (document.body.clientWidth > 1800){
		factor = 1.3;
	}else if (document.body.clientWidth > 1000){
		factor = 1;
	}else if (document.body.clientWidth > 800){
		factor = 0.8;
	}else if (document.body.clientWidth > 600){
		factor = 0.6;
	}
	
	if (factor != currentFactor){
		
		currentFactor = factor;
		
		// Update the size of all animals.
		for (var i = animemalBank.length-1 ; i >= 0 ; i-=1){
			var animemal = $("."+animemalBank[i].name)[0];
			animemal.style.width = getContextSize(parseInt(animemalBank[i].width), "px");
//			animemal.style.width = (parseInt(animemalBank[i].width) * factor)+"px";
		}

		// Update some ui elements size
		var menubas = $('#menubas');
		var menuhaut = $('a.menuhaut');
//		menubas.css('width', ((menuBasOriginalWidth * factor)+"px"));
		menubas.css('width', getContextSize(menuBasOriginalWidth, "px"));
		var menuBasBottom = menuBasOriginalBottom +  (parseInt(getContextSize(menuBasOriginalHeight, "")) - menuBasOriginalHeight);
		menubas.css('bottom', menuBasBottom + "px");
		menuhaut.css('font-size', getContextSize(menuHautOriginalFontSize, "px"));
//		menuhaut.css('font-size', ((menuHautOriginalFontSize * factor)+"px"));
		
		if (factor < 1) 
			$('div.menuhaut').css('padding', '1em 1em');
		else 
			$('div.menuhaut').css('padding', '1em 5em');		
	}

}

// Remove all the clone and reset animemal position to clean the scene
function cleanScene(){
	$('div[id^="clone"]').each(function(){
    $(this).remove();
	});
	resetAnimemalsPosition();
}

// Reset the positions of all animemal bank . (done first init and from cleanSceme)
function resetAnimemalsPosition(){
	for (var i = animemalBank.length-1 ; i >= 0 ; i-=1){
		var animemal = $("."+animemalBank[i].name)[0];

		$("."+animemalBank[i].name).css('transform','rotate(0rad)');

		animemal.style.width = getContextSize(animemalBank[i].width, "px");  
		
		animemal.style.height = animemalBank[i].height;
		animemal.style.bottom = animemalBank[i].bottom;
		animemal.style.top = animemalBank[i].top;
		animemal.style.left = animemalBank[i].left;
		animemal.style.right = animemalBank[i].right;
//		animemal.style.zindex = animemalBank[i].zindex;	
//		animemal.css('zIndex', animemalBank[i].zindex);
		$("."+animemalBank[i].name).css('zIndex',animemalBank[i].zindex);

	}
}

// REturn a string with size adjusted to current screen size context
function getContextSize(sizeToAdjust, unitString) { 
	return (parseInt(sizeToAdjust) * currentFactor)+unitString; 
}

// Show Animal UI when mouseover
function showUI(e){

	this.style.backgroundColor = "grey";
	this.style.opacity = 0.4;
	$(this).children()[1].style.visibility = "visible";
	$(this).children()[3].style.visibility = "visible";	
	$(this).children()[4].style.visibility = "visible";

	//fi def debug affiche un tooltip
	//this.
}

// Hide Animal UI when mouseout 
function hideUI(e){
	
	this.style.backgroundColor = "";
	this.style.opacity = 1;
	$(this).children()[1].style.visibility = "hidden";
	$(this).children()[3].style.visibility = "hidden";
	$(this).children()[4].style.visibility = "hidden";
	
	
	//fi def debug cache le tooltip
	//this.	
}

// Make an in place clone of the current animemal
function duplicate (e){
 	var res_clone = $(this.parentElement).clone();

 	var clonedID = 'clone'+ ++indexCloned;

   $(res_clone).attr('id', clonedID);
   $(res_clone).find('.ui-resizable-handle').remove();
   $(res_clone).draggable({start: dragStart  });	 // Add drag to the clone
   $(res_clone).resizable({aspectRatio : true , handles : "se"});  // Add resize to the clone

	$.data(res_clone[0], 'currentRotation', 0 ); 	// Add rotate to the clone
	$(res_clone).children()[1].onmousedown = startRotate;

	$(res_clone).children()[3].onclick = duplicate; // Add duplicate to the clone
	
	$(res_clone).mouseover( showUI );  // Hide UI
	$(res_clone).mouseout( hideUI );
	
	res_clone[0].style.top = parseInt(this.parentElement.style.top) + 3 + "px";
	res_clone[0].style.left = parseInt(this.parentElement.style.left) + 3 + "px";

   $(this.parentElement).parent().append(res_clone);
}

/* adapted from http://www.elated.com/articles/smooth-rotatable-images-css3-jquery/ */
// Prevent the image being dragged if it's already being rotated
function dragStart( e, ui ) {
  if ( imageBeingRotated ) return false;
}

/* adapted from http://www.elated.com/articles/smooth-rotatable-images-css3-jquery/ */
function stopRotate( e ) {

  // Exit if we're not rotating an image
  if ( !imageBeingRotated ) return;

  // Remove the event handler that tracked mouse movements during the rotation
  $(document).unbind( 'mousemove' );

  // Cancel the image rotation by setting imageBeingRotated back to false.
  // Do this in a short while - after the click event has fired -
  // to prevent the lightbox appearing once the Shift key is released.
  setTimeout( function() { imageBeingRotated = false; }, 10 );
  return false;
}

/* adapted from http://www.elated.com/articles/smooth-rotatable-images-css3-jquery/ */
// Start rotating an image
function startRotate( e ) {

  // Track the image from parentElement that we're going to rotate
  imageBeingRotated = this.parentElement;

  // Store the angle of the mouse at the start of the rotation, relative to the image centre
  var imageCentre = getImageCentre( imageBeingRotated );
  var mouseStartXFromCentre = e.pageX - imageCentre[0];
  var mouseStartYFromCentre = e.pageY - imageCentre[1];
  mouseStartAngle = Math.atan2( mouseStartYFromCentre, mouseStartXFromCentre );

  // Store the current rotation angle of the image at the start of the rotation
  imageStartAngle = $(imageBeingRotated).data('currentRotation');

  // Set up an event handler to rotate the image as the mouse is moved
  $(document).mousemove( rotateImage );

  return false;
}

/* adapted from http://www.elated.com/articles/smooth-rotatable-images-css3-jquery/ */
// Rotate image based on the current mouse position
function rotateImage( e ) {

  // Exit if we're not rotating an image
  if ( !imageBeingRotated ) return;

  // Calculate the new mouse angle relative to the image centre
  var imageCentre = getImageCentre( imageBeingRotated );
  var mouseXFromCentre = e.pageX - imageCentre[0];
  var mouseYFromCentre = e.pageY - imageCentre[1];
  var mouseAngle = Math.atan2( mouseYFromCentre, mouseXFromCentre );

  // Calculate the new rotation angle for the image
  var rotateAngle = mouseAngle - mouseStartAngle + imageStartAngle;

  // Rotate the image to the new angle, and store the new angle
  $(imageBeingRotated).css('transform','rotate(' + rotateAngle + 'rad)');
  $(imageBeingRotated).css('-moz-transform','rotate(' + rotateAngle + 'rad)');
  $(imageBeingRotated).css('-webkit-transform','rotate(' + rotateAngle + 'rad)');
  $(imageBeingRotated).css('-o-transform','rotate(' + rotateAngle + 'rad)');
  $(imageBeingRotated).data('currentRotation', rotateAngle );
  return false;
}

/* adapted from http://www.elated.com/articles/smooth-rotatable-images-css3-jquery/ */
// Calculate the centre point of a given image
function getImageCentre( image ) {

  // Rotate the image to 0 radians
  $(image).css('transform','rotate(0rad)');
  $(image).css('-moz-transform','rotate(0rad)');
  $(image).css('-webkit-transform','rotate(0rad)');
  $(image).css('-o-transform','rotate(0rad)');

  // Measure the image centre
  var imageOffset = $(image).offset();
  var imageCentreX = imageOffset.left + $(image).width() / 2;
  var imageCentreY = imageOffset.top + $(image).height() / 2;

  // Rotate the image back to its previous angle
  var currentRotation = $(image).data('currentRotation');
  $(imageBeingRotated).css('transform','rotate(' + currentRotation + 'rad)');
  $(imageBeingRotated).css('-moz-transform','rotate(' + currentRotation + 'rad)');
  $(imageBeingRotated).css('-webkit-transform','rotate(' + currentRotation + 'rad)');
  $(imageBeingRotated).css('-o-transform','rotate(' + currentRotation + 'rad)');

  // Return the calculated centre coordinates
  return Array( imageCentreX, imageCentreY );
}
