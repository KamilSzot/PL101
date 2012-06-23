var compile = function (musexpr) {
    var out = [],
        time = 0;
        
    var com = {
        note: function(n) {
            out.push({ tag: 'note', pitch: n.pitch, start: time, dur: n.dur });
            time += n.dur;
        },
        seq: function(musexpr) {
            pushNext(musexpr.left);
            pushNext(musexpr.right);
        },
        par: function(musexpr) {
            var start = time;
            pushNext(musexpr.left);
            var end_left = time;
            time = start;
            pushNext(musexpr.right);
            time = end_left > time ? end_left : time;
        },
        rest: function(musexpr) {
            time += musexpr.duration;
        },
        repeat: function(musexpr) {
            for(var i = 0; i<musexpr.count; i++) {
                pushNext(musexpr.section);
            }
        }
    };
    var pushNext = function(musexpr) {
        com[musexpr.tag](musexpr);
    };
    pushNext(musexpr);
    return out;
};

var melody_mus = 
    { tag: 'seq',
      left: 
       { tag: 'seq',
         left: { tag: 'note', pitch: 'a4', dur: 250 },
         right: { tag: 'note', pitch: 'b4', dur: 250 } },
      right:
       { tag: 'seq',
         left: { 
            tag: 'seq',
            left://{ tag: 'rest', duration: 100 },
            { tag: 'repeat',
                section: { tag: 'note', pitch: 'c4', dur: 250 },
            count: 3 },
    	    right: { tag: 'note', pitch: 'c4', dur: 500 }
         },
         right: { tag: 'note', pitch: 'd4', dur: 500 } } };

console.log(melody_mus);
console.log(compile(melody_mus));

