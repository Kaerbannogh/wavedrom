'use strict';

function arcShape (Edge, from, to) { /* eslint complexity: [warn, 30] */
    var dx = to.x - from.x;
    var dy = to.y - from.y;
    var lx = ((from.x + to.x) / 2);
    var ly = ((from.y + to.y) / 2);
    var d;
    var style;
    switch (Edge.shape) {
    case '-'  : {
        break;
    }
    case '~'  : {
        d = ('M ' + from.x + ',' + from.y + ' c ' + (0.7 * dx) + ', 0 ' + (0.3 * dx) + ', ' + dy + ' ' + dx + ', ' + dy);
        break;
    }
    case '-~' : {
        d = ('M ' + from.x + ',' + from.y + ' c ' + (0.7 * dx) + ', 0 ' +         dx + ', ' + dy + ' ' + dx + ', ' + dy);
        if (Edge.label) { lx = (from.x + (to.x - from.x) * 0.75); }
        break;
    }
    case '~-' : {
        d = ('M ' + from.x + ',' + from.y + ' c ' + 0          + ', 0 ' + (0.3 * dx) + ', ' + dy + ' ' + dx + ', ' + dy);
        if (Edge.label) { lx = (from.x + (to.x - from.x) * 0.25); }
        break;
    }
    case '-|' : {
        d = ('m ' + from.x + ',' + from.y + ' ' + dx + ',0 0,' + dy);
        if (Edge.label) { lx = to.x; }
        break;
    }
    case '|-' : {
        d = ('m ' + from.x + ',' + from.y + ' 0,' + dy + ' ' + dx + ',0');
        if (Edge.label) { lx = from.x; }
        break;
    }
    case '-|-': {
        d = ('m ' + from.x + ',' + from.y + ' ' + (dx / 2) + ',0 0,' + dy + ' ' + (dx / 2) + ',0');
        break;
    }
    case '->' : {
        style = ('marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none');
        break;
    }
    case '~>' : {
        style = ('marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none');
        d = ('M ' + from.x + ',' + from.y + ' ' + 'c ' + (0.7 * dx) + ', 0 ' + 0.3 * dx + ', ' + dy + ' ' + dx + ', ' + dy);
        break;
    }
    case '-~>': {
        style = ('marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none');
        d = ('M ' + from.x + ',' + from.y + ' ' + 'c ' + (0.7 * dx) + ', 0 ' +     dx + ', ' + dy + ' ' + dx + ', ' + dy);
        if (Edge.label) { lx = (from.x + (to.x - from.x) * 0.75); }
        break;
    }
    case '~->': {
        style = ('marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none');
        d = ('M ' + from.x + ',' + from.y + ' ' + 'c ' + 0      + ', 0 ' + (0.3 * dx) + ', ' + dy + ' ' + dx + ', ' + dy);
        if (Edge.label) { lx = (from.x + (to.x - from.x) * 0.25); }
        break;
    }
    case '-|>' : {
        style = ('marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none');
        d = ('m ' + from.x + ',' + from.y + ' ' + dx + ',0 0,' + dy);
        if (Edge.label) { lx = to.x; }
        break;
    }
    case '|->' : {
        style = ('marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none');
        d = ('m ' + from.x + ',' + from.y + ' 0,' + dy + ' ' + dx + ',0');
        if (Edge.label) { lx = from.x; }
        break;
    }
    case '-|->': {
        style = ('marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none');
        d = ('m ' + from.x + ',' + from.y + ' ' + (dx / 2) + ',0 0,' + dy + ' ' + (dx / 2) + ',0');
        break;
    }
    case '<->' : {
        style = ('marker-end:url(#arrowhead);marker-start:url(#arrowtail);stroke:#0041c4;stroke-width:1;fill:none');
        break;
    }
    case '<~>' : {
        style = ('marker-end:url(#arrowhead);marker-start:url(#arrowtail);stroke:#0041c4;stroke-width:1;fill:none');
        d = ('M ' + from.x + ',' + from.y + ' ' + 'c ' + (0.7 * dx) + ', 0 ' + (0.3 * dx) + ', ' + dy + ' ' + dx + ', ' + dy);
        break;
    }
    case '<-~>': {
        style = ('marker-end:url(#arrowhead);marker-start:url(#arrowtail);stroke:#0041c4;stroke-width:1;fill:none');
        d = ('M ' + from.x + ',' + from.y + ' ' + 'c ' + (0.7 * dx) + ', 0 ' +     dx + ', ' + dy + ' ' + dx + ', ' + dy);
        if (Edge.label) { lx = (from.x + (to.x - from.x) * 0.75); }
        break;
    }
    case '<-|>' : {
        style = ('marker-end:url(#arrowhead);marker-start:url(#arrowtail);stroke:#0041c4;stroke-width:1;fill:none');
        d = ('m ' + from.x + ',' + from.y + ' ' + dx + ',0 0,' + dy);
        if (Edge.label) { lx = to.x; }
        break;
    }
    case '<-|->': {
        style = ('marker-end:url(#arrowhead);marker-start:url(#arrowtail);stroke:#0041c4;stroke-width:1;fill:none');
        d = ('m ' + from.x + ',' + from.y + ' ' + (dx / 2) + ',0 0,' + dy + ' ' + (dx / 2) + ',0');
        break;
    }
    case '+':   { style = ('marker-end:url(#tee);marker-start:url(#tee);fill:none;stroke:#00F;stroke-width:1'); break; }
    case '|':   {
        style = 'fill:none;stroke:rgba(24, 24, 24, 0.38);stroke-width:1;stroke-dasharray: 3,3;';
        if (from.y > to.y) {
            var tmp = from;
            from = to;
            to = tmp;
        }
        d = 'M ' + (from.x + 0.5) + ',' + (from.y + 4) + ' ' + (to.x + 0.5) + ',' + (to.y - 4);
        break;
    }
    default   : { style = ('fill:none;stroke:#F00;stroke-width:1'); }
    }
    return {
        lx: lx,
        ly: ly,
        d: d,
        style: style
    };
}

module.exports = arcShape;
