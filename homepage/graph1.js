
var jobList =   [ 
   { job: 'software-developer', qual: 'Bachelors Degree' },
   { job: 'IT technician', qual: 'National Higher Certificate'},
   { job: 'front end developer', qual: 'Advanced Certificate' },
   { job: 'back end developer', qual: 'Diploma'},
   { job: 'software-engineer', qual: 'Bachelors Degree'}
]
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

if (!localStorage['jobs']) {
   localStorage['jobs'] = JSON.stringify(jobList);
}

// Variables to hold chart data
var categoriesName = [];
var matchList = [];
var unmatchList = [];

// Getting data from local storage
var jobs = JSON.parse(localStorage.getItem('jobs'));
var categoriesList = JSON.parse(localStorage.getItem('categories'));

// Setting chart data
var categoriesMap = jobs.map(function (element) {
   categoriesName.push(element.job)
})

var matching = categoriesList.map(function (element) {
   matchList.push(element.matchCounter)
   unmatchList.push(element.unmatchCounter)
})

var mychart = document.getElementById('chart').getContext('2d');

var newChart = new Chart(mychart, {
   type: 'bar',
   data: {
      labels: categoriesName,
      datasets: [{
         label: 'matching skills',
         data: matchList,
         backgroundColor: 'orange',
      },
      {
         label: 'unmatching skills',
         data: unmatchList,
         backgroundColor: 'red',
      }]
   },
   options: {
      scales: {
         y: {
            beginAtZero: true
         }
      }
   }
});