import React, { useState, useEffect } from "react";
import "./todoapp.css";
import firebase from "firebase";
import db from "../firebase";

function TodoApp() {
  const [task, setTask] = useState("");
  const [tasklist, setTaskList] = useState([]);

  useEffect(() => {
    populate();
  }, []);

  const populate = (data) => {
    setTaskList([]);
    return firebase
      .firestore()
      .collection("todos")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          let newData = doc.data();
          console.log(newData);
          if (tasklist.indexOf(newData.id) === -1) {
            setTaskList((arr) => {
              return [...arr, newData];
            });
          } else {
            console.log("this is a duplicate");
          }
          console.log("here are all of the todos", tasklist);
        });
      })
      .catch((e) => console.log(e));
  };

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const AddTask = () => {
    if (task !== "") {
    
      // FIREBASE

      const datas = {
        id: firebase
          .firestore()
          .collection("todos")
          .doc().id,
      };

      const db = firebase.firestore();
      db.collection("todos")
        .doc(datas.id)
        .set({ id: datas.id, value: task, isCompleted: false })
        .then(() => {
          populate();
        });
      
    }
  };

  const deletetask = (e, id) => {
    e.preventDefault();
    setTaskList(tasklist.filter((t) => t.id != id));
    console.log(id);

    // DELETE

      db.collection("todos")
        .doc(id)
        .delete()
        .catch((error) => {
          console.error(id, "Error removing document");
        })   
  };

  const taskCompleted = (e, id) => {
    e.preventDefault();
    //let's find index of element
    const element = tasklist.findIndex((elem) => elem.id == id);

    //copy array into new variable
    const newTaskList = [...tasklist];

    //edit our element
    newTaskList[element] = {
      ...newTaskList[element],
      isCompleted: true,
    };

    setTaskList(newTaskList);
  };

  return (
    <div className="todo">
      <input
        type="text"
        name="text"
        id="text"
        onChange={(e) => handleChange(e)}
        placeholder="Add task here..."
      />
      <button className="add-btn" onClick={AddTask}>
        Add
      </button>
      <br />
      {tasklist !== [] ? (
        <ul>
          {tasklist.map((t) => (
            <li className={t.isCompleted ? "crossText" : "listitem"}>
              {t.value}
              <button
                className="completed"
                onClick={(e) => taskCompleted(e, t.id)}
              >
                Completed
              </button>

              <button className="delete" onClick={(e) => deletetask(e, t.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default TodoApp;