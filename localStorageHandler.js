// LOCAL CLIENT STORAGE HANDLER

const storageHandler = { 
    storageTest: function() { // Simply test if storing works to prevent other errors
        try {
            const test = '__localStorage_test__';
            /*Object.freeze(localStorage); // Flip to resume/pause error condition. Test code for error handling */
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            if(taskID != 0) {throw new exception("Task ID is not a number, is 0, empty, false");} // Error handling for taskID;
            return true;
        }   catch (e) {
            document.getElementById("storageUnavailable").style.display = "block"; // Makes the error message visible
            return false;   
        }
    },

    saveTask: function(taskID, taskData) { // Modularized this function to make it reusable
        if (!this.storageTest()) { // The ! does the same as (this.storageTest === false);
            console.error("Saving unavailable. Check localStorage permissions");
            return;
        }
        const existingTask = JSON.parse(localStorage.getItem(taskID)) || {}; // Add the new data or add an empty entry
        const newTaskData = { ...existingTask, ...taskData }; // Allows you to update/add existing entries
        
        localStorage.setItem(taskID, JSON.stringify(newTaskData)) // Saving it as a JSON will make it alot easier to get the key-value pairs
        console.log("Task successfully saved to localStorage");
    }, // In JS we add a comma to seperate 2 or more functions within an object literal or method list, except the last one

    loadAllTasks: function() {
        if (!this.storageTest()) { 
            console.error("Loading unavailable. Check localStorage permissions");
            return;
        }

        const insertToTarget = document.getElementById("taskList");
        insertToTarget.innerHTML = ""; // Clearing the list to prevent duplicate entires
       
        // Use a for-loop instead of a conditional While, since I'll be getting every item in localStorage anyways
        for (let count = 0; count < localStorage.length; count++) { // Iterates over all the data from the total length of the localStorage list
            var key = localStorage.key(count);
            if(key === "darkmode") {console.log("Darkmode key detected. Skipping..."); continue;} // The continue syntax skips the current iteration and moves to the next one
            if(key!=0 || key!= false){
                const taskData = JSON.parse(localStorage.getItem(key));

                
                //TODO: This line converts the deadline value into a date. I have condition checks for falsey values in coreTaskList.js. Should look at this later
                let deadline = new Date (taskData.deadline) || false; // Parsing to prevent unexpected behavior elsewhere and keep it consistently as a Date object.
                
                
                const taskElement =  createTaskElement(taskData.id, taskData.title, taskData.description, taskData.completed, deadline, taskData.priority);
                insertToTarget.appendChild(taskElement);
                console.log("Saving item to LocalStorage (see next line):")
                console.log(taskElement);
            }
        } 
        console.log("Tasks successfully loaded");
    },
    // TODO: Create a new function called generateUniqueOrderID. It will be used to sort tasks around in the list.
    generateUniqueNumber: function(prefix) { 
        
        
        let counter = 0;
        do {
            if (prefix) {key = `${prefix}-${counter}`}
            else {key = counter}; // prints "ID" along with the taskID number right after, stringified
            counter++
        }  while (localStorage.getItem(key) ||  document.getElementById(key) !== null) { //  "while" is good for looping logics and not conditional logics where you might use "if" 
            // This way of error handling works good, but the order of tasks might end up different than original
        }                                                        // localStorage will return NULL if the key (storeTaskID) is duplicate or doesn't exist. 
        console.log('Unique ID generated:'+key);
        return taskID; // return the ID number as a result of the function
    },

    generateUniqueID: function() { 
        if (!this.storageTest()) {
            console.error("Cannot generate a unique ID. LocalStorage is unavailable. Your new task ID may be duplicate");
            return;
        }
        let counter = 1;
        let taskID;
        do {
            taskID = `ID-${counter}`; // prints "ID" along with the taskID number right after, stringified
            counter++
        }  while (localStorage.getItem(taskID) ||  document.getElementById(taskID) !== null) { //  "while" is good for looping logics and not conditional logics where you might use "if" 
            // This way of error handling works good, but the order of tasks might end up different than original
        }                                                        // localStorage will return NULL if the key (storeTaskID) is duplicate or doesn't exist. 
        console.log('Unique ID generated:'+taskID);
        return taskID; // return the ID number as a result of the function
    },
    
   deleteTask: function(targetID) {
        if (!this.storageTest()) { 
            console.error("Deletion unavailable. Check localStorage permissions");
            return;
        }
        console.log(taskID);
        localStorage.removeItem(targetID); // No need for conditional statements here. If it can't delete the item, it should throw an error
        console.log("Task deleted successfully")
    },

    deleteAll: function() {
        if (confirm("Are you sure you want to delete ALL tasks? This action cannot be undone.")) {
            const list = document.getElementById("taskList");
            list.innerHTML = "";
            localStorage.clear();
            alert("All tasks has been permanentely deleted.")
        } else {
            console.log("Delete ALL task aborted");
        }
    }
}

window.onload = function() {
    // Loading handler will go here 
    storageHandler.loadAllTasks();
}

