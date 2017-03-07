var commands = require('./commands');
var fs = require('fs');
var chalk = require('chalk');
var prompt = chalk.green('\nPrompt > ');

process.stdout.write(prompt);

process.stdin.on('data', function (data) {
    var tokens = data.toString().trim().split(' ');
		var cmd = tokens[0];
    var args = tokens.slice(1).join(" ");

    if (cmd === "pwd") {
      commands.pwd(done);
    }

    if (cmd === "date") {
      commands.date(done);
    }

    if (cmd === "ls") {
      commands.ls(done);
    }

    if (cmd === "echo") {
      commands.echo(args, done);
    }

    if (cmd === "ver") {
      commands.ver(done);
    }

    if (cmd === "cat") {
      commands.cat(args, done);
    }

    if (cmd === "head") {
      commands.head(args, done);
    }

    if (cmd === "tail") {
      commands.tail(args, done);
    }

    if (cmd === "lc") {
      commands.lc(args, done);
    }

    if (cmd === "curl") {
      commands.curl(args, done);
    }

    else if (!commands[cmd]) {
      process.stdout.write(chalk.red("Command not found: ") + cmd);
    }

    // process.stdout.write('You typed: ' + cmd);
});

var done = function(output) {
  console.log(output);
  process.stdout.write(prompt);
}
