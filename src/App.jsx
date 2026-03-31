import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAuth } from './context/AuthContext';
import SymprioNavbar from './components/SymprioNavbar';
import SymprioHero from './components/SymprioHero';
import SymprioStats from './components/SymprioStats';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import TransformCTA from './components/TransformCTA';
import SymprioFooter from './components/SymprioFooter';
import DigitalTransformation from './components/DigitalTransformation';
import RPA from './components/RPA';
import ERP from './components/ERP';
import CustomDevelopment from './components/CustomDevelopment';
import DigitalWorkforce from './components/DigitalWorkforce';
import AboutUs from './components/AboutUs';
import AdminAuth from './components/AdminAuth';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ServicesLanding from './components/ServicesLanding';
import AgenticAI from './components/AgenticAI';
import Careers from './components/Careers';
import Contact from './components/Contact';
import PrivacyPolicy from './components/PrivacyPolicy';
import SupportSubscription from './components/SupportSubscription';
import CurvedDivider from './components/CurvedDivider';
import AIApplicationDevelopment from './components/AIApplicationDevelopment';
import ProcessAssessment from './components/ProcessAssessment';
import TrainingLanding from './components/TrainingLanding';
import Blog from './components/Blog';
import RPATraining from './components/RPATraining';
import AIGenAITraining from './components/AIGenAITraining';
import CorporateWorkshops from './components/CorporateWorkshops';
import CaseStudiesLanding from './components/CaseStudiesLanding';

import FeaturesGrid from './components/FeaturesGrid';
import ClientsMarquee from './components/ClientsMarquee';
import AboutSnippet from './components/AboutSnippet';
import TrainingBanner from './components/TrainingBanner';
import AIMode from './components/AIMode';
import UseCases from './components/UseCases';
import HowItWorks from './components/HowItWorks';
import EventPopupBanner from './components/EventPopupBanner';
import AIModePrompt from './components/AIModePrompt';

const HomePage = () => {
  return (
    <div style={{
      background: '#fff',
      color: '#1f2937',
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      minHeight: '100vh',
      position: 'relative'
    }}>
      <SymprioNavbar />
      <SymprioHero />
      <ClientsMarquee />
      {/* Section 2 — What You Actually Do (About + Positioning) */}
      <AboutSnippet />
      {/* Section 3 — Three Pillars + Capabilities */}
      <CurvedDivider topColor="#ffffff" bottomColor="#F1F7F3" height={120} curve="smooth" />
      <FeaturesGrid />
      <CurvedDivider topColor="#F1F7F3" bottomColor="#ffffff" height={120} curve="smooth" />
      {/* Section 4 — Use Cases (CRITICAL - clients buy solutions) */}
      <UseCases />
      {/* Section 5 — Proof Layer (Stats & Metrics) */}
      <SymprioStats />
      {/* Section 6 — How It Works (Discover → Automate → Scale) */}
      <HowItWorks />
      {/* Services Portfolio */}
      <Services limit={3} showVideoInsights={false} />
      <TrainingBanner />
      <Testimonials />
      {/* Final CTA — Start Your Automation Journey */}
      <CurvedDivider topColor="#ffffff" bottomColor="#0A2D6E" height={120} curve="smooth" />
      <TransformCTA />
      <SymprioFooter />
      <EventPopupBanner />
      <AIModePrompt />
    </div>
  );
};

const ServicePage = ({ component: Component }) => {
  return (
    <div style={{
      background: '#fff',
      color: '#1f2937',
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      minHeight: '100vh',
      position: 'relative'
    }}>
      <SymprioNavbar />
      <Component />
      <SymprioFooter />
    </div>
  );
};

function App() {
  const { user } = useAuth();
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  React.useEffect(() => {
    console.log('🚀 Initializing AOS');
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      offset: 50,
      delay: 0,
      mirror: true,
      anchorPlacement: 'top-bottom',
      disable: false
    });
    
    console.log('✅ AOS initialized');
    AOS.refresh();
    console.log('✅ AOS refreshed');
  }, []);

  React.useEffect(() => {
    console.log('🔄 Refreshing AOS on route change');
    setTimeout(() => AOS.refresh(), 100);
  }, [location.pathname]);

  React.useEffect(() => {
    const handleScroll = () => {
      AOS.refresh();
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<ServicePage component={AboutUs} />} />
      <Route path="/services" element={<ServicePage component={ServicesLanding} />} />
      {/* Service Sub-pages */}
      <Route path="/services/rpa" element={<ServicePage component={RPA} />} />
      <Route path="/services/ai-development" element={<ServicePage component={AIApplicationDevelopment} />} />
      <Route path="/services/agentic-ai" element={<ServicePage component={AgenticAI} />} />
      <Route path="/services/process-assessment" element={<ServicePage component={ProcessAssessment} />} />
      <Route path="/services/digital-transformation" element={<ServicePage component={DigitalTransformation} />} />
      <Route path="/services/erp-oracle" element={<ServicePage component={ERP} />} />
      <Route path="/services/custom-software" element={<ServicePage component={CustomDevelopment} />} />
      <Route path="/services/digital-workforce" element={<ServicePage component={DigitalWorkforce} />} />
      
      {/* Training Pages */}
      <Route path="/training" element={<ServicePage component={TrainingLanding} />} />
      <Route path="/training/rpa" element={<ServicePage component={RPATraining} />} />
      <Route path="/training/ai-genai" element={<ServicePage component={AIGenAITraining} />} />
      <Route path="/training/corporate-workshops" element={<ServicePage component={CorporateWorkshops} />} />

      <Route path="/case-studies" element={<ServicePage component={CaseStudiesLanding} />} />
      <Route path="/blog" element={<ServicePage component={Blog} />} />
      <Route path="/careers" element={<ServicePage component={Careers} />} />
      <Route path="/contact" element={<ServicePage component={Contact} />} />
      <Route path="/enquiry" element={<Navigate to="/contact" replace />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/support-subscription" element={<ServicePage component={SupportSubscription} />} />
      <Route path="/ai" element={<AIMode />} />
      <Route 
        path="/admin" 
        element={
          user ? <AdminDashboard /> : <AdminAuth />
        } 
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
