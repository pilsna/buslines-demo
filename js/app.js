define([
        "dojo/ready",
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/on",
        "esri/symbols/SimpleLineSymbol",
        "esri/renderers/SimpleRenderer"
    ],
    function(
        ready,
        declare,
        lang,
        on,
        SimpleLineSymbol,
        SimpleRenderer
    ) {
        function handleevent(event, node) {

        }

        function extentUpdated(error, info) {
            for (var i = error.target.graphics.length - 1; i >= 0; i--) {
                var rute = error.target.graphics[i].attributes;
                if (rute.HovedVaria !== 0) {
                    console.log(rute.Designate + ", " + rute.DirectionC);
                    var form = document.getElementById("buslist");
                }
            };
        }
        return declare("", null, {
            map: {},
            constructor: function(map) {
                //config will contain application and user defined info for the template such as i18n strings, the web map id
                // and application id
                // any url parameters and any application specific configuration information. 
                this.map = map;
                this.busLayer = this.map.getLayersVisibleAtScale()[1];

                ready(lang.hitch(this, function() {
                    this._setupGraphics();
                    this._addListeners();
                    this._infoTemplate();
                }));

            },
            _setupGraphics: function() {
                var graphicslayer = this.map.graphics;
                graphicslayer.styling = false;
                //on(graphicslayer, "graphic-draw", handleevent);
                //graphicslayer.className = 'graphics-highlight';
            },
            _addListeners: function() {
                on(this.busLayer, 'update-end', extentUpdated);
            },
            _infoTemplate: function() {

            }
        });
    });