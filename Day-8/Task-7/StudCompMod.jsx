import React, { useState } from "react";
import './App.css';

function StudCompMod({ student }) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredStudents = student.filter(stu =>
        stu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stu.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stu.year.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                </div>
                {filteredStudents.map((stu, index) => (
                    <div key={index} className="student-card" data-year={stu.year.toLowerCase()}>
                        <h1>{stu.name}</h1>
                        <h2>{stu.major}</h2>
                        <h2>{stu.year}</h2>
                    </div>
                ))}
            </div>
        </>
    );
}

export default StudCompMod;
