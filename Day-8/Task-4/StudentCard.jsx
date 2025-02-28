import React from "react";

const StudentCard = ({ name, major, year }) => {
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-blue-100 p-6 text-center border border-blue-300">
      <h2 className="text-2xl font-bold text-blue-700">{name}</h2>
      <p className="text-lg text-gray-700 mt-2">Major: {major}</p>
      <p className="text-lg text-gray-700">Year: {year}</p>
    </div>
  );
};

export default StudentCard;
