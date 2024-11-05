let undostack = [];
let redostack = [];
let result = true;

function creategoal(Goalname, description){
    let thecontainer = document.getElementById('Container')
    let goalpage = document.createElement('div');

    goalpage.classList.add('Goalshadow');

    const goaltitle = document.createElement('h2');
    goaltitle.textContent = Goalname;

    const goaldescription = document.createElement('p');
    goaldescription.textContent = description;

    const button = document.createElement('button');
    button.textContent = 'delete';
    button.setAttribute('class', 'goaldeletion');
    button.addEventListener('click', function() {
        undostack.push(document.getElementById('Container').innerHTML);
        thecontainer.removeChild(goalpage);
    })

    goalpage.appendChild(goaltitle);
    goalpage.appendChild(goaldescription);
    goalpage.appendChild(button);

    document.getElementById('Container').appendChild(goalpage);
}

function addedgoal(){
    setTimeout(() => {
        if(result != false){
            result = confirm("Congratulations on adding your very first goal! If you did not desire to create a goal, you can either delete the goal, which is located on each goal pager. Or, you can also use the Undo button to erase the goal pager. If you want your goal pager back, you can press the undo button.");
        }
    }, 500);
    event.preventDefault();
    let Goalname = document.getElementById('goalinput').value.trim();
    let description = document.getElementById('message').value.trim();
    document.getElementById("thisform").reset();

    if(!Goalname || !description){
        alert("You must fill in all the fields!");
        return "nothing";
    }else{
        undostack.push(document.getElementById('Container').innerHTML);
        creategoal(Goalname, description);
        const element = document.getElementById("TheDivmodal");
        element.classList.add('hidden');
        var thegoalbutton = document.getElementById('addGoal');
        thegoalbutton.style.position = 'fixed';
        document.getElementById('Undo').style.position = 'fixed';
        document.getElementById('Redo').style.position = 'fixed';
    }

}

function goHome(){
    event.preventDefault();
    const element = document.getElementById("TheDivmodal");
    element.classList.add('hidden');
    var thegoalbutton = document.getElementById('addGoal');
    thegoalbutton.style.position = 'fixed';
    document.getElementById('Undo').style.position = 'fixed';
    document.getElementById('Redo').style.position = 'fixed';

}

function getGoalpage(){
    setTimeout(() => {
        if(result){
            result = confirm("Welcome to the add goal page! From here, you should add values such as the name of your goal, the description for it, when you want reminders, its deadline, and how high you want to prioritize this goal.")
            if(result){
                result = confirm("You can also cancel your goal creation. However, if you believe that your goal is good, then you can submit it with the submission button.")
            }
        }
    }, 500);
    const element = document.getElementById("TheDivmodal");
    element.classList.remove('hidden');
    var thegoalbutton = document.getElementById('addGoal');
    thegoalbutton.style.position = 'absolute';
    document.getElementById('Undo').style.position = 'absolute';
    document.getElementById('Redo').style.position = 'absolute';
}

function undoit(undo, redo){
    if (undo.length > 0) {
        // Push current state to redostack before popping from undostack
        redo.push(document.getElementById('Container').innerHTML);
        const nextState = undo.pop();
        if (nextState !== undefined) {
            document.getElementById('Container').innerHTML = nextState;
            restoreDeleteButtons();
        }
    }
}

function redoit(undo, redo){
    if (redo.length > 0) {
        undo.push(document.getElementById('Container').innerHTML); // Save current state for undo
        const nextState = redo.pop();
        if (nextState !== undefined) {
            document.getElementById('Container').innerHTML = nextState;
            restoreDeleteButtons();
        }
    }
}

function restoreDeleteButtons() {
    const elements = document.querySelectorAll('.goaldeletion');
    elements.forEach((element) => {
        element.addEventListener('click', function() {
            undostack.push(document.getElementById('Container').innerHTML);
            element.parentNode.remove();
        });
    });
}
/*
document.getElementById('Container').addEventListener('click', function(event) {
    if (event.target.classList.contains('goaldeletion')) {
        undostack.push(document.getElementById('Container').innerHTML); // Push current state to undostack
        event.target.parentNode.remove(); // Remove the goal
    }
});
*/

window.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        result = this.confirm(`Welcome to the goal tracker! You can start off this app by selecting the +Add Goal butt on the bottom right hand side, which will create your own custom and personal goal!`)
        if(result != false){
            result = this.confirm("You can also select the help page if you need further guidence! It is located on the navigvation bar called, 'Help'.");
        }
    }, 500);
    


    var addgoalbutton = document.getElementById('addGoal');
    if(addgoalbutton != undefined){
        addgoalbutton.addEventListener('click', getGoalpage);
    }
    var cancelbutton = document.getElementById('cancellation');
    if(cancelbutton != undefined){
        cancelbutton.addEventListener('click', goHome);
    }
    var submitbutton = document.getElementById('submitted');
    if(submitbutton != undefined){
        submitbutton.addEventListener('click', addedgoal);
    }
    var undobutton = document.getElementById('Undo');
    if(undobutton){
        undobutton.addEventListener('click', function() {
            undoit(undostack, redostack);
        });
    }
    var redobutton = document.getElementById('Redo');
    if(redobutton){
        redobutton.addEventListener('click', function() {
            redoit(undostack, redostack);
        })
    }
})

