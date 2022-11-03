import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getFirestore,
    onSnapshot,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyCrRuYXR1yvXj6YfmuX3UmESmN09saC3Pc",
    authDomain: "reto-final-maffe.firebaseapp.com",
    databaseURL: "https://reto-final-maffe-default-rtdb.firebaseio.com",
    projectId: "reto-final-maffe",
    storageBucket: "reto-final-maffe.appspot.com",
    messagingSenderId: "367504755006",
    appId: "1:367504755006:web:94ce683fa3a8561fb0446f"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();


// ESTUDIANTES

export const saveStudent = (name, lastName) =>
    addDoc(collection(db, "Estudiantes"), {name, lastName});

export const onGetStudents = (callback) =>
    onSnapshot(collection(db, "Estudiantes"), callback);

export const deleteStudent = (id) => deleteDoc(doc(db, "Estudiantes", id));

export const getStudent = (id) => getDoc(doc(db, "Estudiantes", id));

export const updateStudent = (id, newFields) =>
    updateDoc(doc(db, "Estudiantes", id), newFields);

// CLASES

export const saveClass = (title, description) =>
    addDoc(collection(db, "Clases"), {title, description});

export const onGetClasses = (callback) =>
    onSnapshot(collection(db, "Clases"), callback);

export const deleteClass = (id) => deleteDoc(doc(db, "Clases", id));

export const getClass = (id) => getDoc(doc(db, "Clases", id));

export const updateClass = (id, newFields) =>
    updateDoc(doc(db, "Clases", id), newFields);

// LLAMADA A MATRICULAS

export const saveEnrollment = (studentId, classId) =>
    addDoc(collection(db, "Matriculas"), {studentId, classId});

export const onGetEnrollments = (callback) =>
    onSnapshot(collection(db, "Matriculas"), callback);

export const deleteEnrollment = (id) => deleteDoc(doc(db, "Matriculas", id));