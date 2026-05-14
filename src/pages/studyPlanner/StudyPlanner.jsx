/*
Study Planner
Advanced Study Planner with:
✅ LocalStorage persistence
✅ 7 days auto delete
✅ Browser notifications
✅ Alarm sound
✅ Phone vibration
✅ Reminder scheduling
*/

import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "./studyPlanner.css";

const StudyPlanner = () => {

  // ================= STATES =================

  const [task, setTask] = useState("");
  const [studyDate, setStudyDate] = useState("");
  const [studyTime, setStudyTime] = useState("");

  const [tasks, setTasks] = useState([]);

  // ================= LOAD TASKS =================

  useEffect(() => {

    const savedTasks =
      JSON.parse(localStorage.getItem("studyTasks")) || [];

    // remove tasks older than 7 days
   const validTasks = savedTasks.filter((task) => {

  const now = Date.now();

  const diffDays =
    (now - task.createdAt) /
    (1000 * 60 * 60 * 24);

  return diffDays < 7;

});

    setTasks(validTasks);

    localStorage.setItem(
      "studyTasks",
      JSON.stringify(validTasks)
    );

  }, []);

  // ================= SAVE TASKS =================

  useEffect(() => {

  const savedTasks =
    JSON.parse(localStorage.getItem("studyTasks")) || [];

  const now = Date.now();

  // keep only tasks less than 7 days
  const validTasks = savedTasks.filter((task) => {

    const diffDays =
      (now - task.createdAt) /
      (1000 * 60 * 60 * 24);

    return diffDays < 7;

  });

  setTasks(validTasks);

  // update cleaned tasks
  localStorage.setItem(
    "studyTasks",
    JSON.stringify(validTasks)
  );

}, []);

  // ================= ASK NOTIFICATION PERMISSION =================

  useEffect(() => {

    if (Notification.permission !== "granted") {

      Notification.requestPermission();

    }

  }, []);

  // ================= SHOW NOTIFICATION =================

  const showNotification = (title) => {

    if (Notification.permission === "granted") {

      new Notification(
        "Study Reminder 📚",
        {
          body: `Time to study: ${title}`,
          icon: "/logo.png",
        }
      );

    }

  };

  // ================= PLAY ALARM =================

  const playAlarm = () => {

    const audio = new Audio("/alarm.mp3");

    audio.play();

    // vibrate phone
    if (navigator.vibrate) {

      navigator.vibrate([300, 200, 300]);

    }

  };

  // ================= CHECK REMINDERS =================

  useEffect(() => {

    const interval = setInterval(() => {

      const now = new Date();

      tasks.forEach((task) => {

        const taskDateTime =
          new Date(
            `${task.studyDate}T${task.studyTime}`
          );

        const diff = taskDateTime - now;

        // notify within 1 minute
        if (
          diff > 0 &&
          diff < 60000 &&
          !task.notified
        ) {

          showNotification(task.title);

          playAlarm();

          task.notified = true;

          setTasks([...tasks]);

        }

      });

    }, 30000);

    return () => clearInterval(interval);

  }, [tasks]);

  // ================= ADD TASK =================

const addTask = () => {

  if(!task) return;

  const newTask = {

    id: Date.now(),

    title: task,

    createdAt: Date.now()

  };

  const updatedTasks = [...tasks, newTask];

  setTasks(updatedTasks);

  localStorage.setItem(
    "studyTasks",
    JSON.stringify(updatedTasks)
  );

  setTask("");

};

  // ================= DELETE TASK =================

  const deleteTask = (id) => {

  const updatedTasks =
    tasks.filter((task) => task.id !== id);

  setTasks(updatedTasks);

  localStorage.setItem(
    "studyTasks",
    JSON.stringify(updatedTasks)
  );

};

  // ================= SEO =================

  const url =
    "https://studenttoolsng.com/study-planner";

  const title =
    "Study Planner for Students | Plan Your Daily Study Schedule";

  const description =
    "Free study planner for Nigerian students. Organize your daily study tasks, improve productivity, and achieve academic success.";

  const image =
    "https://studenttoolsng.com/logo.png";

  return (

    <div className="studyplanner-container">

      <Helmet>

        <title>{title}</title>

        <meta
          name="description"
          content={description}
        />

        <link
          rel="canonical"
          href={url}
        />

        <meta
          property="og:title"
          content={title}
        />

        <meta
          property="og:description"
          content={description}
        />

        <meta
          property="og:image"
          content={image}
        />

        <meta
          property="og:url"
          content={url}
        />

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <script type="application/ld+json">

          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Study Planner",
            url: url,
            applicationCategory:
              "EducationalApplication",
            operatingSystem: "All",
            description: description
          })}

        </script>

      </Helmet>

      {/* ================= HEADER ================= */}

      <h1  className="studyplanner-title">Study Planner for Students</h1>

      {/* ================= FORM ================= */}

      <div  className="studyplanner-inputs">

        <input
        className="studyplanner-input"
          type="text"
          placeholder="Enter study task"
          value={task}
          onChange={(e) =>
            setTask(e.target.value)
            
          }
        />

        <input
        className="studyplanner-input"
          type="date"
          value={studyDate}
          onChange={(e) =>
            setStudyDate(e.target.value)
          }
        />

        <input
        className="studyplanner-input"
          type="time"
          value={studyTime}
          onChange={(e) =>
            setStudyTime(e.target.value)
          }
        />

        <button
        className="studyplanner-add-btn"
        onClick={addTask}>
          Add Task
        </button>

      </div>

      {/* ================= TASK LIST ================= */}

      <ul  className="studyplanner-task-list">

        {tasks.length === 0 && (

          <p className="studyplanner-empty">
            No study tasks yet
          </p>

        )}

        {tasks.map((t)=>(

 <li 
 className="studyplanner-task-item"
 key={t.id}>

  {t.title}

  <button
  className="studyplanner-delete-btn"
   onClick={() => deleteTask(t.id)}>
   Delete
  </button>

 </li>

))}

      </ul>

      {/* ================= CONTENT ================= */}

      <section className="studyplanner-content">

        <h2 className="studyplanner-content-heading">
          What is a Study Planner?</h2>

        <p className="studyplanner-content-text">
          A study planner helps students organize
          their daily academic tasks,
          manage time effectively,
          and improve productivity.
        </p>

        <h2 className="studyplanner-content-heading">Why You Need a Study Planner</h2>

        <ul className="studyplanner-content-list">
          <li className="studyplanner-content-list-item">
            Stay organized with your study schedule
          </li>

          <li>
            Avoid last-minute cramming
          </li>

          <li>
            Improve academic performance
          </li>

          <li>
            Manage your time effectively
          </li>

          <li>
            Receive automatic study reminders
          </li>
        </ul>

        <h2 className="studyplanner-content-heading">How This Planner Works</h2>

        <p className="studyplanner-content-text">
          Add your study tasks with a date
          and time. StudentToolsNG will
          remind you using browser
          notifications and alarm sounds.
        </p>

        <h2 className="studyplanner-content-heading">Important Notice</h2>

        <p className="studyplanner-content-text">
          Study tasks automatically expire
          after 7 days to help students
          stay active and organized.
        </p>

        <p className="studyplanner-link-box">

          You can also use our{" "}

          <a href="/cgpa-calculator">
            CGPA Calculator
          </a>{" "}

          and{" "}

          <a href="/jamb-score-calculator">
            JAMB Score Calculator
          </a>.

        </p>

      </section>

    </div>

  );

};

export default StudyPlanner;



// /*
// Study Planner
// Temporary 7-Day Study Planner
// Backend Connected
// */

// import { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
// import API from "../../services/api";
// import "./studyPlanner.css";

// const StudyPlanner = () => {

//  const [title, setTitle] = useState("");
//  const [subject, setSubject] = useState("");
//  const [studyDate, setStudyDate] = useState("");
//  const [studyTime, setStudyTime] = useState("");
//  const [note, setNote] = useState("");

//  const [tasks, setTasks] = useState([]);

//  const [loading, setLoading] = useState(false);

//  /* ================= FETCH TASKS ================= */

//  useEffect(() => {

//   fetchTasks();

//  }, []);

//  const fetchTasks = async () => {

//   try {

//    const res = await API.get("/study-planner");

//    setTasks(res.data);

//   } catch (error) {

//    console.log(error);

//   }

//  };

//  /* ================= ADD TASK ================= */

//  const addTask = async (e) => {

//   e.preventDefault();

//   if (
//    !title ||
//    !subject ||
//    !studyDate ||
//    !studyTime
//   ) {
//    alert("Please fill all required fields");
//    return;
//   }

//   try {

//    setLoading(true);

//    const res = await API.post("/study-planner", {

//     title,
//     subject,
//     studyDate,
//     studyTime,
//     note

//    });

//    setTasks([res.data.data, ...tasks]);

//    setTitle("");
//    setSubject("");
//    setStudyDate("");
//    setStudyTime("");
//    setNote("");

//    alert("Study plan added");

//   } catch (error) {

//    console.log(error);

//    alert("Failed to save study plan");

//   } finally {

//    setLoading(false);

//   }

//  };

//  /* ================= DELETE TASK ================= */

//  const deleteTask = async (id) => {

//   try {

//    await API.delete(`/study-planner/${id}`);

//    setTasks(tasks.filter((task) => task._id !== id));

//   } catch (error) {

//    console.log(error);

//    alert("Failed to delete task");

//   }

//  };

//  /* ================= DAYS LEFT ================= */

//  const getDaysLeft = (createdAt) => {

//   const created = new Date(createdAt);

//   const expiry = new Date(created);

//   expiry.setDate(expiry.getDate() + 7);

//   const now = new Date();

//   const diff = expiry - now;

//   const days = Math.ceil(
//    diff / (1000 * 60 * 60 * 24)
//   );

//   return days > 0 ? days : 0;

//  };

//  /* ================= SEO ================= */

//  const url =
//   "https://studenttoolsng.com/study-planner";

//  const titleSeo =
//   "Study Planner for Students | Plan Your Daily Study Schedule";

//  const description =
//   "Free study planner for Nigerian students. Organize your daily study tasks, improve productivity, and achieve academic success.";

//  const image =
//   "https://studenttoolsng.com/logo.png";

//  return (

//   <div className="planner">

//    <Helmet>

//     <title>{titleSeo}</title>

//     <meta
//      name="description"
//      content={description}
//     />

//     <link
//      rel="canonical"
//      href={url}
//     />

//     <meta
//      property="og:title"
//      content={titleSeo}
//     />

//     <meta
//      property="og:description"
//      content={description}
//     />

//     <meta
//      property="og:image"
//      content={image}
//     />

//     <meta
//      property="og:url"
//      content={url}
//     />

//     <meta
//      name="twitter:card"
//      content="summary_large_image"
//     />

//     <script type="application/ld+json">

//      {JSON.stringify({

//       "@context":
//        "https://schema.org",

//       "@type":
//        "WebApplication",

//       name: "Study Planner",

//       url: url,

//       applicationCategory:
//        "EducationalApplication",

//       operatingSystem: "All",

//       description: description

//      })}

//     </script>

//    </Helmet>

//    {/* ================= TITLE ================= */}

//    <h1>
//     Smart Study Planner
//    </h1>

//    <p className="planner-subtitle">
//     Your study plans automatically expire
//     after 7 days
//    </p>

//    {/* ================= FORM ================= */}

//    <form
//     className="planner-form"
//     onSubmit={addTask}
//    >

//     <input
//      type="text"
//      placeholder="Study Title"
//      value={title}
//      onChange={(e) =>
//       setTitle(e.target.value)
//      }
//      required
//     />

//     {/* <select
//      value={subject}
//      onChange={(e) =>
//       setSubject(e.target.value)
//      }
//      required
//     >

//      <option value="">
//       Select Subject
//      </option>

//      <option value="Mathematics">
//       Mathematics
//      </option>

//      <option value="Physics">
//       Physics
//      </option>

//      <option value="Chemistry">
//       Chemistry
//      </option>

//      <option value="Biology">
//       Biology
//      </option>

//      <option value="Programming">
//       Programming
//      </option>

//     </select> */}

//     <input
//  type="text"
//  placeholder="Subject or Course"
//  value={subject}
//  onChange={(e) =>
//   setSubject(e.target.value)
//  }
//  required
// />

//     <input
//      type="date"
//      value={studyDate}
//      onChange={(e) =>
//       setStudyDate(e.target.value)
//      }
//      required
//     />

//     <input
//      type="time"
//      value={studyTime}
//      onChange={(e) =>
//       setStudyTime(e.target.value)
//      }
//      required
//     />

//     <textarea
//      placeholder="Additional Note (optional)"
//      value={note}
//      onChange={(e) =>
//       setNote(e.target.value)
//      }
//     />

//     <button
//      type="submit"
//      disabled={loading}
//     >

//      {loading
//       ? "Saving..."
//       : "Add Study Plan"}

//     </button>

//    </form>

//    {/* ================= TASK LIST ================= */}

//    <div className="tasks-container">

//     {tasks.length === 0 && (

//      <p className="empty-text">
//       No study plans yet
//      </p>

//     )}

//     {tasks.map((task) => (

//      <div
//       key={task._id}
//       className="task-card"
//      >

//       <div className="task-top">

//        <h3>{task.title}</h3>

//        <span className="subject-badge">
//         {task.subject}
//        </span>

//       </div>

//       <p className="task-date">

//        📅 {task.studyDate}

//       </p>

//       <p className="task-time">

//        ⏰ {task.studyTime}

//       </p>

//       {task.note && (

//        <p className="task-note">
//         {task.note}
//        </p>

//       )}

//       <p className="expiry">

//        Expires in{" "}

//        {getDaysLeft(task.createdAt)}

//        {" "}day(s)

//       </p>

//       <button
//        className="delete-btn"
//        onClick={() =>
//         deleteTask(task._id)
//        }
//       >

//        Delete

//       </button>

//      </div>

//     ))}

//    </div>

//    {/* ================= CONTENT ================= */}

//    <section className="planner-content">

//     <h2>
//      What is a Study Planner?
//     </h2>

//     <p>
//      A study planner helps students
//      organize their academic tasks,
//      manage time effectively,
//      and improve productivity.
//     </p>

//     <h2>
//      Why Use This Planner?
//     </h2>

//     <ul>

//      <li>
//       Improve focus and consistency
//      </li>

//      <li>
//       Avoid procrastination
//      </li>

//      <li>
//       Track daily study sessions
//      </li>

//      <li>
//       Build better study habits
//      </li>

//      <li>
//       Plans auto-delete after 7 days
//      </li>

//     </ul>

//     <h2>
//      Student Productivity Tips
//     </h2>

//     <p>
//      Study difficult subjects first,
//      revise consistently,
//      and create achievable daily goals.
//     </p>

//     <p className="planLink">

//      You can also use our{" "}

//      <a href="/cgpa-calculator">
//       CGPA Calculator
//      </a>

//      {" "}and{" "}

//      <a href="/jamb-score-calculator">
//       JAMB Score Calculator
//      </a>

//     </p>

//    </section>

//   </div>

//  );

// };

// export default StudyPlanner;


// /*
// Study Planner
// Allows students plan daily study tasks
// */

// import { useState } from "react";
// import { Helmet } from "react-helmet-async";
// import "./studyPlanner.css";

// const StudyPlanner = () => {

//  const [task,setTask] = useState("");
//  const [tasks,setTasks] = useState([]);

//  const addTask = () => {

//   if(!task) return;

//   setTasks([...tasks,task]);
//   setTask("");

//  };

//  const deleteTask = (index) => {

//   const updated = tasks.filter((_,i)=>i!==index);

//   setTasks(updated);

//  };


//  const url = "https://studenttoolsng.com/study-planner";
// const title = "Study Planner for Students | Plan Your Daily Study Schedule";
// const description = "Free study planner for Nigerian students. Organize your daily study tasks, improve productivity, and achieve academic success.";
// const image = "https://studenttoolsng.com/logo.png";

//  return(

//   <div className="planner">

//     <Helmet>
//   <title>{title}</title>
//   <meta name="description" content={description} />
//   <link rel="canonical" href={url} />

//   <meta property="og:title" content={title} />
//   <meta property="og:description" content={description} />
//   <meta property="og:image" content={image} />
//   <meta property="og:url" content={url} />

//   <meta name="twitter:card" content="summary_large_image" />

//   <script type="application/ld+json">
//     {JSON.stringify({
//       "@context": "https://schema.org",
//       "@type": "WebApplication",
//       name: "Study Planner",
//       url: url,
//       applicationCategory: "EducationalApplication",
//       operatingSystem: "All",
//       description: description
//     })}
//   </script>
// </Helmet>

//    <h1>Study Planner for Students</h1>

//    <div className="planner-inpt">

//     <input
//      placeholder="Add study task"
//      value={task}
//      onChange={(e)=>setTask(e.target.value)}
//       required
//     />

//     <button onClick={addTask}>
//      Add
//     </button>

//    </div>

//    <ul>

//     {tasks.map((t,i)=>(
     
//      <li key={i}>

//       {t}

//       <button onClick={()=>deleteTask(i)}>
//        Delete
//       </button>

//      </li>

//     ))}

//    </ul>

//    <section className="planner-content">

//   <h2>What is a Study Planner?</h2>
//   <p>
//     A study planner helps students organize their daily academic tasks,
//     manage time effectively, and improve productivity.
//   </p>

//   <h2>Why You Need a Study Planner</h2>
//   <ul>
//     <li>Stay organized with your subjects</li>
//     <li>Avoid last-minute cramming</li>
//     <li>Improve academic performance</li>
//     <li>Manage your time better</li>
//   </ul>

//   <h2>How to Use This Study Planner</h2>
//   <p>
//     Add your daily study tasks above and track your progress. You can
//     delete tasks once completed.
//   </p>

//   <h2>Study Tips for Nigerian Students</h2>
//   <p>
//     Create a daily routine, focus on difficult subjects first, and
//     use tools like CGPA calculators to track your progress.
//   </p>   
//    <p className="planLink"> 
//   You can also use our 
//   <a href="/cgpa-calculator">CGPA Calculator</a> 
//   and 
//   <a href="/jamb-score-calculator">JAMB Score Calculator</a>.
// </p> 

// </section>

//   </div>

//  );

// };

// export default StudyPlanner;