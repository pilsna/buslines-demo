window.busdemo = {};



(function(busdemo) {

    function BusLine(name, highlightOnMap, selected) {
        var self = this;
        self.selected = ko.observable(selected);
        self.name = name;
        self.checkChanged = function(newValue) {
            highlightOnMap(self);
        };
        self.graphic = {};
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
                var bus = new busdemo.BusLine(graphic.attributes.Designate, highlightOnMap, false);
                //ko.utils.extend(bus, graphic);
                bus.graphic = graphic;
                var oldBus = self.getById(bus.graphic.attributes.OBJECTID);
                newLines.push(bus);
                if (oldBus) {
                    bus.selected = oldBus.selected;
                }
            };
            self.busLineCollection.removeAll();
            ko.utils.arrayPushAll(self.busLineCollection, newLines);
            self.busLineCollection.sort(function(left, right) {
                return left.name == right.name ? 0 : (left.name < right.name ? -1 : 1)
            });
        }
        self.getById = function(id) {
            for (var i = 0; i < self.busLineCollection._latestValue.length; i++) {
                if (self.busLineCollection._latestValue[i].graphic.attributes.OBJECTID == id)
                    return self.busLineCollection._latestValue[i];
            }
            return undefined;
        }
        self.selectedLines = function() {
            return self.busLineCollection.filterByProperty("selected", true)();
        }
    }
    busdemo.BusLinesModel = BusLinesModel;
    (ko.observableArray.fn.filterByProperty = function(propName, matchValue) {
        return ko.computed(function() {
            var allItems = this(),
                matchingItems = [];
            for (var i = 0; i < allItems.length; i++) {
                var current = allItems[i];
                if (ko.unwrap(current[propName]) === matchValue)
                    matchingItems.push(current);
            }
            return matchingItems;
        }, this);
    })
}(window.busdemo));

