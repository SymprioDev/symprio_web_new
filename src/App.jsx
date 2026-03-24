import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAuth } from './context/AuthContext';
import SymprioNavbar from './components/SymprioNavbar';
import SymprioHero from './components/SymprioHero';
import KeyBenefits from './components/KeyBenefits';
import SymprioStats from './components/SymprioStats';
import EventsAndTrainings from './components/EventsAndTrainings';
import Services from './components/Services';
import FeaturedCaseStudy from './components/FeaturedCaseStudy';
import Testimonials from './components/Testimonials';
import FooterCTA from './components/FooterCTA';
import TeamMembers from './components/TeamMembers';
import TransformCTA from './components/TransformCTA';
import SymprioFooter from './components/SymprioFooter';
import DigitalTransformation from './components/DigitalTransformation';
import Chatbots from './components/Chatbots';
import RPA from './components/RPA';
import ERP from './components/ERP';
import CustomDevelopment from './components/CustomDevelopment';
import DigitalWorkforce from './components/DigitalWorkforce';
import AboutUs from './components/AboutUs';
import AdminAuth from './components/AdminAuth';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Clients from './components/Clients';
import ServicesLanding from './components/ServicesLanding';
import AgenticAI from './components/AgenticAI';
import Careers from './components/Careers';
import Enquiry from './components/Enquiry';
import PrivacyPolicy from './components/PrivacyPolicy';
import SupportSubscription from './components/SupportSubscription';
import CurvedDivider from './components/CurvedDivider';

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
      <div style={{
        width: '100%',
        height: '600px',
        backgroundImage: 'url(/boder.png)',
        backgroundSize: '100% 150px',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
        marginTop: '-600px',
        position: 'relative',
        zIndex: 10,
        transform: 'scaleX(-1)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: '60px'
      }}>
        <button 
          onClick={() => {
            const enquirySection = document.querySelector('[id="enquiry-form"]');
            if (enquirySection) enquirySection.scrollIntoView({ behavior: 'smooth' });
            else window.location.href = '/enquiry';
          }}
          style={{
          background: '#3b82f6',
          color: '#fff',
          border: 'none',
          padding: '12px 30px',
          fontSize: '14px',
          fontWeight: '600',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          transform: 'scaleX(-1)'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#2563eb';
          e.target.style.boxShadow = '0 10px 20px rgba(59, 130, 246, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = '#3b82f6';
          e.target.style.boxShadow = 'none';
        }}
        >
          Talk to an Expert
        </button>
      </div>
      <KeyBenefits />
      <CurvedDivider topColor="#ffffff" bottomColor="#f3f4f6" height={150} curve="smooth" />
      <SymprioStats />
      <CurvedDivider topColor="#f3f4f6" bottomColor="#ffffff" height={150} curve="smooth" />
      <EventsAndTrainings />
      <CurvedDivider topColor="#ffffff" bottomColor="#f9fafb" height={150} curve="smooth" />
      <Services />
      <CurvedDivider topColor="#f9fafb" bottomColor="#ffffff" height={150} curve="smooth" />
      <FeaturedCaseStudy />
      <CurvedDivider topColor="#ffffff" bottomColor="#f3f4f6" height={150} curve="smooth" />
      <Testimonials />
      <CurvedDivider topColor="#f3f4f6" bottomColor="#ffffff" height={150} curve="smooth" />
      <TeamMembers />
      <CurvedDivider topColor="#ffffff" bottomColor="#87CEEB" height={150} curve="smooth" />
      <TransformCTA />
      <SymprioFooter />
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
      <Route path="/agentic-ai" element={<ServicePage component={AgenticAI} />} />
      <Route path="/digital-transformation" element={<ServicePage component={DigitalTransformation} />} />
      <Route path="/chatbots" element={<ServicePage component={Chatbots} />} />
      <Route path="/rpa" element={<ServicePage component={RPA} />} />
      <Route path="/erp" element={<ServicePage component={ERP} />} />
      <Route path="/custom-development" element={<ServicePage component={CustomDevelopment} />} />
      <Route path="/digital-workforce" element={<ServicePage component={DigitalWorkforce} />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/careers" element={<ServicePage component={Careers} />} />
      <Route path="/enquiry" element={<ServicePage component={Enquiry} />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/support-subscription" element={<ServicePage component={SupportSubscription} />} />
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
