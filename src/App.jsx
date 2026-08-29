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
// import Search from "./pages/search/Search";
import AITutor from "./pages/aiTutor/AITutor";

import AdminProtectedRoute from "./components/adminProtectedRoute";
import AdminLogin from "./pages/adminLogin/AdminLoginForm"
import AdminDashboard from "./pages/adminDashboard/AdminDashboard";
import AdminTutorials from "./pages/adminTutorial/AdminTutorials";
import AdminCuratedQuestions from "./pages/adminCuratedQuestions/AdminCuratedQuestions";
import AdminInstitutions from "./pages/adminInstitutions/AdminInstitutions";
import EditTutorial from "./pages/editTutorial/EditorTutorial";
import AdminMessages from "./pages/adminMessages/AdminMessages";
import AdmissionPredictor from "./pages/admismissionPreditior/AdmissionPredictor";
import PrivacyPolicy from "./pages/privacy/PrivacyPolicy";
import About from "./pages/about/About";
import Terms from "./pages/terms/Terms";
import Author from "./pages/author/Author";
import MathCalculatorPage from "./pages/mathCalculator/MathCalculatorPage";
import QuizPages from "./pages/quiz/QuizPges";

// AI QUIZ SECTION
import Billing from "./pageQuiz/Billing";
import Leaderboard from "./pageQuiz/Leaderboard";
import Analytics from "./pageQuiz/Analytics";
import MixedQuiz from "./pageQuiz/Quiz/MixedQuiz";
import PastQuestions from "./pageQuiz/Quiz/PastQuestions";
import AIQuiz from "./pageQuiz/Quiz/AIQuiz";
import AdaptiveQuiz from "./pageQuiz/Quiz/AdaptiveQuiz";
import Register from "./pageQuiz/Auth/register/Register";
import Login from "./pageQuiz/Auth/login/Login";
import ForgotPassword from "./pageQuiz/Auth/forgotPassword/ForgotPassword";
import ResetPassword from "./pageQuiz/Auth/resetPassword/ResetPassword";
import CampusOnboarding from "./pageQuiz/Campus/CampusOnboarding";
import MaterialUpload from "./pageQuiz/Materials/MaterialUpload";
import MaterialQuizTake from "./pageQuiz/Materials/MaterialQuizTake";

import PublicLayout from "./layouts/PublicLayouts";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./componentsQuiz/ProtectedRoute";
import Dashboard from "./pageQuiz/dashboard/Dashboard";
import PreviewPage from "./pages/adminPreview/PreviewPage";
import AdminLayout from "./layouts/AdminLayout";

// import SeoPage from "./pages/seo/SeoPage";
function App() {

 return (

  <BrowserRouter>

   {/* Navbar appears on every page */}
   {/* <Navbar /> */}

   <Routes>
  <Route path="/admin/login" element={<AdminLogin />} />

    <Route path="/admin" element={<AdminLayout />}>

  <Route index element={<AdminDashboard />} />

  <Route path="tutorials" element={<AdminTutorials />} />

  <Route path="curated-questions" element={<AdminCuratedQuestions />} />

  <Route path="institutions" element={<AdminInstitutions />} />

  <Route path="edit/:id" element={<EditTutorial />} />

  <Route path="messages" element={<AdminMessages />} />

  <Route path="create-tutorial" element={<CreateTutorial />} />

  <Route path="tutorial-preview/:id" element={<PreviewPage />} />

</Route>

   <Route element={<PublicLayout />}>

    <Route path="/" element={<Home />} />
    <Route path="/cgpa-calculator" element={<CGPACalculator />} />
    <Route path="/waec-grade-calculator" element={<WAECCalculator />} />
    <Route path="/jamb-score-calculator" element={<JAMBScore />} />
    <Route path="/gpa-class-calculator" element={<GPAClass />} />
    <Route path="/tutorials" element={<Tutorials />} />
    <Route path="/tutorial/:slug" element={<TutorialDetails />}/>
    <Route path="/:category" element={<Tutorials />} />
    <Route path="/:category/:topic" element={<Tutorials />} />
    <Route path="/:category/:topic/:subtopic" element={<Tutorials />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/study-planner" element={<StudyPlanner />} />
    <Route path="/scholarships" element={<Scholarships />} />
    <Route path="/admission-predictor" element={<AdmissionPredictor />} />
    <Route path="/ai-tutor" element={<AITutor/>}/>
    <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
    <Route path="/about" element={<About/>} />
    <Route path="/terms" element={<Terms />} />
    <Route path="/author" element={<Author/>}/>
    {/* <Route path="/:slug" element={<SeoPage/>}/> */}
    <Route path="/tutorials/math-calculator" element={<MathCalculatorPage />} />    
    <Route path="/quiz" element={<QuizPages />} />    

   </Route>

   
  <Route element={<AuthLayout />}>

  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/reset-password/:token" element={<ResetPassword />} />

  <Route
    path="/pro/campus/onboarding"
    element={
      <ProtectedRoute>
        <CampusOnboarding />
      </ProtectedRoute>
    }
  />

  <Route
    path="/pro/quiz/material"
    element={
      <ProtectedRoute>
        <MaterialUpload />
      </ProtectedRoute>
    }
  />

  <Route
    path="/pro/quiz/material/:id"
    element={
      <ProtectedRoute>
        <MaterialQuizTake />
      </ProtectedRoute>
    }
  />
  
  <Route
  path="/pro/quiz/adaptive"
  element={
    <ProtectedRoute>
      <AdaptiveQuiz />
    </ProtectedRoute>
  }
/>
<Route path="/pro/quiz/ai"
  element={
  <ProtectedRoute>
    <AIQuiz />
  </ProtectedRoute>}/>

<Route
  path="/pro/quiz/mixed"
  element={
    <ProtectedRoute>
      <MixedQuiz />
    </ProtectedRoute>
  }
/>

<Route
  path="/pro/quiz/past-questions"
  element={
    <ProtectedRoute>
      <PastQuestions />
    </ProtectedRoute>
  }
/>

<Route
  path="/pro/analytics"
  element={
    <ProtectedRoute>
      <Analytics />
    </ProtectedRoute>
  }
/>

<Route
  path="/pro/leaderboard"
  element={
    <ProtectedRoute>
      <Leaderboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/pro/billing"
  element={
    <ProtectedRoute>
      <Billing />
    </ProtectedRoute>
  }
/>

<Route
  path="/pro/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

  {/* <Route path="/pro/quiz/adaptive" element={<AdaptiveQuiz />} />
  <Route path="/pro/quiz/ai"
  element={<ProtectedRoute><AIQuiz /></ProtectedRoute>}/>
  <Route path="/pro/quiz/mixed" element={<MixedQuiz />} />
  <Route path="/pro/analytics" element={<Analytics />} />
  <Route path="/pro/leaderboard" element={<Leaderboard />} />
  <Route path="/pro/billing" element={<Billing />} />
  <Route path="/pro/dashboard" element={<Dashboard />} /> */}

</Route>
</Routes>

{/* Footer appears on every page */}
   {/* <Footer /> */}

  </BrowserRouter>

 );

}

export default App;