const f=require('fs')
const p=require('path')

function file(fileName){
    if(!f.existsSync(fileName)){
        console.log("File not  Exist");
        return;
    }
    const stats=f.statSync(fileName);
    console.log(`file:${fileName}`);
    console.log(`Size:${stats.size}bytes`);
    console.log(`Creation Date:${new Date(stats.birthtime).toLocaleString()}`);
    console.log(`Last Modified:${new Date(stats.mtime).toLocaleString()}`);
}
if(process.argv.length!==3){
    console.log("enter one file!");
}
else{
    file(process.argv[2]);
}