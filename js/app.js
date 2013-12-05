define([
        "dojo/ready",
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/on",
        "esri/symbols/SimpleLineSymbol",
        "esri/renderers/SimpleRenderer",
        "esri/graphic"
    ],
    function(
        ready,
        declare,
        lang,
        on,
        SimpleLineSymbol,
        SimpleRenderer,
        Graphic
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
                document.getElementById("linecontrol").style.visibility = "visible"
            },
            _setupGraphics: function() {
                var graphicslayer = this.map.graphics;
                graphicslayer.styling = false;
            },
            _addListeners: function() {
                on(this.busLayer, 'update-end', this.extentUpdated);
            },
            _infoTemplate: function() {

            },
            _changeGraphic: function(busLine) {
                var busLines = this.busdemo.current.selectedLines();
                this.busdemo.map.graphics.clear()
                for (var i = 0; i < busLines.length; i++) {
                    var g = busLines[i].graphic;
                    if (g) {
                        var highlight = new Graphic(g.geometry);
                        this.busdemo.map.graphics.add(highlight);
                    }
                };
            },
            extentUpdated: function(event) {
                this.busdemo.current.replaceLines(event.target.graphics);
                var busLines = this.busdemo.current.selectedLines();
                event.target._map.graphics.clear()
                for (var i = 0; i < busLines.length; i++) {
                    var highlight = new Graphic(busLines[i].graphic.geometry);
                    event.target._map.graphics.add(highlight);
                };
            }

        });
    });