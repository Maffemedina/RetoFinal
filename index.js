import {
    deleteClass,
    deleteStudent,
    getClass,
    getStudent,
    onGetClasses,
    onGetStudents,
    saveClass,
    saveStudent,
    updateClass,
    updateStudent,
} from "./firebase.js";

//Devuelve una referencia al elemento por su ID
const clasesForm = document.getElementById("clases-form");
const estudiantesForm = document.getElementById("estudiantes-form");

const classesContainer = document.getElementById("classes-container");
const studentsContainer = document.getElementById("students-container");

let editStatus = false;
let id = "";

window.addEventListener("DOMContentLoaded", async (e) => {

    onGetClasses((querySnapshot) => {
        classesContainer.innerHTML = "";

        querySnapshot.forEach((doc) => {
            const clase = doc.data();

            classesContainer.innerHTML += `
      <div class="card card-body mt-2 border-dark">
        <h3 class="h5">${"Título: " + clase.title}</h3>
        <p>${"Descripción: " + clase.description}</p>
        <div>
          <button class="btn btn-primary btn-delete" data-id="${doc.id}">
            🗑 Delete
          </button>
          <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
            ✏️ Edit
          </button>
        </div>
      </div>`;
        });

        const btnsDelete = classesContainer.querySelectorAll(".btn-delete");
        btnsDelete.forEach((btn) =>
            btn.addEventListener("click", async ({target: {dataset}}) => {
                try {
                    await deleteClass(dataset.id);
                } catch (error) {
                    console.log(error);
                }
            })
        );

        const btnsEdit = classesContainer.querySelectorAll(".btn-edit");
        btnsEdit.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                try {
                    const doc = await getClass(e.target.dataset.id);
                    const task = doc.data();
                    clasesForm["clases-title"].value = task.title;
                    clasesForm["clases-description"].value = task.description;

                    editStatus = true;
                    id = doc.id;
                    clasesForm["btn-clases-form"].innerText = "Actualizar";
                } catch (error) {
                    console.log(error);
                }
            });
        });
    });

    onGetStudents((querySnapshot) => {
        studentsContainer.innerHTML = "";

        querySnapshot.forEach((doc) => {
            const student = doc.data();
            console.log(student);

            studentsContainer.innerHTML += `
      <div class="card card-body mt-2 border-primary">
        <h3 class="h5">${student.name + ' ' + student.lastName}</h3>
        <p>${"Id: " + doc.id}</p>
        <div>
          <button class="btn btn-primary btn-delete" data-id="${doc.id}">
            🗑 Delete
          </button>
          <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
            ✏️ Edit
          </button>
        </div>
      </div>`;
        });

        const btnsDelete = studentsContainer.querySelectorAll(".btn-delete");
        btnsDelete.forEach((btn) =>
            btn.addEventListener("click", async ({target: {dataset}}) => {
                try {
                    await deleteStudent(dataset.id);
                } catch (error) {
                    console.log(error);
                }
            })
        );

        const btnsEdit = studentsContainer.querySelectorAll(".btn-edit");
        btnsEdit.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                try {
                    const doc = await getStudent(e.target.dataset.id);
                    const student = doc.data();
                    estudiantesForm["student-name"].value = student.name;
                    estudiantesForm["student-last-name"].value = student.lastName;

                    editStatus = true;
                    id = doc.id;
                    estudiantesForm["btn-students-form"].innerText = "Actualizar";
                } catch (error) {
                    console.log(error);
                }
            });
        });
    });

});

clasesForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = clasesForm["clases-title"];
    const description = clasesForm["clases-description"];

    try {
        if (!editStatus) {
            await saveClass(title.value, description.value);
        } else {
            await updateClass(id, {
                title: title.value,
                description: description.value,
            });

            editStatus = false;
            id = "";
            clasesForm["btn-clases-form"].innerText = "Guardar";
        }

        clasesForm.reset();
        title.focus();
    } catch (error) {
        console.log(error);
    }
});

estudiantesForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstName = estudiantesForm["student-name"];
    const lastName = estudiantesForm["student-last-name"];

    try {
        if (!editStatus) {
            await saveStudent(firstName.value, lastName.value);
        } else {
            await updateStudent(id, {
                name: firstName.value,
                lastName: lastName.value,
            });

            editStatus = false;
            id = "";
            estudiantesForm["btn-students-form"].innerText = "Guardar";
        }

        estudiantesForm.reset();
        firstName.focus();
    } catch (error) {
        console.log(error);
    }
});