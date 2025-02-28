import React, { useState } from "react";
import './App.css';

function StudCompMod({ student }) {
    const [students, setStudents] = useState(student);
    const [searchTerm, setSearchTerm] = useState("");
    const [newStudent, setNewStudent] = useState({ name: "", major: "", year: "" });

    const filteredStudents = students.filter(stu =>
        stu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stu.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stu.year.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addStudent = () => {
        if (newStudent.name && newStudent.major && newStudent.year) {
            setStudents([...students, newStudent]);
            setNewStudent({ name: "", major: "", year: "" });
        }
    };

    const removeStudent = (index) => {
        setStudents(students.filter((_, i) => i !== index));
    };

    return (
        <>
            <div className="stu">
                <div className="head">
                    <h1>STUDENTS</h1>
                    <input 
                        type="text" 
                        placeholder="Search students..." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-bar"
                    />
                    <div className="add-student">
                        <input 
                            type="text" 
                            placeholder="Name" 
                            value={newStudent.name} 
                            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                        />
                        <input 
                            type="text" 
                            placeholder="Major" 
                            value={newStudent.major} 
                            onChange={(e) => setNewStudent({ ...newStudent, major: e.target.value })}
                        />
                        <input 
                            type="text" 
                            placeholder="Year" 
                            value={newStudent.year} 
                            onChange={(e) => setNewStudent({ ...newStudent, year: e.target.value })}
                        />
                        <button className="btn" onClick={addStudent}>Add Student</button>
                    </div>
                </div>
                {filteredStudents.map((stu, index) => (
                    <div key={index} className="student-card" data-year={stu.year.toLowerCase()}>
                        <h1>{stu.name}</h1>
                        <h2>{stu.major}</h2>
                        <h2>{stu.year}</h2>
                        <button className="btn btn-remove" onClick={() => removeStudent(index)}>Remove</button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default StudCompMod;
