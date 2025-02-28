import React from 'react'
import StudCompMod from  './StudCompMod'

function App(){
  const student=[
    {name:"VIMAL" ,major:"IT" ,year:"senior"},
    {name:"PRADEEP" ,major:"IT", year:"Freshman"},
    {name:"AKASH", major:"IT" ,year:"junior"}
  ]
  return(
    <div>
      <StudCompMod student={student}/>
    </div>
  )
}
export default App
