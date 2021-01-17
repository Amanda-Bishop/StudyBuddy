
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
            user["wantedMembers"] = parseInt(line[i+5]);
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

function findMatches(person) {
    var possibleMatches = [];
    for (var student=0; student<students.length; student++) {
        if (students[student]["term"] == person["term"]) {
            for (var course=0; course<person["courses"].length; course++) {
                if (students[student]["courses"].includes(person["courses"][course]) && !possibleMatches.includes(students[student]) && students[student]["wantedMembers"] != 1 && person["wantedMembers"] > students[student]["group"].length + 1) {
                    possibleMatches.push(students[student]);
                }
            }
        }
    }
    return(possibleMatches);
}

function addToTeam(person,memberName) {
    person["group"].push(memberName);
    person["wantedMembers"]--;
    for (var student=0; student<students.length; student++) {
        if (students[student]["name"] == memberName) {
            if (students[student]["group"].length != 0) {
                for (var member=0; member<students[student]["group"].length; member++) {
                    person["group"].push(students[student]["group"][member]);
                    person["wantedMembers"]--;
                    for (var s=0; s<students.length; s++) {
                        if (students[s]["name"] == students[student]["group"][member]) {
                            students[s]["group"].push(person["name"]);
                            students[s]["wantedMembers"]--;
                        }
                    }
                }
            }
            students[student]["group"].push(person["name"]);
            students[student]["wantedMembers"]--;
        }
    }
}

window.onload = function(){
    let matches = findMatches(person);
    for (var match=0; match<matches.length; match++) {
        console.log(matches[match]);
        document.getElementById('people').innerHTML = matches[match].name;
        var courseStr;
        for (var course=0; course<matches[match].courses.length; course++) {
            courseStr += matches[match].courses[course];
            if (course != matches[match].courses.length-1) {
                courseStr += ' ';
            }
        }
        document.getElementById('people').innerHTML = courseStr;
        document.getElementById('people').innerHTML = matches[match].timezone;
        document.getElementById('people').innerHTML = matches[match].time;
        document.getElementById('people').innerHTML = matches[match].focus;
        document.getElementById('people').innerHTML = matches[match].style;
        if (matches[match].group.length != 0) {
            var groupStr;
            for (var p=0; p<matches[match].group.length; p++) {
                groupStr += matches[match].group[p];
                if (p != matches[match].group.length-1) {
                    groupStr += ' ';
                }
            }
            document.getElementById('people').innerHTML = groupStr;
        }
        
    }
    console.log('l');
}