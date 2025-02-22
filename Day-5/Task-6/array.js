const people=[
    {name:"vk", age:20},
    {name:"sk",age:24},
    {name:"ak",age:42}
]

let old=people.filter(people=>people.age>20 ? true:false);
console.log(old)