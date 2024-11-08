// LOCAL CLIENT STORAGE HANDLER

const storageHandler = {
    saveTask: function(taskID, taskData) { // Modularized this function to make it reusable
        console.log("Task successfully saved to localStorage");
       
        const existingTask = JSON.parse(localStorage.getItem(taskID)) || {}; // Add the new data or add an empty entry
        const newTaskData = { ...existingTask, ...taskData }; // Allows you to update existing entries
        
        localStorage.setItem(taskID, JSON.stringify(newTaskData)) // Saving it as a JSON will make it alot easier to get the key-value pairs
    }, // In JS we add a comma to seperate 2 or more functions within an object literal (key-value pairs), except the last one

    loadAllTasks: function() {
        const insertToTarget = document.getElementById("taskList");
        insertToTarget.innerHTML = ""; // Clearing the list to prevent duplicate entires
       
        // Use a for-loop instead of a conditional While, since I'll be getting every item in localStorage anyways
        for (let count = 0; count < localStorage.length; count++) { // Iterates over all the data from the total length of the localStorage list
            var key = localStorage.key(count);
            const taskData = JSON.parse(localStorage.getItem(key));

            const taskElement =  createTaskElement(taskData.id, taskData.title, taskData.description, taskData.completed);
            insertToTarget.appendChild(taskElement);
        } 
        console.log("Tasks successfully loaded");
    },

    generateUniqueID: function() { 
        console.log("Unique ID generated");
        let counter = 1;
        let taskID;
        do {
            taskID = `ID-${counter}`; // prints "ID" along with the taskID number right after, stringified
            console.log(taskID);
            counter++
        }  while (localStorage.getItem(taskID) ||  document.getElementById(taskID) !== null) { //  "while" is good for looping logics and not conditional logics where you might use "if" 
                                                                 // This way of error handling works good, but the order of tasks might end up different than original
        }                                                        // localStorage will return NULL if the key (storeTaskID) is duplicate or doesn't exist. 
        return taskID; // return the ID number as a result of the function
    },

   deleteTask: function(targetID) {
        console.log(taskID);
        localStorage.removeItem(targetID); // No need for conditional statements here. If it can't delete the item, it should throw an error
   }
}

window.onload = function() {
    storageHandler.loadAllTasks();
    // Loading handler will go here 
}