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

        return declare("", null, {
            map: {},
            constructor: function(map) {
                this.map = map;
                this.busLayer = this.map.getLayersVisibleAtScale()[1];
                this._bind();
                window.busdemo.map = map;

                ready(lang.hitch(this, function() {
                    this._setupGraphics();
                    this._addListeners();
                    this._infoTemplate();

                }));

            },
            _bind: function() {
                var busList = new busdemo.BusLinesModel(this._changeGraphic);
                ko.applyBindings(busList);
                window.busdemo.current = busList;
            },
            _setupGraphics: function() {
                var graphicslayer = this.map.graphics;
                graphicslayer.styling = false;
            },
            _addListeners: function() {
                on(this.busLayer, 'update-end', this.extentUpdated);
                on(this.map, 'zoom-end', function(extent, zoomfactor, anchor, level){
                    //this.map.graphics.refresh();
                });
            },
            _infoTemplate: function() {

            },
            _changeGraphic: function(busLine) {
                console.log(busLine.graphic);
                if (busLine.selected()) {
                    this.busdemo.map.graphics.add(busLine.graphic);
                    this.busdemo.map.graphics.refresh();
                } else {
                    this.busdemo.map.graphics.remove(busLine.graphic);
                }
            },
            extentUpdated: function(event) {
                this.busdemo.current.replaceLines(event.target.graphics);
                var busLines = this.busdemo.current.selectedLines();
                event.target._map.graphics.clear()
                for (var i = 0; i < busLines.length; i++) {
                    event.target._map.graphics.add(busLines[i].graphic);
                };
            }

        });
    });