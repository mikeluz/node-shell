var fs = require('fs');
var request = require('request');

var pwd = function(done) {
    var output = process.cwd();
    done(output);
}

var echo = function(args, done) {
    var output = args.split(' ').map(function(arg) {
      return (arg[0] === "$") ? process.env[arg.slice(1)] : arg;
    }).join(' ');
    done(output);
}

var ver = function(done) {
    var output = process.env.TERM_PROGRAM_VERSION + "\n";
    done(output);
}

var date = function(done) {
  // var date = new Date();
  // var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  // var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  // var day = date.getDate();
  // var hours = date.getHours();
  // var minutes = date.getMinutes();
  // var seconds = date.getSeconds();
  // var year = date.getUTCFullYear();

  // var addZero = function(num) {
  //   if (num < 10) {
  //     return "0" + num;
  //   }
  //   return num;
  // }

  // var output = days[date.getDay()].slice(0, 3) + " " + months[date.getMonth()].slice(0, 3) + "  " + addZero(day) + " " + addZero(hours) +  ":" + addZero(minutes) + ":" + addZero(seconds) + " EST " + addZero(year);
  var output = Date();
  done(output);
}

var ls = function(done) {
  var filePath = process.cwd().split('/');
  var output = "";

  fs.readdir(filePath.join('/'), function(err, files) {
  if (err) throw err;
  output = files.join('\n');
  done(output);
  });
}

// var ls = function(done) {
//   var filePath = process.cwd().split('/');
//   var output = "";

//   fs.readdir(filePath.join('/'), function(err, files) {
//   if (err) throw err;
//   files.forEach(function(file) {
//     output += file.toString() + "\n";
//   })
//     done(output);
//   });
// }
// var commands = {
//   ls: function(file, done) {
//     var output = "";
//     fs.readdir('.', function(err, files) {
//       files.forEach(function(file) {
//         output += file.toString() + "\n";
//       })
//       done(output);
//     });
//   }
// }

var cat = function(args, done) {
  var file = args;
  var output = "";

  fs.readFile(file, (err, data) => {
    if (err) throw err;
    output += data.toString();
    done(output);
  });
}

var head = function(args, done) {
  var file = args;
  var fileHead = [];
  var count = 0;
  var output = "";

  fs.readFile(file, (err, data) => {
    if (err) throw err;
    while (count < 5) {
      fileHead.push(data.slice(0, data.indexOf("\n")));
      data = data.slice(data.indexOf("\n")+1);
      count++;
    }

    output += fileHead.join('\n').toString();
    done(output);
  })
}

var tail = function(args, done) {
  var file = args;
  var fileTail = [];
  var count = 0;
  var output;

  fs.readFile(file, (err, data) => {
    if (err) throw err;
    var arr = data.toString().split("\n");
    while (count < 5) {
      fileTail.push(arr[arr.length-1]);
      arr.pop();
      count++;
    }

    output = fileTail.reverse().join('\n');
    done(output);
  })
}

var lc = function(args, done) {
  var file = args;
  var fileTail = [];
  var count = 0;
  var output;

  fs.readFile(file, (err, data) => {
    if (err) throw err;
    var arr = data.toString().split("\n");
    var output = arr.length;
    done(output);
  })
}

var curl = function(args, done) {
  var url = "http://www." + args;
  var output = "";

  request(url, function (error, response, body) {
    output += 'error: ' + error + "\n"; // Print the error if one occurred
    output += 'statusCode: ' + response && response.statusCode + "\n"; // Print the response status code if a response was received
    output += 'body: ' + body + "\n"; // Print the HTML for the Google homepage.
    done(output);
  });
}

var find = function() {
  
}

module.exports = {
  pwd: pwd,
  date: date,
  ls: ls,
  echo: echo,
  ver: ver,
  cat: cat,
  head: head,
  tail: tail,
  lc: lc,
  curl: curl
}
