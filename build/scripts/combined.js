function addCommas(e){e+="";for(var i=e.split("."),t=i[0],a=i.length>1?"."+i[1]:"",o=/(\d+)(\d{3})/;o.test(t);)t=t.replace(o,"$1,$2");return t+a}function camelize(e){return e.replace(/(?:^\w|[A-Z]|\b\w)/g,function(e,i){return 0==i?e.toLowerCase():e.toUpperCase()}).replace(/\s+/g,"")}var allLayers;require(["esri/geometry/Extent","esri/layers/WMSLayerInfo","esri/layers/FeatureLayer","dojo/domReady!"],function(e,i,t){allLayers=[{groupHeading:"Trends",showGroupHeading:!1,includeInLayerList:!0,layers:{"NAWQA SW trend sites":{url:"http://gis.wim.usgs.gov/arcgis/rest/services/SWTrends/trendInfo/MapServer/0",options:{id:"trendSites",opacity:1,mode:t.MODE_ONDEMAND,outFields:["*"],visible:!0},wimOptions:{type:"layer",layerType:"agisFeature",includeInLayerList:!1,hasOpacitySlider:!0,includeLegend:!0}}}}]});var map,allLayers,maxLegendHeight,maxLegendDivHeight,dragInfoWindows=!0,defaultMapCenter=[-95.6,38.6];require(["esri/arcgis/utils","esri/map","esri/dijit/HomeButton","esri/dijit/LocateButton","esri/layers/ArcGISTiledMapServiceLayer","esri/dijit/Geocoder","esri/dijit/PopupTemplate","esri/graphic","esri/geometry/Multipoint","esri/geometry/Point","esri/symbols/PictureMarkerSymbol","esri/geometry/webMercatorUtils","dojo/dnd/Moveable","dojo/query","dojo/dom","dojo/dom-class","dojo/on","dojo/domReady!"],function(e,i,t,a,o,n,s,l,r,c,d,p,g,u,m,y,h){function f(){1===m.byId("chkExtent").checked?D.activeGeocoder.searchExtent=map.extent:D.activeGeocoder.searchExtent=null}function v(){f();var e=D.find();e.then(function(e){w(e)}),$("#geosearchModal").modal("hide")}function b(e){L();var i=e.graphic?e.graphic:e.result.feature;i.setSymbol(I)}function w(e){if(e=e.results,e.length>0){L();for(var i=0;i<e.length;i++);var t=new c(e[0].feature.geometry);map.centerAndZoom(t,17)}}function L(){map.infoWindow.hide(),map.graphics.clear()}function x(e,i,t,a,o){return new d({angle:0,xoffset:i,yoffset:t,type:"esriPMS",url:e,contentType:"image/png",width:a,height:o})}map=i("mapDiv",{basemap:"gray",center:defaultMapCenter,zoom:5});var z=new t({map:map},"homeButton");z.startup();var S=new a({map:map},"locateButton");S.startup(),$("#disclaimerModal").modal("show"),$(window).resize(function(){$("#legendCollapse").hasClass("in")?(maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("height",maxLegendHeight),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)):$("#legendElement").css("height","initial")}),h(map,"load",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e);var i=p.webMercatorToGeographic(map.extent.getCenter());if($("#latitude").html(i.y.toFixed(3)),$("#longitude").html(i.x.toFixed(3)),1==dragInfoWindows){var t=u(".title",map.infoWindow.domNode)[0],a=new g(map.infoWindow.domNode,{handle:t});h(a,"FirstMove",function(){var e=u(".outerPointer",map.infoWindow.domNode)[0];y.add(e,"hidden");var e=u(".pointer",map.infoWindow.domNode)[0];y.add(e,"hidden")}.bind(this))}}),h(map,"zoom-end",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e)}),h(map,"mouse-move",function(e){if($("#mapCenterLabel").css("display","none"),null!=e.mapPoint){var i=p.webMercatorToGeographic(e.mapPoint);$("#latitude").html(i.y.toFixed(3)),$("#longitude").html(i.x.toFixed(3))}}),h(map,"pan-end",function(){$("#mapCenterLabel").css("display","inline");var e=p.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(e.y.toFixed(3)),$("#longitude").html(e.x.toFixed(3))});var k=new o("http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer");h(m.byId("btnStreets"),"click",function(){map.setBasemap("streets"),map.removeLayer(k)}),h(m.byId("btnSatellite"),"click",function(){map.setBasemap("satellite"),map.removeLayer(k)}),h(m.byId("btnHybrid"),"click",function(){map.setBasemap("hybrid"),map.removeLayer(k)}),h(m.byId("btnTerrain"),"click",function(){map.setBasemap("terrain"),map.removeLayer(k)}),h(m.byId("btnGray"),"click",function(){map.setBasemap("gray"),map.removeLayer(k)}),h(m.byId("btnNatGeo"),"click",function(){map.setBasemap("national-geographic"),map.removeLayer(k)}),h(m.byId("btnOSM"),"click",function(){map.setBasemap("osm"),map.removeLayer(k)}),h(m.byId("btnTopo"),"click",function(){map.setBasemap("topo"),map.removeLayer(k)}),h(m.byId("btnNatlMap"),"click",function(){map.addLayer(k)}),h(map,"click",function(e){}),$("#siteInfoDiv").lobiPanel({unpin:!1,reload:!1,minimize:!1,close:!1,expand:!1,editTitle:!1,maxWidth:800,maxHeight:500}),$("#siteInfoDiv .dropdown").prepend("<div id='siteInfoClose' title='close'><b>X</b></div>"),$("#siteInfoDiv .dropdown").prepend("<div id='siteInfoMin' title='collapse'><b>_</b></div>"),$("#siteInfoMin").click(function(){$("#siteInfoDiv").css("visibility","hidden")}),$("#siteInfoClose").click(function(){$("#siteInfoDiv").css("visibility","hidden")}),map.on("layer-add",function(e){var i=e.layer.id;e.layer;"trendSites"==i&&map.getLayer(i).on("click",function(e){$("#siteInfoDiv").css("visibility","visible");var i=$("#siteInfoDiv").data("lobiPanel"),t=$(document).height(),a=$(document).width(),o=.9,n=t*o,s=a*o;500>t&&$("#siteInfoDiv").height(n),500>a&&$("#siteInfoDiv").width(s);var l=e.x,r=e.y;i.setPosition(l,r),1==i.isPinned()&&i.unpin()})});var D=new n({value:"",maxLocations:25,autoComplete:!0,arcgisGeocoder:!0,autoNavigate:!1,map:map},"geosearch");D.startup(),D.on("select",b),D.on("findResults",w),D.on("clear",L),h(D.inputNode,"keydown",function(e){13==e.keyCode&&f()});var I=x("../images/purple-pin.png",0,12,13,24);map.on("load",function(){map.infoWindow.set("highlight",!1),map.infoWindow.set("titleInBody",!1)}),h(m.byId("btnGeosearch"),"click",v),$(document).ready(function(){function e(){$("#geosearchModal").modal("show")}function i(){$("#aboutModal").modal("show")}function t(){$("#chartModal").modal("show")}function a(){$("#tableModal").modal("show")}$("#geosearchNav").click(function(){e()}),$("#aboutNav").click(function(){i()}),$("#charts").click(function(){t()}),$("#table").click(function(){a()}),$("#html").niceScroll(),$("#sidebar").niceScroll(),$("#sidebar").scroll(function(){$("#sidebar").getNiceScroll().resize()}),$("#legendDiv").niceScroll(),maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("max-height",maxLegendHeight),$("#legendCollapse").on("shown.bs.collapse",function(){maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)}),$("#legendCollapse").on("hide.bs.collapse",function(){$("#legendElement").css("height","initial")})}),require(["esri/dijit/Legend","esri/tasks/locator","esri/tasks/query","esri/tasks/QueryTask","esri/graphicsUtils","esri/geometry/Point","esri/geometry/Extent","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/FeatureLayer","esri/SpatialReference","esri/layers/WMSLayer","esri/layers/WMSLayerInfo","dijit/form/CheckBox","dijit/form/RadioButton","dojo/query","dojo/dom","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/on"],function(e,i,t,a,o,n,s,l,r,c,d,p,g,u,m,y,h,f,v,b){function w(e,i,t,a,o,s,l){if(map.addLayer(t),x.push([o,camelize(a),t]),o){if(!$("#"+camelize(o)).length){var r=$('<div id="'+camelize(o+" Root")+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+o+"</button> </div>");r.click(function(e){r.find("i.glyphspan").toggleClass("fa-check-square-o fa-square-o"),$.each(x,function(e,i){var t=map.getLayer(i[2].id);if(i[0]==o)if($("#"+i[1]).find("i.glyphspan").hasClass("fa-dot-circle-o")&&r.find("i.glyphspan").hasClass("fa-check-square-o")){console.log("adding layer: ",i[1]),map.addLayer(i[2]);var t=map.getLayer(i[2].id);t.setVisibility(!0)}else r.find("i.glyphspan").hasClass("fa-square-o")&&(console.log("removing layer: ",i[1]),map.removeLayer(i[2]))})});var d=$('<div id="'+camelize(o)+'" class="btn-group-vertical" data-toggle="buttons"></div');$("#toggle").append(d)}if(t.visible)var p=$('<div id="'+camelize(a)+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="'+camelize(o)+'" autocomplete="off"><i class="glyphspan fa fa-dot-circle-o '+camelize(o)+'"></i>&nbsp;&nbsp;'+a+"</label> </div>");else var p=$('<div id="'+camelize(a)+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="'+camelize(o)+'" autocomplete="off"><i class="glyphspan fa fa-circle-o '+camelize(o)+'"></i>&nbsp;&nbsp;'+a+"</label> </div>");$("#"+camelize(o)).append(p),p.click(function(e){if($(this).find("i.glyphspan").hasClass("fa-circle-o")){$(this).find("i.glyphspan").toggleClass("fa-dot-circle-o fa-circle-o");var i=$(this)[0].id;$.each(x,function(e,t){if(t[0]==o)if(t[1]==i&&$("#"+camelize(o+" Root")).find("i.glyphspan").hasClass("fa-check-square-o")){console.log("adding layer: ",t[1]),map.addLayer(t[2]);var a=map.getLayer(t[2].id);a.setVisibility(!0)}else t[1]==i&&$("#"+camelize(o+" Root")).find("i.glyphspan").hasClass("fa-square-o")?console.log("groud heading not checked"):(console.log("removing layer: ",t[1]),map.removeLayer(t[2]),$("#"+t[1]).find("i.glyphspan").hasClass("fa-dot-circle-o")&&$("#"+t[1]).find("i.glyphspan").toggleClass("fa-dot-circle-o fa-circle-o"))})}})}else{if(t.visible&&void 0!==l.hasOpacitySlider&&1==l.hasOpacitySlider&&void 0!==l.hasZoomto&&1==l.hasZoomto)var p=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+t.id+'"type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+a+'<span id="opacity'+camelize(a)+'" class="glyphspan glyphicon glyphicon-adjust pull-right opacity"></span><span class="glyphicon glyphicon-search pull-right zoomto"></span></button></div>');else if(t.visible||void 0===l.hasOpacitySlider||1!=l.hasOpacitySlider||void 0===l.hasZoomto||1!=l.hasZoomto)if(t.visible&&void 0!==l.hasOpacitySlider&&1==l.hasOpacitySlider)var p=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+t.id+'"type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+a+'<span id="opacity'+camelize(a)+'" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></div>');else if(t.visible||void 0===l.hasOpacitySlider||1!=l.hasOpacitySlider)if(t.visible&&0==l.hasOpacitySlider&&void 0!==l.hasZoomto&&1==l.hasZoomto)var p=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+t.id+'"type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+a+'<span class="glyphicon glyphicon-search pull-right zoomto"></span></button></span></div>');else if(t.visible||0!=l.hasOpacitySlider||void 0===l.hasZoomto||1!=l.hasZoomto)if(t.visible)var p=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+t.id+'"type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+a+"</button></span></div>");else var p=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+t.id+'"type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+a+"</button> </div>");else var p=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+t.id+'"type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+a+'<span class="glyphicon glyphicon-search pull-right zoomto"></span></button></span></div>');else var p=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+t.id+'"type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+a+'<span id="opacity'+camelize(a)+'" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></div>');else var p=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+t.id+'"type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+a+'<span id="opacity'+camelize(a)+'" class="glyphspan glyphicon glyphicon-adjust pull-right opacity"></span><span class="glyphicon glyphicon-search pull-right zoomto"></span></button></div>');p.click(function(e){$(this).find("i.glyphspan").toggleClass("fa-check-square-o fa-square-o"),$(this).find("button").button("toggle"),e.preventDefault(),e.stopPropagation(),$("#"+camelize(a)).toggle(),t.visible?t.setVisibility(!1):t.setVisibility(!0)})}if(i){var g=camelize(e);if(!$("#"+g).length){var u=$('<div id="'+g+'"><div class="alert alert-info" role="alert"><strong>'+e+"</strong></div></div>");$("#toggle").append(u)}o?($("#"+g).append(r),$("#"+g).append(d)):($("#"+g).append(p),$("#opacity"+camelize(a)).length>0&&$("#opacity"+camelize(a)).hover(function(){$(".opacitySlider").remove();var e=map.getLayer(s.id).opacity,i=$('<div class="opacitySlider"><label id="opacityValue">Opacity: '+e+'</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');$("body").append(i),$("#slider")[0].value=100*e,$(".opacitySlider").css("left",event.clientX-180),$(".opacitySlider").css("top",event.clientY-50),$(".opacitySlider").mouseleave(function(){$(".opacitySlider").remove()}),$(".opacityClose").click(function(){$(".opacitySlider").remove()}),$("#slider").change(function(e){var i=$("#slider")[0].value/100;console.log("o: "+i),$("#opacityValue").html("Opacity: "+i),map.getLayer(s.id).setOpacity(i)})}),$(".zoomto").hover(function(e){$(".zoomDialog").remove();var i=this.parentNode.id,t=$('<div class="zoomDialog"><label class="zoomClose pull-right">X</label><br><div class="list-group"><a href="#" id="zoomscale" class="list-group-item lgi-zoom zoomscale">Zoom to scale</a> <a id="zoomcenter" href="#" class="list-group-item lgi-zoom zoomcenter">Zoom to center</a><a id="zoomextent" href="#" class="list-group-item lgi-zoom zoomextent">Zoom to extent</a></div></div>');$("body").append(t),$(".zoomDialog").css("left",event.clientX-80),$(".zoomDialog").css("top",event.clientY-5),$(".zoomDialog").mouseleave(function(){$(".zoomDialog").remove()}),$(".zoomClose").click(function(){$(".zoomDialog").remove()}),$("#zoomscale").click(function(e){var t=map.getLayer(i).minScale;map.setScale(t)}),$("#zoomcenter").click(function(e){var i=new n(defaultMapCenter,new c({wkid:4326}));map.centerAt(i)}),$("#zoomextent").click(function(e){var t=map.getLayer(i).fullExtent;map.setExtent(t)})}))}else $("#toggle").append(p)}var L=[],x=[];$.each(allLayers,function(e,i){console.log("processing: ",i.groupHeading),$.each(i.layers,function(e,t){var a="";if(t.wimOptions.exclusiveGroupName&&(a=t.wimOptions.exclusiveGroupName),"agisFeature"===t.wimOptions.layerType){var o=new r(t.url,t.options);t.wimOptions&&1==t.wimOptions.includeLegend&&L.push({layer:o,title:e}),w(i.groupHeading,i.showGroupHeading,o,e,a,t.options,t.wimOptions)}else if("agisWMS"===t.wimOptions.layerType){var o=new d(t.url,{resourceInfo:t.options.resourceInfo,visibleLayers:t.options.visibleLayers},t.options);t.wimOptions&&1==t.wimOptions.includeLegend&&L.push({layer:o,title:e}),w(i.groupHeading,i.showGroupHeading,o,e,a,t.options,t.wimOptions)}else if("agisDynamic"===t.wimOptions.layerType){var o=new l(t.url,t.options);t.wimOptions&&1==t.wimOptions.includeLegend&&L.push({layer:o,title:e}),t.visibleLayers&&o.setVisibleLayers(t.visibleLayers),w(i.groupHeading,i.showGroupHeading,o,e,a,t.options,t.wimOptions)}})});var z=new e({map:map,layerInfos:L},"legendDiv");z.startup()})}),$(document).ready(function(){});