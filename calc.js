//System

const electron = require('electron');
const fs = require('fs');
const savePath = (electron.app || electron.remote.app).getPath('userData')+"/data.txt";

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

//Interface
function calc() {
        if (document.getElementById('expression').value != '') {
            exp = document.getElementById('expression').value;
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

    let sqrt = (n) => Math.sqrt(n);

    let pi = Math.PI;

    let sum = (...nums) => [...nums].reduce((acc, val) => (acc + val));

    let mean = (...nums) => [...nums].reduce((p, e) => {
        return p + e;
    }) / nums.length;

    let c = (n) => ((n - 32) * 5 / 9);

    let f = (n) => (n * (9 / 5) + 32);

    let roots = (a,b,c) => {
        let arr = [];
        arr.push(((-1*b + (sqrt(b*b - 4*a*c)))/2*a));
        arr.push(((-1*b - (sqrt(b*b - 4*a*c)))/2*a));
        return arr;
    }

