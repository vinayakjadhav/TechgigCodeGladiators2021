process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;
var output = [];
var cache = [];
process.stdin.on('data', function(data) {
  input_stdin += data;
});

process.stdin.on('end', function() {
  var packets;
  var subSequences;
  input_stdin_array = input_stdin.split("\r\n");
  // console.log(input_stdin_array)

  //Write code here
  var noOfPackets = input_stdin_array[0];
  var packets = input_stdin_array[1].split(" ").map(a => +a);

  console.log("noOfPackets ", noOfPackets);
  console.log("packets ", packets);

  for (var i = 0; i < packets.length; i++) {
    if (isPrimeNumber(packets[i])) {
      output[i] = 1 + packets[i];
    } else {
      var plausibleGroups = getFactors(packets[i]);
      console.log("plausibleGroups for ", packets[i], plausibleGroups);
      output[i] = getMoves(packets[i], plausibleGroups);
    }
  }

  function getMoves(balls, groups) {
    console.log("groups for ", balls, groups);
    if (groups.length == 0) {
      console.log("groups ", groups, " returning 1 ");
      return balls;
    }
    var total = 0;
    var m = 0;
    var a = [];
    for (var i = 0; i < groups.length; i++) {
      var gp = getFactors(groups[i]);
      if (cache[groups[i]]) {
        a[i] = cache[groups[i]];
      } else {
        a[i] = (balls / groups[i]) + getMoves(groups[i], gp);
        cache[groups[i]] = a[i];
      }
    }
    console.log("a ", a);
    total += Math.max(...a);
    return total;
  }

  function getFactors(number) {
    var factors = [];
    for (var i = 2; i ** 2 <= number; i++) {
      if (number % i == 0) {
        factors.push(i);
        if (number / i !== i)
          factors.push(number / i);
      }
    }
    return factors.sort();
  }

  function isPrimeNumber(number) {
    for (var i = 2; i ** 2 <= number; i++) {
      if (number % i == 0) return false;
    }
    return number > 1;
  }
  console.log("output ", output);
  output = output.reduce((total, num) => total + Math.round(num));
  console.log(output);
  process.stdout.write("" + output + "");
});