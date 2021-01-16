

function readInFile() {
    
    const fs = require('fs') 
    try {
        let data = fs.readFileSync('students.txt', 'utf-8');
        return formatData(data);
    } catch (error) {
        console.log("unable to read file: ", error);
    }
   
}

function formatData(data) {
        var ppl = data.split('-');
        var i = 0;
        var people = [];
        for (var person=0; person < ppl.length; person++){
            var line = ppl[person].split('\n');
            var user = {};
            user["name"] = line[i];
            user["term"] = line[i+1];
            user["courses"] = line[i+2].split(' ');
            user["timezone"] = line[i+3];
            var habits = line[i+4].split(' ');
            user["tod"] = habits[0];
            user["focus"] = habits[1];
            user["style"] = habits[2];
            user["wantedMembers"] = line[i+5];
            user["group"] = line[i+6].split(' ');
            if (user["group"].includes('')) {
                user["group"] = [];
            }
            people.push(user);
            if (person == 0) {
                i++;
            }
        }
        return(people);
}

let students = readInFile();
//console.log(students);

var person = {
    name: 'Priyanka',
    term: '1B',
    courses: ['MATH119','ECE106'],
    timezone: 'EST',
    tod: 'Afternoon',
    focus: 'Relaxed',
    style: 'Visual',
    wantedMembers: '2',
    group: []
};  

function findMatches(person) {
    var possibleMatches = [];
    for (var student=0; student<students.length; student++) {
        if (students[student]["term"] == person["term"]) {
            for (var course=0; course<person["courses"].length; course++) {
                if (students[student]["courses"].includes(person["courses"][course]) && !possibleMatches.includes(students[student]) && students[student]["wantedMembers"] != 1) {
                    possibleMatches.push(students[student]);
                }
            }
        }
    }
    return(possibleMatches);
}

let matches = findMatches(person);
//console.log(matches);

function addToTeam(person,memberName) {
    person["group"].push(memberName);
    person["wantedMembers"]--;
    for (var student=0; student<students.length; student++) {
        if (students[student]["name"] == memberName) {
            students[student]["group"].push(person["name"]);
            students[student]["wantedMembers"]--;
        }
    }
}