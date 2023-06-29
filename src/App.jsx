import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./layout/Header";
import Home from "./pages/home/Index";
import Footer from "./layout/Footer";
import Topic from "./pages/topic/Index";
import Quiz from "./pages/quiz/Index";
import Result from "./pages/result/Index";
import SignupPanel from "./login/signup";
import SignInForm from "./login/login";

const App = () => {
  useEffect(() => {
    document.title = 'SAT MMTPrep';
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false); // Set the initial authentication status

  // Function to handle successful login and set the authentication status
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  useEffect(() => {
  }, [isAuthenticated]);
  
  return (
    <div className="grid w-full min-h-screen grid-rows-[auto__1fr__auto]">
      <Header />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Topic />} path="/topic" />
        <Route element={<Quiz />} path="/mathquiz" />
        {/* <Route element={<Result />} path="/result" /> */}
        <Route element={<Result />} path="/results/:id" />
        {/* Only allow access to the SignupPanel if user is not authenticated */}
        {!isAuthenticated && (
          <Route element={<SignupPanel />} path="/signup" />
        )}
        {/* Only allow access to the SignInForm if user is not authenticated */}
        {!isAuthenticated && (
          <Route element={<SignInForm onLogin={handleLogin} />} path="/login" />
        )}
        {/* Redirect users to the home page if they try to access SignupPanel or SignInForm when authenticated */}
        {isAuthenticated && (
          <>
            <Route
              path="/signup"
              element={<Navigate to="/" replace />}
            />
            <Route
              path="/login"
              element={<Navigate to="/" replace />}
            />
          </>
        )}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
