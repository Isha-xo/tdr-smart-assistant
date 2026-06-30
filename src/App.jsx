import React from "react";
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import IssueSelection from './pages/IssueSelection'
import Questionnaire from './pages/Questionnaire'
import Recommendation from './pages/Recommendation'
import OAuthSuccess from './pages/OAuthSuccess'
import EmailForm from './pages/EmailForm'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/issues" element={<IssueSelection />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="/email" element={<EmailForm />} />
      </Routes>
    </>
  )
}

export default App