/* Copyright (c) 2013 Oscar Lopez (see authors.txt for a
 * full list of contributors). Published under the 2-clause BSD license.
 * See license.txt in the repository for the
 * full text of the license. */

/**
 * @requires OpenLayers/Layer/XYZ.js
 */

/**
 * Class: OpenLayers.Layer.Argenmap
 * This layer allows accessing IGN Argenmap tiles.
 * 
 * By default the layer named 'capabaseargenmap'
 *    published at http://wms.ign.gob.ar/geoserver/gwc/services/tms tileset is used.
 *    If you wish to use
 *    a different layer instead, you need to provide a different
 *    URL to the constructor. Here's an example for using capabasesigign:
 * 
 * (code)
 *     new OpenLayers.Layer.Argenmap("Vectores IGN", 
 *       ["http://cg.aws.af.cm/tms/capabasesigign/${z}/${x}/${y}.png",
 *        "http://mapaabierto.aws.af.cm/tms/capabasesigign/${z}/${x}/${y}.png",
 *        "http://robomap-cgastrell.rhcloud.com/tms/capabasesigign/${z}/${x}/${y}.png",
 *        "http://sig.ign.gob.ar/tms/capabasesigign/${z}/${x}/${y}.png"          
 *     ]); 
 * (end)
 *
 * Inherits from:
 *  - <OpenLayers.Layer.XYZ>
 */
OpenLayers.Layer.Argenmap = OpenLayers.Class(OpenLayers.Layer.XYZ, {

    /**
     * APIProperty: name
     * {String} The layer name. Defaults to "Mapa IGN" if the first
     * argument to the constructor is null or undefined.
     */
    name: "Mapa IGN",

    /**
     * {String} The tileset URL scheme. Defaults to
     * [
        'http://igntiles1.ap01.aws.af.cm/tms/capabaseargenmap/${z}/${x}/${y}.png',        
        'http://mapaabierto.aws.af.cm/tms/capabaseargenmap/${z}/${x}/${y}.png',
        'http://igntiles2.eu01.aws.af.cm/tms/capabaseargenmap/${z}/${x}/${y}.png'
     * ]
     * (the official Argenmap tileset) if the second argument to the constructor
     * is null or undefined. To use another tileset you can have something
     * like this:
     * (code)
     *     new OpenLayers.Layer.Argenmap("Vectores IGN", 
     *       ["http://cg.aws.af.cm/tms/capabasesigign/${z}/${x}/${y}.png",
     *        "http://mapaabierto.aws.af.cm/tms/capabasesigign/${z}/${x}/${y}.png",
     *        "http://robomap-cgastrell.rhcloud.com/tms/capabasesigign/${z}/${x}/${y}.png",
     *        "http://sig.ign.gob.ar/tms/capabasesigign/${z}/${x}/${y}.png"          
     *     ]); 
     * (end)
     */
    url: [
        'http://igntiles1.ap01.aws.af.cm/tms/capabaseargenmap/${z}/${x}/${y}.png',        
        'http://mapaabierto.aws.af.cm/tms/capabaseargenmap/${z}/${x}/${y}.png',
        'http://igntiles2.eu01.aws.af.cm/tms/capabaseargenmap/${z}/${x}/${y}.png'
    ],

    /**
     * Property: attribution
     * {String} The layer attribution.
     */
    attribution: "Argenmap, de <a href='http://www.ign.gob.ar'>IGN Argentina</a>",

    /**
     * Property: sphericalMercator
     * {Boolean}
     */
    sphericalMercator: true,

    /**
     * Property: wrapDateLine
     * {Boolean}
     */
    wrapDateLine: true,

    /**
     * Constructor: OpenLayers.Layer.Argenmap
     *
     * Parameters:
     * name - {String} The layer name.
     * url - {String} The tileset URL scheme.
     * options - {Object} Configuration options for the layer. Any inherited
     *     layer option can be set in this object (e.g.
     *     <OpenLayers.Layer.Grid.buffer>).
     */
    initialize: function(name, url, options) {
        OpenLayers.Layer.XYZ.prototype.initialize.apply(this, arguments);
    },

    /**
     * Method: clone
     */
    clone: function(obj) {
        if (obj == null) {
            obj = new OpenLayers.Layer.Argenmap(
                this.name, this.url, this.getOptions());
        }
        obj = OpenLayers.Layer.XYZ.prototype.clone.apply(this, [obj]);
        return obj;
    },
    /**
     * Method: getXYZ
     * Calculates x, y and z for the given bounds.
     *
     * Parameters:
     * bounds - {<OpenLayers.Bounds>}
     *
     * Returns:
     * {Object} - an object with x, y and z properties.
     */
    getXYZ: function(bounds) {
        var res = this.getServerResolution();
        var xyz = OpenLayers.Layer.XYZ.prototype.getXYZ.apply(this, [bounds]);
        //llevo y de Grid a y TMS 
        xyz.y = (1 << xyz.z) - xyz.y - 1;
        return xyz;
    },    

    CLASS_NAME: "OpenLayers.Layer.Argenmap"
});
