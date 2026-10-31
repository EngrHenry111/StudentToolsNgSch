// This file controls page navigation using React Router

import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

import Home from "./pages/home/Home";

// import Search from "./pages/search/Search";

import AdminProtectedRoute from "./components/adminProtectedRoute";

// AI QUIZ SECTION

import RouteFallback from "./components/RouteFallback";
import PublicLayout from "./layouts/PublicLayouts";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./componentsQuiz/ProtectedRoute";

import AdminLayout from "./layouts/AdminLayout";

// MARKETPLACE (publisher workspace + public storefront/listing pages)
import PublisherLayout from "./layouts/PublisherLayout";
import RequirePublisher from "./componentsMarketplace/RequirePublisher";

// import SeoPage from "./pages/seo/SeoPage";
// Every page except Home loads on demand, so a visitor to one calculator
// doesn't download the admin area, the rich-text editor and every other page.
const CGPACalculator = lazy(() => import("./pages/cgpa/CGPACalculator"));
const WAECCalculator = lazy(() => import("./pages/waec/WAECCalculator"));
const JAMBScore = lazy(() => import("./pages/jamb/JAMBScore"));
const Scholarships = lazy(() => import("./pages/scholarships/Scholarships"));
const StudyPlanner = lazy(() => import("./pages/studyPlanner/StudyPlanner"));
const GPAClass = lazy(() => import("./pages/gpaclass/GPAClass"));
const AgeCalculator = lazy(() => import("./pages/age/AgeCalculator"));
const AgeTracker = lazy(() => import("./pages/age/AgeTracker"));
const EngineeringTools = lazy(() => import("./pages/engineering/EngineeringTools"));
const ResistorColorCode = lazy(() => import("./pages/engineering/ResistorColorCode"));
const SmdResistorCode = lazy(() => import("./pages/engineering/SmdResistorCode"));
const CapacitorCode = lazy(() => import("./pages/engineering/CapacitorCode"));
const OhmsLaw = lazy(() => import("./pages/engineering/OhmsLaw"));
const SeriesParallel = lazy(() => import("./pages/engineering/SeriesParallel"));
const VoltageDivider = lazy(() => import("./pages/engineering/VoltageDivider"));
const LedResistor = lazy(() => import("./pages/engineering/LedResistor"));
const Timer555 = lazy(() => import("./pages/engineering/Timer555"));
const SolarCalculator = lazy(() => import("./pages/engineering/SolarCalculator"));
const InverterCalculator = lazy(() => import("./pages/engineering/InverterCalculator"));
const BatteryBackup = lazy(() => import("./pages/engineering/BatteryBackup"));
const AggregateHub = lazy(() => import("./pages/aggregate/AggregateHub"));
const UniversityAggregate = lazy(() => import("./pages/aggregate/UniversityAggregate"));
const CgpaConverter = lazy(() => import("./pages/cgpaConverter/CgpaConverter"));
const CbtHub = lazy(() => import("./pages/cbt/CbtHub"));
const CbtSubject = lazy(() => import("./pages/cbt/CbtSubject"));
const Tutorials = lazy(() => import("./pages/tutorials/Tutorials"));
const TutorialDetails = lazy(() => import("./pages/tutorialDetails/TutorialDetails"));
const Contact = lazy(() => import("./pages/contact/Contact"));
const CreateTutorial = lazy(() => import("./pages/admin/CreateTutorial"));
const AITutor = lazy(() => import("./pages/aiTutor/AITutor"));
const AdminLogin = lazy(() => import("./pages/adminLogin/AdminLoginForm"));
const AdminDashboard = lazy(() => import("./pages/adminDashboard/AdminDashboard"));
const AdminTutorials = lazy(() => import("./pages/adminTutorial/AdminTutorials"));
const AdminCuratedQuestions = lazy(() => import("./pages/adminCuratedQuestions/AdminCuratedQuestions"));
const AdminInstitutions = lazy(() => import("./pages/adminInstitutions/AdminInstitutions"));
const EditTutorial = lazy(() => import("./pages/editTutorial/EditorTutorial"));
const AdminMessages = lazy(() => import("./pages/adminMessages/AdminMessages"));
const AdmissionPredictor = lazy(() => import("./pages/admismissionPreditior/AdmissionPredictor"));
const PrivacyPolicy = lazy(() => import("./pages/privacy/PrivacyPolicy"));
const About = lazy(() => import("./pages/about/About"));
const Terms = lazy(() => import("./pages/terms/Terms"));
const Author = lazy(() => import("./pages/author/Author"));
const MathCalculatorPage = lazy(() => import("./pages/mathCalculator/MathCalculatorPage"));
const QuizPages = lazy(() => import("./pages/quiz/QuizPges"));
const NotFound = lazy(() => import("./pages/notFound/NotFound"));
const Billing = lazy(() => import("./pageQuiz/Billing"));
const Leaderboard = lazy(() => import("./pageQuiz/Leaderboard"));
const Analytics = lazy(() => import("./pageQuiz/Analytics"));
const MixedQuiz = lazy(() => import("./pageQuiz/Quiz/MixedQuiz"));
const PastQuestions = lazy(() => import("./pageQuiz/Quiz/PastQuestions"));
const AIQuiz = lazy(() => import("./pageQuiz/Quiz/AIQuiz"));
const AdaptiveQuiz = lazy(() => import("./pageQuiz/Quiz/AdaptiveQuiz"));
const Register = lazy(() => import("./pageQuiz/Auth/register/Register"));
const Login = lazy(() => import("./pageQuiz/Auth/login/Login"));
const ForgotPassword = lazy(() => import("./pageQuiz/Auth/forgotPassword/ForgotPassword"));
const ResetPassword = lazy(() => import("./pageQuiz/Auth/resetPassword/ResetPassword"));
const CampusOnboarding = lazy(() => import("./pageQuiz/Campus/CampusOnboarding"));
const MaterialUpload = lazy(() => import("./pageQuiz/Materials/MaterialUpload"));
const MaterialQuizTake = lazy(() => import("./pageQuiz/Materials/MaterialQuizTake"));
const CourseTutor = lazy(() => import("./pageQuiz/CourseTutor/CourseTutor"));
const StudyCoach = lazy(() => import("./pageQuiz/StudyCoach/StudyCoach"));
const CareerCoach = lazy(() => import("./pageQuiz/Career/CareerCoach"));
const Referral = lazy(() => import("./pageQuiz/Referral/Referral"));
const Dashboard = lazy(() => import("./pageQuiz/dashboard/Dashboard"));
const PreviewPage = lazy(() => import("./pages/adminPreview/PreviewPage"));
const PublisherOnboarding = lazy(() => import("./pageMarketplace/PublisherOnboarding"));
const PublisherDashboard = lazy(() => import("./pageMarketplace/PublisherDashboard"));
const ListingManager = lazy(() => import("./pageMarketplace/ListingManager"));
const ListingForm = lazy(() => import("./pageMarketplace/ListingForm"));
const PublisherOrders = lazy(() => import("./pageMarketplace/PublisherOrders"));
const MyPurchases = lazy(() => import("./pageMarketplace/MyPurchases"));
const Marketplace = lazy(() => import("./pages/marketplace/Marketplace"));
const PublisherStorefront = lazy(() => import("./pages/publisherStorefront/PublisherStorefront"));
const ListingDetail = lazy(() => import("./pages/listingDetail/ListingDetail"));

function App() {

 return (

  <BrowserRouter>

   {/* Navbar appears on every page */}
   {/* <Navbar /> */}

   <Suspense fallback={<RouteFallback />}>
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
    <Route path="/age-calculator" element={<AgeCalculator />} />
    <Route path="/age-tracker" element={<AgeTracker />} />
    <Route path="/engineering-tools" element={<EngineeringTools />} />
    <Route path="/engineering-tools/resistor-color-code" element={<ResistorColorCode />} />
    <Route path="/engineering-tools/smd-resistor-code" element={<SmdResistorCode />} />
    <Route path="/engineering-tools/capacitor-code" element={<CapacitorCode />} />
    <Route path="/engineering-tools/ohms-law-calculator" element={<OhmsLaw />} />
    <Route path="/engineering-tools/series-parallel-calculator" element={<SeriesParallel />} />
    <Route path="/engineering-tools/voltage-divider-calculator" element={<VoltageDivider />} />
    <Route path="/engineering-tools/led-resistor-calculator" element={<LedResistor />} />
    <Route path="/engineering-tools/555-timer-calculator" element={<Timer555 />} />
    <Route path="/engineering-tools/solar-system-calculator" element={<SolarCalculator />} />
    <Route path="/engineering-tools/inverter-size-calculator" element={<InverterCalculator />} />
    <Route path="/engineering-tools/battery-backup-calculator" element={<BatteryBackup />} />
    <Route path="/aggregate-score-calculator" element={<AggregateHub />} />
    <Route path="/aggregate-score-calculator/:slug" element={<UniversityAggregate />} />
    <Route path="/cgpa-converter" element={<CgpaConverter />} />
    <Route path="/jamb-cbt-practice" element={<CbtHub />} />
    <Route path="/jamb-cbt-practice/:subject" element={<CbtSubject />} />
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

    {/* Marketplace — public, SEO-indexed (Task 4) */}
    <Route path="/marketplace" element={<Marketplace />} />
    <Route path="/publishers/:slug" element={<PublisherStorefront />} />
    <Route path="/publishers/:slug/:listingSlug" element={<ListingDetail />} />

    <Route path="*" element={<NotFound />} />

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

  {/* Same placement/pattern as Campus onboarding above — still under the
      standard authenticated site chrome, not the publisher workspace
      layout, since the user isn't "in" the workspace until this exists. */}
  <Route
    path="/publisher/onboarding"
    element={
      <ProtectedRoute>
        <PublisherOnboarding />
      </ProtectedRoute>
    }
  />

  {/* Buyer side of the marketplace — any logged-in user. */}
  <Route
    path="/my-purchases"
    element={
      <ProtectedRoute>
        <MyPurchases />
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
    path="/pro/course-tutor"
    element={
      <ProtectedRoute>
        <CourseTutor />
      </ProtectedRoute>
    }
  />

  <Route
    path="/pro/study-coach"
    element={
      <ProtectedRoute>
        <StudyCoach />
      </ProtectedRoute>
    }
  />

  <Route
    path="/pro/career-coach"
    element={
      <ProtectedRoute>
        <CareerCoach />
      </ProtectedRoute>
    }
  />

  <Route
    path="/pro/referral"
    element={
      <ProtectedRoute>
        <Referral />
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

{/* Publisher workspace — its own layout/nav, fully separate from both
    the public site and the Pro/quiz experience above. RequirePublisher
    checks both login AND that a Publisher profile actually exists,
    redirecting to /publisher/onboarding otherwise. */}
<Route element={<PublisherLayout />}>
  <Route
    path="/publisher/dashboard"
    element={
      <RequirePublisher>
        <PublisherDashboard />
      </RequirePublisher>
    }
  />
  <Route
    path="/publisher/listings"
    element={
      <RequirePublisher>
        <ListingManager />
      </RequirePublisher>
    }
  />
  <Route
    path="/publisher/listings/new"
    element={
      <RequirePublisher>
        <ListingForm />
      </RequirePublisher>
    }
  />
  <Route
    path="/publisher/listings/:id/edit"
    element={
      <RequirePublisher>
        <ListingForm />
      </RequirePublisher>
    }
  />
  <Route
    path="/publisher/orders"
    element={
      <RequirePublisher>
        <PublisherOrders />
      </RequirePublisher>
    }
  />
</Route>
</Routes>
   </Suspense>

{/* Footer appears on every page */}
   {/* <Footer /> */}

  </BrowserRouter>

 );

}

export default App;