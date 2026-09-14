import { useState } from 'react';
import './App.css'

    let age: number = 20;
    console.log(age);
    let name: string = "Qasim";
    console.log(name)
    let isstudent: boolean = true;
    console.log(isstudent)


    ///arrays

        type Student = {
        name: string;
        age: number;
        isStudent: boolean;
    }

    function student() {

    const students:Student[] = [
        {
            name: "Qasim",
            age: 20,
            isStudent: true
        }
    ]
    students.push({
        name: "Ali",
        age: 22,
        isStudent: false
    })
console.log(students[0].name);



///OBJECTS

function printStudent(person:Student){
    console.log("hello",person.name)

}

printStudent(students[0]);



type Products= {
    name: string;
    price: number;
}


const practice: Products [] =[
     {
    name: "laptop",
    price: 1000
},
{
    name: "MOBILE",
    price: 1000
}


]
console.log(practice[1].name);


function showProducts(item : Products) {

    console.log("Product name is", item.name, "and price is", item.price)

}
    showProducts(practice[1]);




    type books ={
        name: string;
        price: number;
        isAvailable: boolean;
    }



    const stationary: books[] = [
        {
            name: "peer-i-kamil",
            price: 500,
            isAvailable: true
        }
    ]


function displaybooks(x:books){
    console.log("Book name is", x.name, "and price is", x.price)
}
displaybooks(stationary[0]);

function checkavailabilityofbook(x:books){
    console.log("book status is " + x.isAvailable)
}
checkavailabilityofbook(stationary[0]);


//function with a return type
function getprice(x:books): string{
    return "Book price is " + x.price
}
const price = getprice(stationary[0]);
console.log(price);


function getbookavailability(x:books): boolean{
    return x.isAvailable
}
const availability = getbookavailability(stationary[0]);
console.log ("Book availabily is " + availability);


function showValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}console.log(showValue("hello"));
console.log(showValue(3.14159));


//Genenric function
function getfirst<T>(items:T[]): T {
    return items[items.length-1];
}

const firststudent = getfirst([students]);
console.log (firststudent);
// this <T> means that any type  (string, numbers etc...)
// items: T[]  (receives an array of any type T)
//  ): T  returns a value of the same type T
// function getFirst<T>(items: T[]): T  
// Give me an array of ANY type, and I'll give you one item of that SAME type.



type studentstatus = "active" | "inactive" | "graduated";
let status: studentstatus = "active";
console.log(status);




// TYPESCRIPT WITH REACT 
// PROPS

type studentprops= {
    name: string,
    age : number,
    isStudent: boolean
}

let age = 16

age.toFixed(2)

console.log(+age)


const [student, setStudent] = useState<studentprops>({
    name: 'Ali',
    age: 0,
    isStudent: false
})



    return (
        <>
        <button onClick = {()=> setStudent({
            ...student,
            name: "Ali",
            age: 22,
            isStudent: false
        })}>Change Student</button>

        <div>
            <h2>{student.name}</h2>
            <h3>Age is {student.age}</h3>
            <p>Is Student: {student.isStudent ? "Yes" : "No"}</p>
        </div>
        </>
    );
}
export default student;

