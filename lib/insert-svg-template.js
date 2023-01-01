'use strict';

var w3 = require('./w3.js');

function insertSVGTemplate (index, source, lane, waveSkin, content, lanes, groups, notFirstSignal) {
    var first, skin, e;

    for (first in waveSkin) { break; }

    skin = waveSkin.default || waveSkin[first];

    if (source && source.config && source.config.skin && waveSkin[source.config.skin]) {
        skin = waveSkin[source.config.skin];
    }

    if (notFirstSignal) {
        e = ['svg', {id: 'svg', xmlns: w3.svg, 'xmlns:xlink': w3.xlink}, ['g']];
    } else {
        e = skin;
    }

    var width = (lane.xg + (lane.xs * (lane.xmax + 1)) + 20);
    var height = (content.length * lane.yo + lane.yh0 + lane.yh1 + lane.yf0 + lane.yf1 + 20);

    var body = e[e.length - 1];

    // body[1] = ['rect', {
    //     width: width,
    //     height: height,
    //     style: 'fill:#ffffff'
    // }];

    body[1] = {id: 'waves_'  + index};

    body[2] = ['g', {
        id: 'lanes_'  + index,
        transform: 'translate(' + (lane.xg + 0.5 + 10) + ', ' + ((lane.yh0 + lane.yh1) + 0.5 + 10) + ')'
    }].concat(lanes);

    body[3] = ['g', {
        id: 'groups_' + index
    }, groups];

    var head = e[1];

    head.id = 'svgcontent_' + index;
    head.height = height;
    head.width = width;
    head.viewBox = '0 0 ' + width + ' ' + height;
    head.overflow = 'hidden';

    if (source && source.config && source.config.background) {
        head.style = 'backgroud-color:'+source.config.background;
    }

    return e;
}

module.exports = insertSVGTemplate;
