// ==UserScript==
// @name 		Correct All The Coordinates
// @author 		dennistreysa
// @oujs:author	dennistreysa
// @copyright   2015, dennistreysa
// @version 	0.0.1.0
// @copyright	2015, dennistreysa
// @icon		https://raw.githubusercontent.com/dennistreysa/CATC/master/res/logo.png
// @description	This script enables the functionality to change the coordinates of every cachetype
// @updateURL	https://raw.githubusercontent.com/dennistreysa/CATC/master/catc.latest.user.js
// @downloadURL	https://raw.githubusercontent.com/dennistreysa/CATC/master/catc.latest.user.js
// @include		*.geocaching.com/seek/cache_details.aspx*
// @noframes
// @grant 		none
// ==/UserScript==

// Check if jQuery is present
if($){
	$(document).ready(function(){
		// Find coords container
		var $CacheInformationTable = $("#ctl00_ContentBody_CacheInformationTable").find(".NoBottomSpacing :first");
		var $coords = $CacheInformationTable.find("strong :first");

		if($CacheInformationTable.length && $coords.length){

			// Check if coords are original or already changed
			if(!$coords.parent().is("a")){
				console.log("CATC : Coordinates are unchanged!");

				// Set up userdefined coords
				var userDefinedCoords = {"status":"success","data":{"isUserDefined":false,"oldLatLngDisplay":$coords.find("#uxLatLon").text()}};

				mapLatLng.oldLatLngDisplay = userDefinedCoords.data.oldLatLngDisplay;

				// Create link
				var $a = $('<a href="#" class="edit-cache-coordinates" id="uxLatLonLink" title="Correct All The Coordinates"></a>');

				// Append original coordinates
				$a.append($coords.clone(true));

				// Replace old coordinates
				$coords.replaceWith($a);

				// Add click-event
				$a.qtip({
					suppress:false,
					content: buildCacheCoordMenu(),
					position: {
						my: 'left top',
						at: 'right top',
						adjust: {
							x: 10, y: -10
						}
					},
					show: {
						ready: false,
						event: "click",
						solo: true
					}, hide: {
						event: 'unfocus'
					},
					style: {
						tip: {
							corner: false
						},
						classes: 'ui-tooltip-widget'
					},
					events: {
						show: function () {
							if ($("#uxLatLon").data("isOverridden")) {
								$("a.ccu-restore").show();
							} else {
								$("a.ccu-restore").hide();
							}

							if (userDefinedCoords.status != "success") {
								$("div.ccu-update").hide();
							} else {
								$("div.ccu-update").show();
							}
						}
					}
				}).click(function (e) {
					e.preventDefault();
					return false;
				});
			}else{
				console.log("CATC : Coordinates are already changed!");
			}
		}else{
			console.log("CATC : Could not find coordinates container!");
		}
	});
}

/*
 * Version-History:
 *
 * v0.0.1 (2015-11-12)
 *		- initial release
 *
 */