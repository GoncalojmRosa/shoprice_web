import React from 'react';
import './styles.css';

import shopping from '../../Assets/add_cart.svg';
import logo from '../../Assets/logo.svg';

function Test() {
  return (
    <div>
      <header>
        <div className="navbar">
          <img src={logo} alt="" />
          <div className="right-nav">
            <a href="/">Features</a>
            <a href="/">Team</a>
            <a href="/">Sign In</a>
          </div>
        </div>
      </header>
      <div className="content">
        <div className="section1">
          <img src={shopping} alt="people and folders" />
          <div className="mountain">
            <div className="mountain-words">
              <h1>All your files in one secure location, accessible anywhere.</h1>
              <h2>
                Fylo stores all your most important files in one secure location. Access them
                whenever you need, share and collaborate with friends, family, and co-workers.
              </h2>
              <button className="get-started">Get Started</button>
            </div>
          </div>
        </div>

        <div className="section2">
          <div className="features">
            <div className="tile access">
              <img
                src="https://raw.githubusercontent.com/hammercait/fylo-dark-theme-landing-page/658fd0afb4462e6a7e94996ab981bb7d5b336997/images/icon-access-anywhere.svg"
                alt="access icon"
              />
              <h3>Access your files, anywhere</h3>
              <p>
                The ability to use a smartphone, tablet, or computer to access your account means
                your files follow you everywhere.
              </p>
            </div>
            <div className="tile security">
              <img
                src="https://raw.githubusercontent.com/hammercait/fylo-dark-theme-landing-page/658fd0afb4462e6a7e94996ab981bb7d5b336997/images/icon-security.svg"
                alt="security icon"
              />
              <h3>Security you can trust</h3>
              <p>
                2-factor authentication and user-controlled encryption are just a couple of the
                security features we allow to help secure your files.
              </p>
            </div>
            <div className="tile real-time">
              <img
                src="https://raw.githubusercontent.com/hammercait/fylo-dark-theme-landing-page/658fd0afb4462e6a7e94996ab981bb7d5b336997/images/icon-collaboration.svg"
                alt="clock icon"
              />
              <h3>Real-time collaboration</h3>
              <p>
                Securely share files and folders with friends, family, and colleagues for live
                collaboration. No email attachments required.
              </p>
            </div>
            <div className="tile storage">
              <img
                src="https://raw.githubusercontent.com/hammercait/fylo-dark-theme-landing-page/658fd0afb4462e6a7e94996ab981bb7d5b336997/images/icon-any-file.svg"
                alt="storage icon"
              />
              <h3>Store any type of file</h3>
              <p>
                Whether you're sharing holidays, photos, or work documents, Fylo as you covered,
                allowing for all file types to be securely stored and shared.
              </p>
            </div>
          </div>
        </div>
        <div className="section3">
          <img
            src="https://github.com/hammercait/fylo-dark-theme-landing-page/blob/master/images/illustration-stay-productive.png?raw=true"
            alt="people working"
          />
          <div className="sec3text">
            <h1>Stay productive, wherever you are</h1>
            <p>
              Never let location be an issue when accessing your files. Fylo has you covered for all
              your file storage needs.
              <br />
              <br />
              Securely share files and folders with friends, family, and colleagues for live
              collaboration. No email attachments required.
            </p>
            <a href="/">
              See how Fylo works{' '}
              <img
                src="https://raw.githubusercontent.com/hammercait/fylo-dark-theme-landing-page/658fd0afb4462e6a7e94996ab981bb7d5b336997/images/icon-arrow.svg"
                alt="tiny arrow"
              />
            </a>
          </div>
        </div>
        <div className="section4">
          <div className="quotes">
            <img
              id="quotation"
              src="https://github.com/hammercait/fylo-dark-theme-landing-page/blob/master/images/bg-quotes.png?raw=true"
              alt="quotation mark"
            />
          </div>
          <div className="quote-cards">
            <div className="card">
              <p>
                Fylo has improved our team productivity by an order of magnitude. Since making the
                switch, our team has become a well-oiled collaboration machine.
              </p>
              <img
                className="profile-pic"
                src="https://github.com/hammercait/fylo-dark-theme-landing-page/blob/master/images/profile-1.jpg?raw=true"
                alt="profile pic"
              />
              <h5>Satish Patel</h5>
              <h6>Founder CEO, Huddle</h6>
            </div>
            <div className="card">
              <p>
                Fylo has improved our team productivity by an order of magnitude. Since making the
                switch, our team has become a well-oiled collaboration machine.
              </p>
              <img
                className="profile-pic"
                src="https://github.com/hammercait/fylo-dark-theme-landing-page/blob/master/images/profile-2.jpg?raw=true"
                alt="profile pic"
              />
              <h5>Bruce McKenzie</h5>
              <h6>Founder CEO, Huddle</h6>
            </div>
            <div className="card">
              <p>
                Fylo has improved our team productivity by an order of magnitude. Since making the
                switch, our team has become a well-oiled collaboration machine.
              </p>

              <img
                className="profile-pic"
                src="https://github.com/hammercait/fylo-dark-theme-landing-page/blob/master/images/profile-3.jpg?raw=true"
                alt="profile pic"
              />
              <h5>Iva Boyd</h5>
              <h6>Founder CEO, Huddle</h6>
            </div>
          </div>
        </div>
        <div className="section5">
          <div className="contact-box">
            <h1>Get early access today</h1>
            <p>
              It only takes a minute to sign up and our free starter tier is extremely generous. If
              you have any questions, our support team would be happy to help you.
            </p>
            <form action="#">
              <input type="email" id="email" name="email" placeholder="email@example.com" />
              <input id="submit" type="submit" value="Get Started For Free" />
            </form>
          </div>
        </div>
      </div>
      <footer>
        <div className="left">
          <img
            id="logo"
            src="https://raw.githubusercontent.com/hammercait/fylo-dark-theme-landing-page/658fd0afb4462e6a7e94996ab981bb7d5b336997/images/logo.svg"
            alt="logo"
          />
          <div className="left2">
            <img
              id="pin"
              src="https://raw.githubusercontent.com/hammercait/fylo-dark-theme-landing-page/658fd0afb4462e6a7e94996ab981bb7d5b336997/images/icon-location.svg"
              alt="location pin"
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua
            </p>
          </div>
        </div>
        <div className="contact">
          <div>
            <img
              src="https://raw.githubusercontent.com/hammercait/fylo-dark-theme-landing-page/658fd0afb4462e6a7e94996ab981bb7d5b336997/images/icon-phone.svg"
              alt="phone"
            />
            <p>+1-543-123-4567</p>
          </div>
          <div>
            <img
              src="https://raw.githubusercontent.com/hammercait/fylo-dark-theme-landing-page/658fd0afb4462e6a7e94996ab981bb7d5b336997/images/icon-email.svg"
              alt="email"
            />
            <p>example@fylo.com</p>
          </div>
        </div>
        <ul className="info">
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Jobs</li>
          <li>Terms</li>
          <li>Press</li>
          <li>Privacy</li>
          <li>Blog</li>
        </ul>
        <ul className="social">
          <li>
            <i className="fab fa-facebook-f"></i>
          </li>
          <li>
            <i className="fab fa-twitter"></i>
          </li>
          <li>
            <i className="fab fa-instagram"></i>
          </li>
        </ul>
      </footer>
      <script src="https://kit.fontawesome.com/369c45c001.js" crossOrigin="anonymous" />
    </div>
  );
}

export default Test;
