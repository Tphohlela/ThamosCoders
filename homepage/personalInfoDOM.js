
var firstName = document.querySelector(".firstName");
var lastName = document.querySelector(".lastName");
var birthDate = document.querySelector(".birthDate");
var gender = document.getElementById("genderElem");
var email = document.getElementById("email");
var province = document.getElementById("province");
var titleElem = document.getElementById('title');
var university = document.getElementById("university");
var course = document.getElementById("course");
var qualification = document.getElementById("qualification");
var date = document.getElementById("date");
var interest = document.getElementById("interest");



var listJobs = document.querySelector(".listJobs");
var list = document.querySelector(".list");

var jobList =   [ 
    { job: 'software-developer', qual: 'Bachelors Degree' },
    { job: 'IT technician', qual: 'National Higher Certificate'},
    { job: 'front end developer', qual: 'Advanced Certificate' },
    { job: 'back end developer', qual: 'Diploma'},
    { job: 'software-engineer', qual: 'Bachelors Degree'}
 ];

 var categories = [
    { job: 'software-developer', matchCounter: 1, unmatchCounter: 0 },
    { job: 'IT technician', matchCounter: 0, unmatchCounter: 0 },
    { job: 'front end developer', matchCounter: 0, unmatchCounter: 0 },
    { job: 'back end developer', matchCounter: 0, unmatchCounter: 0 },
    { job: 'software-engineer', matchCounter: 0, unmatchCounter: 0}
 ];
 
 // Set localStorage with initial data
 if (!localStorage['categories']) {
    localStorage['categories'] = JSON.stringify(categories);
 } 

 // Saving jobs to the localStorage
if (!localStorage['jobs']) {
    localStorage['jobs'] = JSON.stringify(jobList);
}

function updateCounters() {
    // We need applicant details
    var titleValue = titleElem.options[titleElem.selectedIndex].value;
    var firstNameVal = (firstName.value).trim();
    var lastNameVal = (lastName.value).trim();
    var birthDateVal = (birthDate.value).trim();
    var genderValue = gender.options[gender.selectedIndex].value;
    var provinceValue = province.options[province.selectedIndex].value;
    var emailVal = (email.value).trim();
    var universityVal = (university.value).trim();
    var courseVal = (course.value).trim();
    var qualificationVal = qualification.options[qualification.selectedIndex].value;
    var dateVal = (date.value).trim;
    var interestVal = (document.querySelector('.radioBtn:checked').value).trim();

    var user = {
        title: titleValue,
        firstName: firstNameVal,
        lastName: lastNameVal,
        birthDate: birthDateVal,
        gender: genderValue,
        province: provinceValue,
        email: emailVal,
        university: universityVal,
        course: courseVal,
        qualification: qualificationVal,
        dateVal: dateVal,
        interest: interestVal
    }

    var jobs = [];
    var categories = [];
    var users = [];



    if (localStorage['jobs']) {
        jobs = JSON.parse(localStorage.getItem('jobs'));
    }

    if (localStorage['categories']) {
        categories = JSON.parse(localStorage.getItem('categories'));
    }

    if (localStorage['users']) {   
        users = JSON.parse(localStorage.getItem('users'));
        users.push(user);
        localStorage['users'] = JSON.stringify(users);
    } else {
        users.push(user);
        localStorage['users'] = JSON.stringify(users);
    }

    // Returns all jobs the user qualified for
    var jobsQualifiedFor = jobs.filter( function(elem) {
        return qualificationVal === elem.qual && interestVal === elem.job;
    });

    if(jobsQualifiedFor.length > 0) {

        listJobs.innerHTML = 'You have been matched successfully';
        listJobs.innerHTML += `<ol>${'Job : ' + interestVal + ' ,  ' + 'Qualification required :  ' + qualificationVal}</ol>`;

        // Find index of specific object using findIndex method.    
        var objIndex = categories.findIndex((category => category.job == interestVal));

        // Update object's matchCounter property.
        categories[objIndex].matchCounter = (categories[objIndex]).matchCounter + 1;

        // Set storage with updated data
        localStorage['categories'] = JSON.stringify(categories);

    } else {
        listJobs.innerHTML = 'Unfortunately,we have not been able to find a match for you';
        list.innerHTML =`<a href="../homepage/index3.html"><p style="font-size:bold;">Click this link for available jobs that might match your qualification</p></a>`;
         
         var objIndex = categories.findIndex((category => category.job == interestVal));
         categories[objIndex].unmatchCounter = (categories[objIndex]).unmatchCounter + 1;
         localStorage['categories'] = JSON.stringify(categories);
    }  

}


document.getElementById('select').onclick = updateCounters;