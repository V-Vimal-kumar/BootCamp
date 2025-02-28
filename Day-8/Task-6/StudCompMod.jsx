import React from "react";
import './App.css';

function StudCompMod({student}) {
    const getBackgroundColor = (year) => {
        switch (year.toLowerCase()) {
            case "freshman": return "green";
            case "sophomore": return "yellow";
            case "junior": return "blue";
            case "senior": return "red";
            default: return "gray";
        }
    };

    return (
        <>
            <div className="stu">
                <div className="head">
                    <h1>STUDENTS</h1>
                </div>
                {student.map((stu, index) => (
                    <div key={index} className="student-card" style={{ backgroundColor: getBackgroundColor(stu.year) }}>
                        <h1>{stu.name}</h1>
                        <h2>{stu.major}</h2>
                        <h2>{stu.year}</h2>
                    </div>
                ))}
            </div>
        </>
    );
}

export default StudCompMod
