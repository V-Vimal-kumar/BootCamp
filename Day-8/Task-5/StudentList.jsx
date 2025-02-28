import React from "react";
import './App.css';

function StudentList({student}){
    return(
        <>
        <div className="stu">
        <div className="head">
        <h1>STUDENTS</h1>
        </div>
            {student.map((stu)=>(
                <div>
                <h1> name={stu.name}</h1>
                <h2>major={stu.major}</h2>
                <h2>year={stu.year}</h2>
                </div>
            ))}
            </div>
        </>
    )
}
export default StudentList