// This file controls page navigation using React Router

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

import Home from "./pages/home/Home";
import CGPACalculator from "./pages/cgpa/CGPACalculator";
import WAECCalculator from "./pages/waec/WAECCalculator";
import JAMBScore from "./pages/jamb/JAMBScore";
import Scholarships from "./pages/scholarships/Scholarships";
import StudyPlanner from "./pages/studyPlanner/StudyPlanner";
import GPAClass from "./pages/gpaclass/GPAClass";
import Tutorials from "./pages/tutorials/Tutorials";
import TutorialDetails from "./pages/tutorialDetails/TutorialDetails";
import Contact from "./pages/contact/Contact";
import CreateTutorial from "./pages/admin/CreateTutorial";
import Search from "./pages/search/Search";
import AITutor from "./pages/aiTutor/AITutor";

import AdminLogin from "./pages/adminLogin/adminLogin";
import AdminProtectedRoute from "./components/adminProtectedRoute";

import AdminDashboard from "./pages/adminDashboard/AdminDashboard";
import AdminTutorials from "./pages/adminTutorial/AdminTutorials";
import EditTutorial from "./pages/editTutorial/EditorTutorial";
import AdminMessages from "./pages/adminMessages/AdminMessages";
import AdmissionPredictor from "./pages/admismissionPreditior/AdmissionPredictor";
import PrivacyPolicy from "./pages/privacy/PrivacyPolicy";
import About from "./pages/about/About";
import Terms from "./pages/terms/Terms";
import Author from "./pages/author/Author";
import SeoPage from "./pages/seo/SeoPage";
function App() {

 return (

  <BrowserRouter>

   {/* Navbar appears on every page */}
   <Navbar />

   <Routes>

    <Route path="/admin/login" element={<AdminLogin />} />
            <Route
        path="/admin"
        element={
        <AdminProtectedRoute>
        <AdminDashboard />
        </AdminProtectedRoute>
        }
        />

    <Route path="/" element={<Home />} />

    <Route path="/cgpa-calculator" element={<CGPACalculator />} />

    <Route path="/waec-grade-calculator" element={<WAECCalculator />} />

    <Route path="/jamb-score-calculator" element={<JAMBScore />} />

    <Route path="/gpa-class-calculator" element={<GPAClass />} />

    <Route path="/tutorials" element={<Tutorials />} />
    <Route path="/tutorial/:slug" element={<TutorialDetails />}/>

    

    <Route path="/contact" element={<Contact />} />
    <Route path="/study-planner" element={<StudyPlanner />} />
    <Route path="/scholarships" element={<Scholarships />} />
    <Route path="/admission-predictor" element={<AdmissionPredictor />} />
    
    
    <Route path="/admin/create-tutorial" element={<CreateTutorial />} />
    <Route path="/search" element={<Search />} />

    <Route path="/ai-tutor" element={<AITutor/>}/>


    <Route path="/admin" element={<AdminDashboard />} />

    <Route path="/admin/tutorials" element={<AdminTutorials />} />

    <Route path="/admin/edit/:id" element={<EditTutorial />} />

    <Route path="/admin/messages" element={<AdminMessages />} />

    <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
    <Route path="/about" element={<About/>} />
    <Route path="/terms" element={<Terms />} />
    <Route path="/author" element={<Author/>}/>

    <Route path="/:slug" element={<SeoPage/>}/>
    

   </Routes>

   {/* Footer appears on every page */}
   <Footer />

  </BrowserRouter>

 );

}

export default App;