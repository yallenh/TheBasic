/**
 * Reference: http://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/
 */

if (typeof Object.create !== 'function') {
    Object.create = function(o) {
        function F() {}     // create temporary constructor
        F.prototype = o;    // F() constructor now inherites all properties of o
        return new F();     // return instance of F(), which copys all properties of o
    }
}

function inheritPrototype(childObj, parentObj) {
    /*
    var copyParentObj = Object.create(parentObj.prototype);
    copyParentObj.constructor = childObj;
    childObj.prototype = copyParentObj;
    */
    var childConstructor = childObj;
    childObj.prototype = Object.create(parentObj.prototype);
    childObj.prototype.constructor = childConstructor;
}


// --- parent object start ---
function SmartContent(question, choices, answer) {
    this.question = question;
    this.choices = choices;
    this.answer = answer;
    
    var QUIZ_CREATED_DATE = new Date().toLocaleDateString(); // private variable

    this.getCreatedDate = function() {
        return QUIZ_CREATED_DATE;
    }

    console.log('Quiz created on ' + this.getCreatedDate());
}
SmartContent.prototype.getAnswer = function() {
    return this.answer;
}
SmartContent.prototype.showQuestion = function() {
    var content = '<div class="question">' + this.question + '</div><ul>';
    this.choices.forEach(function(choice, index) {
        content += '<li><input type="radio" name="choice" value="' + index + '">' + choice + '</li>';
    });
    content += '</ul>';
    console.log(content);
}
// --- parent object end ---

// --- child project start ---
function Quiz(question, choices, answer) {
    SmartContent.call(this, question, choices, answer);
}
inheritPrototype(Quiz, SmartContent);
Quiz.prototype.showQuestion = function() {
    console.log('This is Quiz question: ' + this.question);
}

function Poll(question, choices, answer) {
    SmartContent.call(this, question, choices, answer);
}
inheritPrototype(Poll, SmartContent);
Poll.prototype.showQuestion = function() {
    console.log('This is Poll question: ' + this.question);
}
// --- child project end ---


var allQuestionnaires = [
    new SmartContent('This is smartcontent', [1,2]),
    new Quiz('Which one is larger?', [1,2,3]),
    new Poll('Which one is popular?', ['green', 'blue'])
];

allQuestionnaires.forEach(function(questionnaire) {
    questionnaire.showQuestion();
})
