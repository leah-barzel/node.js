
localStorage.setItem("accessToken", data.accessToken);

const token = localStorage.getItem("accessToken");

Authorization: Bearer <JWT>

fetch("http://localhost:3000/tasks", {
    headers: { Authorization: `Bearer ${token}` },
})


function login() {
    fetch("http://localhost:3000/login", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName: "leahbarzel", password: "123456" }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log("Token:", data.accessToken);
          localStorage.setItem("accessToken", data.accessToken);
        });
      } else {
        console.error("Unauthorized access. Please check your credentials.");
      }
    }).catch((error) => {
      console.error("Error:", error);
    });
  }
  
  function getTasks() {
    const token = localStorage.getItem("accessToken");
    if(!token) {
      console.error("Access token not found. Please login first.");
      return;
    }
    fetch("http://localhost:3000/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log("Tasks:", data);
        });
      } else {
        console.error("Failed to fetch tasks. Please check your authorization.");
      }
    }).catch((error) => {
      console.error("Error:", error);
    });
  }

// function login() {
//     fetch("http://localhost:3000/login", { 
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ userName: "malkabr", password: "123456" }),
//     }).then((res) => {
//       res.json().then((data) => {
//         console.log("token", data.accessToken);
//         localStorage.setItem("accessToken", data.accessToken);
//       });
//     });
//   }

//   function getTasks() {
//   const token = localStorage.getItem("accessToken");
//   fetch("http://localhost:3000/tasks", {
//     headers: { Authorization: `Bearer ${token}` },
//   }).then((res) => {
//     res.json().then((data) => {
//       console.log("tasks", data);
//     });
//   });
// }
