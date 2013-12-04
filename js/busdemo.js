window.busdemo = {};



(function(busdemo) {

    function BusLine(name, highlightOnMap) {
        var self = this;
        self.selected = ko.observable(false);
        self.name = name;
        self.checkChanged = function(newValue) {
        	highlightOnMap(self);
        };
        self.selected.subscribe(self.checkChanged, self);
    }
    busdemo.BusLine = BusLine;
}(window.busdemo));

(function(busdemo) {

    function BusLinesModel(highlightOnMap) {
        var self = this;
        self.busLineCollection = ko.observableArray([]);
        self.highlight = highlightOnMap;
        self.addBusLine = function(busLine) {
            self.busLineCollection.push(busLine);
        }
        self.replaceLines = function(graphics) {
        	var newLines = [];
            for (var i = 0; i < graphics.length; i++) {
                var graphic = graphics[i];
                var bus = new busdemo.BusLine(graphic.attributes.Designate, highlightOnMap);
                ko.utils.extend(bus, graphic);
                //bus.attributes = { OBJECTID: graphic.id};
                var oldBus = self.getById(bus.attributes.OBJECTID);
                if (oldBus) {
                    bus.selected = oldBus.selected;
                }
                newLines.push(bus);
            };
            self.busLineCollection.removeAll();
            ko.utils.arrayPushAll(self.busLineCollection, newLines);
        }
        self.getById = function(id) {
            for (var i = 0; i < self.busLineCollection.length; i++) {
                if (self.busLineCollection[i].attributes.OBJECTID == id) 
                	return self.busLineCollection[i];
            }
            return undefined;
        }
    }
    busdemo.BusLinesModel = BusLinesModel;
}(window.busdemo));

(function(busdemo) {
    function listUpdate(mapCallback) {
        var checkHandler = {
            init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

            },
            update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                mapCallback(viewModel());
            }
        };
        return checkHandler;
    }
    busdemo.checkHandler = listUpdate;
}(window.busdemo));