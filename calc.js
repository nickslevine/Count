const electron = require('electron');
const fs = require('fs');
const savePath = (electron.app || electron.remote.app).getPath('userData')+"/data.txt";

// Data

let history = {
    inputs: [],
    index: -1
}

function save() {
  let calcs = document.getElementById('answers').innerHTML;
  console.log(savePath);
  fs.writeFileSync(savePath, calcs);
}

function load() {
  fs.readFile(savePath, 'utf8', function(err, data) {
    if (err) throw err;
    console.log(data);
    document.getElementById('answers').innerHTML = data;
  });
}

function clear() {
    console.log("clearing...")
    document.getElementById('answers').innerHTML = '';
    save();
}

load();

// Interface

function calc() {
        if (document.getElementById('expression').value != '') {
            exp = document.getElementById('expression').value;
            history.inputs.push(exp);
            history.index += 1;
            ans = eval(exp);
            console.log(exp, " ", ans);
        if (ans != undefined) {
            document.getElementById('answers').innerHTML+= exp;
            document.getElementById('answers').innerHTML+= '<span class="answertext">\t=\t';
            document.getElementById('answers').innerHTML+= '<b>' + ans + '</b></span>';
            document.getElementById('answers').innerHTML+= '<br><br>';
            document.getElementById('expression').value = ans;
        } else {
            document.getElementById('expression').value = '';
        }
        save();
        }
    }
    function focbox() {
        document.getElementById('expression').focus();
    }
    function clear() {
        document.getElementById('expression').value = '';
        console.log('worked');
    }

    function handleKeys() {
        if (event.keyCode == 13) {calc()}
        else if (event.keyCode == 38) {
            if (history.index > 0) {
                history.index -= 1;
                document.getElementById('expression').value = history.inputs[history.index];
            }
        }
        else if (event.keyCode == 40) {
            if (history.index < history.inputs.length-1) {
                history.index += 1;
                document.getElementById('expression').value = history.inputs[history.index];
            }
        }
        else {
            focbox();
        }
}

// Math functions

    function divide() {
        document.getElementById('expression').value += '/';
    }
    function multiply() {
        document.getElementById('expression').value += '*';
    }
    function btninput(val) {
        document.getElementById('expression').value += val;
    }

    const sqrt = (n) => Math.sqrt(n);

    const sin = (n) => Math.sin(n);

    const cos = (n) => Math.cos(n);

    const tan = (n) => Math.tan(n);

    const extent = (arr) => d3.extent(arr);

    const pi = Math.PI;

    const sum = (...nums) => [...nums].reduce((acc, val) => (acc + val));

    const mean = (...nums) => [...nums].reduce((p, e) => {
        return p + e;
    }) / nums.length;

    const c = (n) => ((n - 32) * 5 / 9);

    const f = (n) => (n * (9 / 5) + 32);

    const roots = (a,b,c) => {
        let arr = [];
        arr.push(((-1*b + (sqrt(b*b - 4*a*c)))/2*a));
        arr.push(((-1*b - (sqrt(b*b - 4*a*c)))/2*a));
        return arr;
    }

    const chart = (expression) => {
        
        var svg = d3.select('#answers')
            .append('svg')
                .attr("width", 100)
                .attr("height", 100)
            .append("g")
                .attr("transform", 
                    "translate(" + 0 + "," + 0 + ")");

        var x = d3.scaleLinear().range([0, 100]);
        var y = d3.scaleLinear().range([100, 0]);

        var line = d3.line()
            .x(function (d) {return x(d.x);})
            .y(function (d) {return y(d.y);});

        let fn = (x) => eval(expression);

        var data = d3.range(-100, 101).map(function (d) {
            //return to -100, 100?
            return {x:d, y:parseInt(fn(d))};
        });

        console.log(data);

        x.domain(d3.extent(data, function (d) {return d.x;}));
        y.domain(d3.extent(data, function (d) {return d.y;}));

        svg.append('path')
            .datum(data)
            .attr('d', line)
            .attr('stroke-width', 1.5)
            .style("stroke-dasharray", ("2, 2"))
            .style("fill", "white")
            .attr('stroke', 'black');
        document.getElementById('answers').innerHTML += "<br>"
    }

