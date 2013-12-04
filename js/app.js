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
                var form = document.getElementById("buslist");

                if (rute.HovedVaria !== 0) {
                    console.log(rute.Designate + ", " + rute.DirectionC);

                }
            };
        }

        function addToGraphics(graphic) {
            console.log(graphic);
        }

        return declare("", null, {
            map: {},
            constructor: function(map) {
                //config will contain application and user defined info for the template such as i18n strings, the web map id
                // and application id
                // any url parameters and any application specific configuration information. 
                this.map = map;
                this.busLayer = this.map.getLayersVisibleAtScale()[1];
                this._bind();

                ready(lang.hitch(this, function() {
                    this._setupGraphics();
                    this._addListeners();
                    this._infoTemplate();

                }));

            },
            _bind: function() {
                var lines = [
                    { name: "1A", id: 1},
                    { name: '150S', id: 2},
                    { name: '4A', id: 3},
                    { name: '18', id: 4}
                ];
                this.busList = new busdemo.BusLinesModel(addToGraphics);
                
                //ko.bindingHandlers['pick'] = busdemo.checkHandler(addToGraphics);
                ko.applyBindings(this.busList);
                this.busList.replaceLines(lines);

            },
            _setupGraphics: function() {
                var graphicslayer = this.map.graphics;
                graphicslayer.styling = false;
            },
            _addListeners: function() {
                on(this.busLayer, 'update-end', extentUpdated);
            },
            _infoTemplate: function() {

            }
        });
    });