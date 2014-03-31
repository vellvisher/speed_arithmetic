    //+ Jonas Raoni Soares Silva
    //@ http://jsfromhell.com/array/shuffle [v1.0]

shuffle = function(o){ //v1.0
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

range = function(start, end) {
    var a = [];
    for (i = start; i < end; i++) {
        a[i-start] = i;
    }
    return a;
}
