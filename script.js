// =====================================
// EduFlow AI - script.js (Part 1)
// =====================================

// ---------- Local Storage ----------

let teachers = JSON.parse(localStorage.getItem("teachers")) || [];
let subjects = JSON.parse(localStorage.getItem("subjects")) || [];
let classes = JSON.parse(localStorage.getItem("classes")) || [];
let rooms = JSON.parse(localStorage.getItem("rooms")) || [];
let timetables = JSON.parse(localStorage.getItem("timetables")) || [];
let activity = JSON.parse(localStorage.getItem("activity")) || [];

// ---------- Save Data ----------

function saveData() {

    localStorage.setItem("teachers", JSON.stringify(teachers));
    localStorage.setItem("subjects", JSON.stringify(subjects));
    localStorage.setItem("classes", JSON.stringify(classes));
    localStorage.setItem("rooms", JSON.stringify(rooms));
    localStorage.setItem("timetables", JSON.stringify(timetables));
    localStorage.setItem("activity", JSON.stringify(activity));

}

// ---------- Dashboard ----------

function updateDashboard() {

    document.getElementById("teacherCount").textContent = teachers.length;
    document.getElementById("subjectCount").textContent = subjects.length;
    document.getElementById("classCount").textContent = classes.length;
    document.getElementById("timetableCount").textContent = timetables.length;

    document.getElementById("statusTeachers").textContent = teachers.length;
    document.getElementById("statusSubjects").textContent = subjects.length;
    document.getElementById("statusClasses").textContent = classes.length;
    document.getElementById("statusRooms").textContent = rooms.length;
    document.getElementById("statusTables").textContent = timetables.length;

}

// ---------- Activity ----------

function addActivity(text){

    activity.unshift(text);

    if(activity.length > 10){

        activity.pop();

    }

    saveData();

    renderActivity();

}

function renderActivity(){

    const list = document.getElementById("activityList");

    if(!list) return;

    if(activity.length === 0){

        list.innerHTML = "<li>No activity yet.</li>";
        return;

    }

    list.innerHTML = "";

    activity.forEach(item=>{

        list.innerHTML += `<li>✅ ${item}</li>`;

    });

}

// ---------- Navigation ----------

const menuItems = document.querySelectorAll(".menu li");
const pages = document.querySelectorAll(".page");
const pageTitle = document.getElementById("pageTitle");

menuItems.forEach(item=>{

    item.addEventListener("click",()=>{

        menuItems.forEach(m=>m.classList.remove("active"));

        item.classList.add("active");

        pages.forEach(page=>{

            page.classList.remove("active-page");

        });

        const page = item.dataset.page;

        document.getElementById(page).classList.add("active-page");

        pageTitle.textContent =
            page.charAt(0).toUpperCase() + page.slice(1);

    });

});

// ---------- Quick Action Buttons ----------

document.querySelectorAll(".action-btn").forEach(btn=>{

    btn.addEventListener("click",()=>{

        const page = btn.dataset.page;

        menuItems.forEach(m=>m.classList.remove("active"));

        document.querySelector(`[data-page="${page}"]`)
        .classList.add("active");

        pages.forEach(p=>p.classList.remove("active-page"));

        document.getElementById(page)
        .classList.add("active-page");

        pageTitle.textContent =
        page.charAt(0).toUpperCase()+page.slice(1);

    });

});

// ---------- Notification ----------

const notify = document.querySelector(".notify");

if(notify){

notify.onclick = ()=>{

alert("No new notifications.");

}

}

// ---------- Initial Load ----------

updateDashboard();

renderActivity();

saveData();
// =====================================
// EduFlow AI - script.js (Part 2)
// Teachers, Subjects, Classes & Rooms
// =====================================

// ---------- Render Teachers ----------

function renderTeachers() {

    const table = document.getElementById("teacherTable");

    if (!table) return;

    if (teachers.length === 0) {
        table.innerHTML = `
        <tr>
            <td colspan="3" class="empty">
                No teachers added.
            </td>
        </tr>`;
        return;
    }

    table.innerHTML = "";

    teachers.forEach((teacher, index) => {

        table.innerHTML += `
        <tr>

            <td>${teacher.name}</td>

            <td>${teacher.subject}</td>

            <td>

                <button class="delete-btn"
                onclick="deleteTeacher(${index})">

                Delete

                </button>

            </td>

        </tr>
        `;

    });

}

// ---------- Add Teacher ----------

const addTeacherBtn = document.getElementById("addTeacher");

if (addTeacherBtn) {

addTeacherBtn.onclick = () => {

    const name =
    document.getElementById("teacherName").value.trim();

    const subject =
    document.getElementById("teacherSubject").value.trim();

    if (name === "" || subject === "") {

        alert("Please fill all fields.");

        return;

    }

    teachers.push({

        name,
        subject

    });

    document.getElementById("teacherName").value = "";
    document.getElementById("teacherSubject").value = "";

    saveData();

    renderTeachers();

    updateDashboard();

    addActivity("Teacher Added : " + name);

};

}

// ---------- Delete Teacher ----------

function deleteTeacher(index){

    if(confirm("Delete this teacher?")){

        addActivity("Teacher Deleted : " + teachers[index].name);

        teachers.splice(index,1);

        saveData();

        renderTeachers();

        updateDashboard();

    }

}

// =====================================
// SUBJECTS
// =====================================

function renderSubjects(){

    const table =
    document.getElementById("subjectTable");

    if(!table) return;

    if(subjects.length===0){

        table.innerHTML=
        `<tr>
        <td colspan="2" class="empty">
        No subjects added.
        </td>
        </tr>`;

        return;

    }

    table.innerHTML="";

    subjects.forEach((subject,index)=>{

        table.innerHTML+=`

        <tr>

        <td>${subject}</td>

        <td>

        <button class="delete-btn"

        onclick="deleteSubject(${index})">

        Delete

        </button>

        </td>

        </tr>

        `;

    });

}

const addSubjectBtn =
document.getElementById("addSubject");

if(addSubjectBtn){

addSubjectBtn.onclick=()=>{

const subject=
document.getElementById("subjectName")
.value.trim();

if(subject===""){

alert("Enter subject.");

return;

}

subjects.push(subject);

document.getElementById("subjectName").value="";

saveData();

renderSubjects();

updateDashboard();

addActivity("Subject Added : "+subject);

};

}

function deleteSubject(index){

if(confirm("Delete subject?")){

addActivity("Subject Deleted : "+subjects[index]);

subjects.splice(index,1);

saveData();

renderSubjects();

updateDashboard();

}

}

// =====================================
// CLASSES
// =====================================

function renderClasses(){

const table=document.getElementById("classTable");

if(!table) return;

if(classes.length===0){

table.innerHTML=
`<tr>

<td colspan="2" class="empty">

No classes added.

</td>

</tr>`;

return;

}

table.innerHTML="";

classes.forEach((item,index)=>{

table.innerHTML+=`

<tr>

<td>${item}</td>

<td>

<button class="delete-btn"

onclick="deleteClass(${index})">

Delete

</button>

</td>

</tr>

`;

});

}

const addClassBtn=document.getElementById("addClass");

if(addClassBtn){

addClassBtn.onclick=()=>{

const value=document
.getElementById("className")
.value.trim();

if(value===""){

alert("Enter class.");

return;

}

classes.push(value);

document.getElementById("className").value="";

saveData();

renderClasses();

updateDashboard();

addActivity("Class Added : "+value);

};

}

function deleteClass(index){

if(confirm("Delete class?")){

addActivity("Class Deleted : "+classes[index]);

classes.splice(index,1);

saveData();

renderClasses();

updateDashboard();

}

}

// =====================================
// ROOMS
// =====================================

function renderRooms(){

const table=document.getElementById("roomTable");

if(!table) return;

if(rooms.length===0){

table.innerHTML=

`<tr>

<td colspan="2" class="empty">

No rooms added.

</td>

</tr>`;

return;

}

table.innerHTML="";

rooms.forEach((room,index)=>{

table.innerHTML+=`

<tr>

<td>${room}</td>

<td>

<button class="delete-btn"

onclick="deleteRoom(${index})">

Delete

</button>

</td>

</tr>

`;

});

}

const addRoomBtn=document.getElementById("addRoom");

if(addRoomBtn){

addRoomBtn.onclick=()=>{

const room=document
.getElementById("roomName")
.value.trim();

if(room===""){

alert("Enter room.");

return;

}

rooms.push(room);

document.getElementById("roomName").value="";

saveData();

renderRooms();

updateDashboard();

addActivity("Room Added : "+room);

};

}

function deleteRoom(index){

if(confirm("Delete room?")){

addActivity("Room Deleted : "+rooms[index]);

rooms.splice(index,1);

saveData();

renderRooms();

updateDashboard();

}

}

// ---------- Initial Render ----------

renderTeachers();
renderSubjects();
renderClasses();
renderRooms();
// =====================================
// EduFlow AI - script.js (Part 3)
// Timetable, Recent Activity & Settings
// =====================================

// ---------- Render Recent Timetables ----------

function renderRecentTimetables() {

    const table = document.getElementById("recentTable");

    if (!table) return;

    if (timetables.length === 0) {

        table.innerHTML = `
        <tr>
            <td colspan="4" class="empty">
                No timetable created yet.
            </td>
        </tr>`;

        return;
    }

    table.innerHTML = "";

    timetables.forEach(item => {

        table.innerHTML += `
        <tr>

            <td>${item.className}</td>

            <td>${item.teacher}</td>

            <td>${item.room}</td>

            <td>Completed</td>

        </tr>
        `;

    });

}

// ---------- Generate Timetable ----------

function generateTimetable() {

    if (
        teachers.length === 0 ||
        subjects.length === 0 ||
        classes.length === 0 ||
        rooms.length === 0
    ) {

        alert("Please add Teachers, Subjects, Classes and Rooms first.");

        return;
    }

    timetables = [];

    classes.forEach((className, index) => {

        const teacher = teachers[index % teachers.length];
        const room = rooms[index % rooms.length];

        timetables.push({

            className: className,
            teacher: teacher.name,
            room: room

        });

    });

    saveData();

    updateDashboard();

    renderRecentTimetables();

    addActivity("New timetable generated.");

    alert("Timetable generated successfully!");

}

// ---------- Generate Buttons ----------

document.querySelectorAll(".create-btn").forEach(btn => {

    btn.addEventListener("click", generateTimetable);

});

// ---------- Clear All Data ----------

function clearAllData() {

    if (!confirm("Delete ALL saved data?")) return;

    teachers = [];
    subjects = [];
    classes = [];
    rooms = [];
    timetables = [];
    activity = [];

    saveData();

    renderTeachers();
    renderSubjects();
    renderClasses();
    renderRooms();
    renderRecentTimetables();
    renderActivity();
    updateDashboard();

    alert("All data has been cleared.");

}

// ---------- Keyboard Shortcuts ----------

document.addEventListener("keydown", function(e){

    // Ctrl + S
    if(e.ctrlKey && e.key === "s"){

        e.preventDefault();

        saveData();

        alert("Data Saved!");

    }

});

// ---------- Welcome ----------

console.log("EduFlow AI Loaded Successfully");

// ---------- Initial Load ----------

renderRecentTimetables();

updateDashboard();

renderActivity();

renderTeachers();

renderSubjects();

renderClasses();

renderRooms();

saveData();