// Add coloring scheme
let currentTimeHour = currentTimeDate.getHours();

const deadlineHandler = {
    /* Logic and conditional handling for styling goes here */ 
    
    taskBorderStyle: function(target, border, deadline) {
        target.style.borderImageSource = `${border}`; // Pointer for styling later based on deadlines defined
        target.style.borderImageSlice = "1";
        target.style.borderStyle = "solid"; // Optional
    },

    differenceInSeconds: function(deadline, currentTimeDate) {
        let output = deadline - currentTimeDate;
        output = output/1000; /* From milliseconds */
        return output;
    },

    differenceInMinutes: function(deadline, currentTimeDate) {
        let output = deadline - currentTimeDate;
        output = output/60/1000; /* From milliseconds */
        return output;
    },

    differenceInHours: function(deadline, currentTimeDate) {
        let output = deadline - currentTimeDate;
        output = output/60/60/1000; /* From milliseconds */
        return output;
    },
    differenceInDays: function(deadline, currentTimeDate) {
        let output = deadline - currentTimeDate;
        output = output/24/60/60/1000; /* From milliseconds */
        return output;
    },
    
    timelimitApplied: function(target, deadline, checkbox, completedState) { // The color values and time parameters are automatically generated by co-pilot and such. It's a pretty braindead task to write this out manually.
        let deadlineDate = new Date(deadline);
        let defaultDeadline = new Date("1970-01-01T00:00:00");

        if (checkbox.checked == true || completedState) {
            this.taskBorderStyle(target, "linear-gradient(30deg, #32CD32, #00FF00)", "solid");
            console.log("Task completed. Applying green gradient");
            return;
        } else if (this.differenceInDays(deadlineDate, currentTimeDate) <= -300) {
            this.taskBorderStyle(target, "linear-gradient(30deg, #D3D3D3, #A9A9A9)", "solid");
            console.log("Deadline expired by more than 300 days. Applying gray gradient");
            return;
        } else if(deadlineDate < currentTimeDate) {
            this.taskBorderStyle(target, "linear-gradient(30deg, #FF0000, #8B0000)", "solid");
            console.log("Task expired. Applying red-darkred");
            return;
        } else if (this.differenceInMinutes(deadlineDate, currentTimeDate) < 30) {
            this.taskBorderStyle(target, "linear-gradient(30deg, #8A2BE2, #4B0082)", "solid");
            console.log("Less than 30 minutes left. Applying purple-indigo");
            return;
        } else if (this.differenceInHours(deadlineDate, currentTimeDate) < 1) {
            this.taskBorderStyle(target, "linear-gradient(30deg, #9370DB, #8A2BE2)", "solid");
            console.log("Less than 1 hour left. Applying medium purple-purple");
            return;
        } else if (this.differenceInHours(deadlineDate, currentTimeDate) < 3) {
            this.taskBorderStyle(target, "linear-gradient(30deg, #7B68EE, #9370DB)", "solid");
            console.log("Less than 3 hours left. Applying medium slate blue-medium purple");
            return;
        } else if (this.differenceInHours(deadlineDate, currentTimeDate) < 6) {
            this.taskBorderStyle(target, "linear-gradient(30deg, #6A5ACD, #7B68EE)", "solid");
            console.log("Less than 6 hours left. Applying slate blue-medium slate blue");
            return;
        } else if (this.differenceInHours(deadlineDate, currentTimeDate) < 12) {
            this.taskBorderStyle(target, "linear-gradient(30deg, #483D8B, #6A5ACD)", "solid");
            console.log("Less than 12 hours left. Applying dark slate blue-slate blue");
            return;
        } else if (this.differenceInHours(deadlineDate, currentTimeDate) < 24) {
            this.taskBorderStyle(target, "linear-gradient(30deg, #4169E1, #483D8B)", "solid");
            console.log("Less than 1 day left. Applying royal blue-dark slate blue");
            return;
        } else if (this.differenceInDays(deadlineDate, currentTimeDate) < 2) {
            this.taskBorderStyle(target, "linear-gradient(30deg, #1E90FF, #4169E1)", "solid");
            console.log("Less than 2 days left. Applying dodger blue-royal blue");
            return;
        } else if (this.differenceInDays(deadlineDate, currentTimeDate) < 3) {
            this.taskBorderStyle(target, "linear-gradient(30deg, #00BFFF, #1E90FF)", "solid");
            console.log("Less than 3 days left. Applying deep sky blue-dodger blue");
            return;
        } else if (this.differenceInDays(deadlineDate, currentTimeDate) < 5) {
            this.taskBorderStyle(target, "linear-gradient(30deg, #00CED1, #00BFFF)", "solid");
            console.log("Less than 5 days left. Applying dark turquoise-deep sky blue");
            return;
        } else if (this.differenceInDays(deadlineDate, currentTimeDate) < 7) {
            this.taskBorderStyle(target, "linear-gradient(30deg, #20B2AA, #00CED1)", "solid");
            console.log("Less than 7 days left. Applying light sea green-dark turquoise");
            return;
        } else if (this.differenceInDays(deadlineDate, currentTimeDate) < 14) {
            this.taskBorderStyle(target, "linear-gradient(30deg, #40E0D0, #20B2AA)", "solid");
            console.log("Less than 14 days left. Applying turquoise-light sea green");
            return;
        } else if (this.differenceInDays(deadlineDate, currentTimeDate) < 30) {
            this.taskBorderStyle(target, "linear-gradient(30deg, #48D1CC, #40E0D0)", "solid");
            console.log("Less than 30 days left. Applying medium turquoise-turquoise");
            return;
        } else if(deadlineDate > defaultDeadline) {
            this.taskBorderStyle(target, "linear-gradient(30deg, #00FFFF, #48D1CC)", "solid");
            console.log("More than 30 days left. Applying cyan-medium turquoise");
            return;
        } else {
            this.taskBorderStyle(target, "linear-gradient(30deg, #D3D3D3, #A9A9A9)", "solid");
            console.log("No deadline set. Applying gray gradient");
            return;
        }
    }
}

