'use strict';

var arcShape = require('./arc-shape.js');
var renderLabel = require('./render-label.js');

function renderArc (Edge, from, to, shapeProps) {
    return ['path', {
        id: 'gmark_' + Edge.from + '_' + Edge.to,
        d: shapeProps.d || 'M ' + from.x + ',' + from.y + ' ' + to.x + ',' + to.y,
        style: shapeProps.style || 'fill:none;stroke:#00F;stroke-width:1'
    }];
}

function renderArcs (source, index, top, lane) {
    var res = ['g', {id: 'wavearcs_' + index}];
    var Events = {};

    function labeler (element, i) {
        var nodes = element.nodes ? element.nodes.reverse() : [element.node];
        nodes.forEach((node, index) => {
            var pos, eventname, stack;
            var text = node;
            lane.period = element.period ? element.period : 1;
            lane.phase  = (element.phase ? element.phase * 2 : 0) + lane.xmin_cfg;
            lane.nphase  = (element.nphase ? element.nphase * 2 : 0) + lane.xmin_cfg;
            if (text) {
                stack = text.split('');
                pos = 0;
                while (stack.length) {
                    eventname = stack.shift();
                    if (eventname !== '.' && eventname !== '(') {
                        Events[eventname] = {
                            x: lane.xs *
                              (2 * pos * lane.period * lane.hscale - (element.nphase ? lane.nphase : lane.phase)) +
                              lane.xlabel,
                            y: i * lane.yo + lane.y0 + lane.ys * 0.5 + 12 + (element.nyoffset ? element.nyoffset : 0) + index * - 15
                        };
                    }
                    if (eventname === '(') {
                        let number = '';
                        while (stack[0] !== ')' && stack.length > 0) {
                            number += stack.shift();
                        }
                        stack.shift();
                        pos += Number(number) - 2;
                    }
                    pos += 1;
                }
            }

        });

    }

    function archer (element) {
        var words = element.trim().split(/\s+/);
        var Edge = {
            words: words,
            label: element.substring(words[0].length).substring(1),
            from:  words[0].substr(0, 1),
            to:    words[0].substr(-1, 1),
            shape: words[0].slice(1, -1)
        };
        var from = Events[Edge.from];
        var to = Events[Edge.to];

        var shapeProps, lx, ly;
        if (from && to) {
            shapeProps = arcShape(Edge, from, to);
            lx = shapeProps.lx;
            ly = shapeProps.ly;
            res = res.concat([renderArc(Edge, from, to, shapeProps)]);

            if (Edge.label) {
                if (Edge.shape === '+') {
                    ly = ly - 8;
                }
                res = res.concat([renderLabel({x: lx, y: ly}, Edge.label)]);
            }
        }
    }

    if (Array.isArray(source)) {
        source.map(labeler);
        if (Array.isArray(top.edge)) {
            top.edge.map(archer);
        }
        Object.keys(Events).map(function (k) {
            if (k === k.toLowerCase()) {
                if (Events[k].x > 0) {
                    res = res.concat([renderLabel({
                        x: Events[k].x,
                        y: Events[k].y
                    }, k + '')]);
                }
            }
        });
    }
    return res;
}

module.exports = renderArcs;
