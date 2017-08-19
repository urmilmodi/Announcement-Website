/********************************
**     NPSS Announcements      ** 
**                             **
** Urmilumar Modi              **
** ICS3U-A                     **
** Ver 3.0 - November 29, 2016 **
** Last Edit: Nov. 29, 2016    **
********************************/

var today, hours, min, day, currentTime; // Time Function Variables


// Announcement Creation Timestamp
function time() {
    "use strict"; // Instructing JavaScript code to be executed in "strict mode."

    // Retrieving Date, and using date to store date and time
    today = new Date();
    hours = today.getHours();
    min = today.getMinutes();
    
    // Adjusting the date and time to be in a more user-friendly format
    if (hours > 11) {
        if (hours === 12) {
            hours = 12;
        } else {
            hours = hours - 12;
        }
        day = "PM";
    } else if (hours === 0) {
        hours = 12;
        day = "AM";
    } else {
        day = "AM";
    }
    
    if (min < 10) {
        min = "0" + min;
    }
    
    // Formatting and then Storing date and time as variables
    currentTime = hours + ":" + min + " " + day;
}


var username, password; // Login Variables


// Teacher & Student Login
function login() {
    "use strict"; // Instructing JavaScript code to be executed in "strict mode."
    
    // Retrieving username and password
    username = document.getElementById("txtUsername").value;
    password = document.getElementById("txtPassword").value;

    // Verifying username and password
    if (username === "" || password === "") {
        window.alert("Enter Username & Password"); // User Feedback
    } else if (username === password) {
        localStorage.setItem("username", username); // Storing Username in localStorage, for Later Use
        
        if (window.location.href.includes("Login.HTML") && !window.location.href.includes("Student%20Login.HTML")) {
            window.location.assign("Create%20Announcements.HTML"); // Redirecting to Create Announcements
        } else {
            window.location.assign("Student%20View%20Announcements.HTML");
        }
    } else {
        window.alert("Wrong Username or Password"); // User Feedback
    }
}


var SGender, SGrade, SCategory1, SCategory2, SCategory, SClubTeam1, SClubTeam2, SClubTeam3, SClubTeam, IBT; // Settings Variables


// Retrieving Settings from HTML & Storing it
function getSettingsData() {
    "use strict"; // Instructing JavaScript code to be executed in "strict mode."
    
    // Retrieving Settings
    SGender = document.getElementById("GenderChoice").value;
    SGrade = document.getElementById("GradeChoice").value;
    SCategory1 = document.getElementById("CategoryChoice1").value;
    SCategory2 = document.getElementById("CategoryChoice2").value;
    SCategory = SCategory1 + SCategory2;
    SClubTeam1 = document.getElementById("ClubTeamChoice1").value;
    SClubTeam2 = document.getElementById("ClubTeamChoice2").value;
    SClubTeam3 = document.getElementById("ClubTeamChoice3").value;
    SClubTeam = SClubTeam1 + SClubTeam2 + SClubTeam3;
    IBT = document.getElementById("IBT").value;
    
    // Storing Settings in localStorage
    localStorage.setItem("SGender", SGender);
    localStorage.setItem("SGrade", SGrade);
    localStorage.setItem("SCategory1", SCategory1);
    localStorage.setItem("SCategory2", SCategory2);
    localStorage.setItem("SCategory", SCategory);
    localStorage.setItem("SClubTeam1", SClubTeam1);
    localStorage.setItem("SClubTeam2", SClubTeam2);
    localStorage.setItem("SClubTeam3", SClubTeam3);
    localStorage.setItem("SClubTeam", SClubTeam);
    localStorage.setItem("IBT", IBT);

    window.alert("Settings have been saved"); // User Feedback
    window.location.reload(); // Refreshing Page
}


// Displaying Settings
function setSettingsData() {
    "use strict"; // Instructing JavaScript code to be executed in "strict mode."
    
    // Recalling Settings Data
    SGender = localStorage.getItem("SGender");
    SGrade = localStorage.getItem("SGrade");
    SCategory = localStorage.getItem("SCategory");
    SCategory1 = localStorage.getItem("SCategory1");
    SCategory2 = localStorage.getItem("SCategory2");
    SClubTeam = localStorage.getItem("SClubTeam");
    SClubTeam1 = localStorage.getItem("SClubTeam1");
    SClubTeam2 = localStorage.getItem("SClubTeam2");
    SClubTeam3 = localStorage.getItem("SClubTeam3");
    IBT = localStorage.getItem("IBT");
    
    // Displaying Settings
    if (window.location.href.includes("Settings.HTML")) {
        document.getElementById("GenderChoice").value = SGender;
        document.getElementById("GradeChoice").value = SGrade;
        document.getElementById("CategoryChoice1").value = SCategory1;
        document.getElementById("CategoryChoice2").value = SCategory2;
        document.getElementById("ClubTeamChoice1").value = SClubTeam1;
        document.getElementById("ClubTeamChoice2").value = SClubTeam2;
        document.getElementById("ClubTeamChoice3").value = SClubTeam3;
        document.getElementById("IBT").value = IBT;
    }
}


var Announcement = [], Index = 0, Post = [], temp = "", edit, editValue = 0; // Array Variables

var Title = "", Teachername = "", Gender = "", Grade = "", Category = "", ClubTeam = "", Importance = "", Content = "", Time = ""; // Announcement Variabes


// Retrieving Announcement from HTML & Storing it
function getData() {
    "use strict"; // Instructing JavaScript code to be executed in "strict mode."    
    
    // Recalling Previous Announcments If Exist & Adjusting Index Value Based off Previous Announcements
    if (Announcement[0] !== null || Announcement[0] !== "") {
        temp = localStorage.getItem("Post");
        Announcement = JSON.parse(temp);
        Index = Announcement.length;
    } else {
        Index = 0;
    }
    
    time(); // Calling time function
    
    // Storing Announcement as Variables
    Title = document.getElementById("txtTitle").value;
    Teachername = document.getElementById("txtTeacherName").value;
    Gender = document.getElementById("GenderChoice").value;
    Grade = document.getElementById("GradeChoice").value;
    Category = document.getElementById("CategoryChoice").value;
    ClubTeam = document.getElementById("ClubTeamChoice").value;
    Importance = document.getElementById("Importance").value;
    Content = document.getElementById("txtContent").value;
    Time = currentTime;
    
    // Announcement Confirmation
    if (window.confirm("Are you sure about this Announcement?")) {

        // Recalling Announcement Edit Variables
        edit = localStorage.getItem("edit");
        editValue = Number(localStorage.getItem("editValue"));
        
        // Announcement Edit if Requested
        if (edit.includes("true") && 0 < editValue && editValue < Post.length) {
            
            // Recalling Index for Edit & Processing Edit
            Index = editValue;
            Time = Announcement[Index].Time;
            localStorage.setItem("editValue", Post.length);
            localStorage.setItem("edit", false);
        }
        
        // Storing Variables in Array
        Announcement[Index] = {
            Number: Index,
            Title: Title,
            Teachername: Teachername,
            Gender: Gender,
            Grade: Grade,
            Category: Category,
            ClubTeam: ClubTeam,
            Importance: Importance,
            Time: Time,
            Content: Content
        };
        
        temp = JSON.stringify(Announcement); // Stringifying Array & Storing
        localStorage.setItem("Post", temp); // Storing Stringified Array in localStorage
        
        window.location.assign("View%20Announcements.HTML"); // Redirecting to View Announcements
    }
}


// Displaying Announcement
function showData() {
    "use strict"; // Instructing JavaScript code to be executed in "strict mode."
    
    setSettingsData(); // Calling setSettingsData function to recall Settings
    
    temp = localStorage.getItem("Post"); // Storing Post as temp
    Post = JSON.parse(temp); // Converting temp (stringified array) to object
    
    // Set Variable for Search & Announcement Display
    var Search = document.getElementById("Search").value, Display = "", APost = "<tr>";
    
    // for loop, to allow display for multiple Announcements
    for (Index = 0; Index < Post.length; Index++) {

        // Filtering Announcements, based on User Settings
        if (((SGender === Post[Index].Gender || Post[Index].Gender === "Both") && (SGrade === Post[Index].Grade || Post[Index].Grade === "All Grades") && (SCategory.includes(Post[Index].Category) || (Post[Index].Category === "All Categories" && SCategory !== "NoneNone") || (Post[Index].Category === "IBT" && IBT === "Yes") || SCategory.includes("All Categories")) && (SClubTeam.includes(Post[Index].ClubTeam) || (Post[Index].ClubTeam === "All Clubs/Teams" && SClubTeam !== "NoneNoneNone") || SClubTeam.includes("All Clubs/Teams") || (Post[Index].Category === "IBT" && IBT === "Yes" && SClubTeam === "NoneNoneNone"))) || Post[Index].Importance === "Yes" || Post[Index].Category === "Guidance") {
            
            if (Search !== null || Search !== "") {
                temp = Post[Index].Title + Post[Index].Teachername + Post[Index].Gender + Post[Index].Grade + Post[Index].Category + Post[Index].ClubTeam + Post[Index].Tags + Post[Index].Content + Post[Index].Time;
                if ((temp.toUpperCase()).includes(Search.toUpperCase())) {
                    
                    // Displaying Announcements, when Announcement is validated via Filter & Search, Shows when nobody searches and Filter Pass
                    APost = "<tr>";
                    
                    // Checks If Student or Teacher
                    if (window.location.href.includes("View%20Announcements.HTML") && !window.location.href.includes("Student%20View%20Announcements.HTML")) {
                        APost += "<td>" + Post[Index].Number + "</td>";
                    }
                    APost += "<td>" + Post[Index].Title + "</td>";
                    APost += "<td>" + Post[Index].Teachername + "</td>";
                    APost += "<td>" + Post[Index].Gender + "</td>";
                    APost += "<td>" + Post[Index].Grade + "</td>";
                    APost += "<td>" + Post[Index].Category + "</td>";
                    APost += "<td>" + Post[Index].ClubTeam + "</td>";
                    APost += "<td>" + Post[Index].Time + "</td>";
                    APost += "<td>" + Post[Index].Content + "</td>";
                    APost += "</tr>";
                    Display = APost + Display;
                }
            }
        }
    }
    // Table Before Post
    var Past = document.getElementById("ATable").innerHTML;

    document.getElementById("ATable").innerHTML += Display;
    
    // Table After Post
    var Present = document.getElementById("ATable").innerHTML;
    
    // User Feedback
    if (Present === Past) {
        document.getElementById("ATable").style.display = "none";
        document.getElementById("s").style.display = "none";
        document.getElementById("edit").style.display = "none";
        
        // Checks If Student or Teacher
        if (window.location.href.includes("Student%20View%20Announcements.HTML")) {
            document.getElementById("edit").style.display = "none";
        }
        window.alert("Sorry, either your search did not match any announcements or there are no announcements");
    }
}


function editData() {
    "use strict"; // Instructing JavaScript code to be executed in "strict mode."
    
    temp = localStorage.getItem("Post"); // Storing Post as temp
    Post = JSON.parse(temp); // Converting temp (stringified array) to object
    
    if (window.location.href.includes("Create%20Announcements.HTML")) {
        
        // Recalling Announcement Edit Variables
        edit = localStorage.getItem("edit");
        editValue = Number(localStorage.getItem("editValue"));
        
        // Announcement Edit if Requested
        if (edit.includes("true") && 0 < editValue && editValue < Post.length) {

            // Recalling Announcement for Edit
            document.getElementById("txtTitle").value = Post[editValue].Title;
            document.getElementById("txtTeacherName").value = Post[editValue].Teachername;
            document.getElementById("GenderChoice").value = Post[editValue].Gender;
            document.getElementById("GradeChoice").value = Post[editValue].Grade;
            document.getElementById("CategoryChoice").value = Post[editValue].Category;
            document.getElementById("ClubTeamChoice").value = Post[editValue].ClubTeam;
            document.getElementById("Importance").value = Post[editValue].Importance;
            document.getElementById("txtContent").value = Post[editValue].Content;
        }
    } else {
        if (Number(document.getElementById("editValue").value) > 0 && Number(document.getElementById("editValue").value) < Post.length) {
            edit = true;
            editValue = Number(document.getElementById("editValue").value);
            localStorage.setItem("editValue", editValue);
            window.location.assign("Create%20Announcements.HTML");
        } else {
            edit = false;
        }
        localStorage.setItem("edit", edit);
    }
}