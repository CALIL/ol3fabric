// Generated by CoffeeScript 1.9.3
var GeoJSONLayer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

GeoJSONLayer = (function(superClass) {
  extend(GeoJSONLayer, superClass);

  GeoJSONLayer.prototype.geojson = null;

  function GeoJSONLayer(options) {
    GeoJSONLayer.__super__.constructor.call(this, options);
    this.geojson = options.geojson;
    this.translateGeoJSON();
    return new ol.layer.Vector({
      source: this.createVectorSource(),
      style: this.styleFunction
    });
  }

  GeoJSONLayer.prototype.translateGeoJSON = function() {
    var coordinate, feature, i, j, len, len1, new_coordinates, ref, ref1, results;
    ref = this.geojson.features;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      feature = ref[i];
      new_coordinates = [];
      ref1 = feature.geometry.coordinates[0];
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        coordinate = ref1[j];
        new_coordinates.push(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
      }
      results.push(feature.geometry.coordinates[0] = new_coordinates);
    }
    return results;
  };

  GeoJSONLayer.prototype.createVectorSource = function(geojson) {
    return new ol.source.Vector({
      features: (new ol.format.GeoJSON()).readFeatures(this.geojson)
    });
  };

  GeoJSONLayer.prototype.styleFunction = function(feature, resolution) {
    return [
      new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: feature.getProperties()['color'],
          width: 3
        }),
        fill: new ol.style.Fill({
          color: feature.getProperties()['color']
        })
      })
    ];
  };

  return GeoJSONLayer;

})(ol.layer.Vector);

//# sourceMappingURL=geojsonlayer.js.map
