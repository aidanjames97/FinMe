import React, { useEffect, useState } from 'react'
import { Link } from 'react-scroll'
import { NavLink as RouterLink} from 'react-router-dom'
import Header from './Header';
import fmLogo from "../../images/fm.png"
import ReactLogo from "../../images/react.png"
import FireLogo from "../../images/firebase.png"
import AxiosLogo from "../../images/axios.png"
import Chart from "../../images/chart.png"
import ChartGold from "../../images/chartGold.png"
import ChartPlat from "../../images/chartPlat.png"
import Flaticon from "../../images/flaticon.png"
import Hexagon from "../../images/hexagon.png"
import Tailwind from "../../images/tailwind.png"
import FinnhubLogo from "../../images/finLogo.png"

import { useAuth } from "../../contexts/AuthContext"

import './styles/Home.css';

function Home() {
  const [outText, setOutText] = useState('plat') // for services to display different graphs
  const [currentlyViewing, setCurrentlyViewing] = useState('home'); // which section user is viewing
  // wheither section has been viewed or not
  const [sectionViewed, setSectionViewed] = useState({
    home: true,
    about: false,
    services: false,
  });

  const { setError } = useAuth();

  useEffect(() => {
    const sections = ['home', 'about', 'services'];

    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setCurrentlyViewing(entry.target.id)
          setSectionViewed(prevState => ({
            ...prevState,
            [entry.target.id]: true
          }));
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25 // fades when section 25% visible
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    sections.forEach(section => {
      const target = document.getElementById(section);
      if (target) {
        observer.observe(target);
      }
    });

    return () => observer.disconnect();
  }, []);

  // to store each section which has been viewed
  useEffect(() => {
    try {
      localStorage.setItem('sectionViewed', JSON.stringify(sectionViewed));
    } catch (e) {
      setError("Error stringifing JSON data")
    }
  }, [sectionViewed, setError]);

  // reading which sections have been viewed
  useEffect(() => {
    try {
      const storedSectionViewed = JSON.parse(localStorage.getItem('sectionViewed'));
      if (storedSectionViewed) {
        setSectionViewed(storedSectionViewed);
      }
    } catch (e) {
      setError("Error parsing JSON data")
    }
  }, [setError]);

  // simulated delay so page appears to load and fade in
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    try {
      const timeout = setTimeout(() => {
        setIsLoaded(true);
      }, 1); // 1ms delay (can be increaed to simulate loading)
  
      return () => clearTimeout(timeout);
    } catch (e) {
      setError("Error fading in page")
    }
  }, [setError]);

return (
  <div className={`App-welcome-before ${isLoaded ? 'App-welcome' : ''}`}>
    <Header viewing={currentlyViewing}/>
    <Section id='home' isViewed={sectionViewed.home}>
      <div className='welcome-items-container'>
      <div className='welcome-items'>
        <div className='welcome-text'>
          <h1>
            With up to date information and 
            world-class data visualization tools, 
            take control of your personal 
            finances with FinMe.
          </h1>
        </div>
        <div className='welcome-button-container'>
          <RouterLink
            to='/register'
          >Sign In With Google</RouterLink>
        </div>
      </div>
      </div>
    </Section>
    <Section id='about' isViewed={sectionViewed.about}>
      <div className='welcome-about'>
      <div className='about-right-icon'>
        <img className='logo' src={fmLogo} alt='logo' />
        <img className='hexagon' src={Hexagon} alt='hexagon' />
      </div>
      <div className='about-text'>
        <div className='about-text-header'>
          <h1>Why FinMe?</h1>
        </div>
      <b>
        FinMe allows you to connect your banking information, enabling you to see your broader spending and saving habits. Coupled with saving and spending goals, you will be financially stable in no time!
        Banking is only half of the picture, as FinMe also allows users to seamlessly add their investments for simplified but powerful data visualizations to help better manage your money.
        With our award winning customer support and security, you’ll always have access to to your information quickly and safely anywhere in the world!
      </b>
      <div className='explore-button-container'>
        <Link className="explore-button"
          to="services" // section name
          smooth='true' // smooth scroll
          duration={500} // 500ms
        >
          <h2>Start Today!</h2>
        </Link>
      </div>
      </div>
      </div>
    </Section>
    <Section id='services' isViewed={sectionViewed.services}>
      <div className='welcome-services'>
        <div className='services-left-graphic'>
          {outText === 'gold' ? (
            <img src={ChartGold} alt='gold' />
          ) : outText === 'plat' ? (
            <img src={ChartPlat} alt='plat' />
          ) : (
            <img src={Chart} alt='silver' />
          )}
        </div>
        <div className='services-text'>
          <div className='services-text-header'>
            <h1>What we offer:</h1>
          </div>

          <button 
            className='services-row-silver'
            style={outText === 'silver' ? {transition: 'ease-in .2s', background: 'rgba(255,255,255,0.05)', cursor: 'pointer'} : {}}
            onMouseEnter={() => setOutText("silver")}
          >
            <div className='services-row-header'>
              <h1 style={outText === 'silver' ? {transition: 'ease-in .2s', fontWeight: 800} : {}} className='silver'>Silver: </h1>
              <h2>$0.00 / Month</h2>
            </div>
            <div className='services-row-list'>
              <li>Basic tracking and charts</li>
              <li>Basic charts and data for stocks</li>
            </div>
          </button>

          <button 
            className='services-row-gold'
            style={outText === 'gold' ? {transition: 'ease-in .2s', background: 'rgba(255,255,255,0.05)', cursor: 'pointer'} : {}}
            onMouseEnter={() => setOutText('gold')}
          >
            <div className='services-row-header'>
              <h1 style={outText === 'gold' ? {transition: 'ease-in .2s', fontWeight: 800} : {}} className='gold'>Gold: </h1>
              <h2> $9.99 / Month</h2>
            </div>
            <div className='services-row-list'>
              <li>Advanced tracking with enhanced data and charts</li>
              <li>Advanced charts, data, and news for stocks</li>
            </div>
          </button>

          <button 
            className='services-row-plat'
            style={outText === 'plat' ? {transition: 'ease-in .2s', background: 'rgba(255,255,255,0.05)', cursor: 'pointer'} : {}}
            onMouseEnter={() => setOutText('plat')}
          >
            <div className='services-row-header'>
              <h1 style={outText === 'plat' ? {transition: 'ease-in .2s', fontWeight: 800} : {}} className='plat'>Platinum: </h1>
              <h2> $19.99 / Month</h2>
            </div>
            <div className='services-row-list'>
              <li>World-class tracking with enhanced data, charts, and analysis</li>
              <li>State of the art charts, data, news, and screeners for stocks</li>
            </div>
          </button>
        </div>
      </div>
    </Section>
    <div className='welcome-footer'>
      <div className='footer-text'>
        <div className='footer-left'>
          <h1>Services used to create this site:</h1>
          <div className='footer-left-icons-container'>
            <a href='https://react.dev/' className='footer-left-icon'>
              <img src={ReactLogo} alt='react' />
            </a>
            <a href='https://axios-http.com/' className='footer-left-icon'>
              <img src={AxiosLogo} alt='axios' />
            </a>
            <a href='https://firebase.google.com/' className='footer-left-icon'>
              <img src={FireLogo} alt='firebase' />
            </a>
            <a href='https://www.flaticon.com/' className='footer-left-icon'>
              <img src={Flaticon} alt='flaticon' />
            </a>
            <a href='https://tailwindcss.com/' className='footer-left-icon'>
              <img src={Tailwind} alt='tailwind' />
            </a>
            <a href='https://finnhub.io/' className='footer-left-icon'>
              <img src={FinnhubLogo} alt='finnhub' />
            </a>
          </div>
        </div>

        <Link 
          to='home'
          smooth='true' // smooth scroll
          duration={500} // 500ms
          offset={-75}
        >
          <img className='footer-img' src={fmLogo} alt='logo' />
        </Link>

        <div className='footer-right'>
          <h1>Created, maintained, and developed by:</h1>
          <a href='https://aidanjames.ca/'>@aidanjames</a>
        </div>
      </div>
    </div>
  </div>
  );
}
export default Home;

// defining section
const Section = ({ id, isViewed, children }) => {
  return (
    // this is what changes the class so the css can fade in
    <section id={id} className={`scroll-element ${isViewed ? 'visible' : ''}`}>
      {children}
    </section>
  );
};