/**
 * ABOUT DEVELOPER MODULE
 * Displays developer information in Windows XP style
 */

import { createWindow } from './window.js';

let aboutWindow = null;

/**
 * Open About Developer window
 */
export function openAbout() {
  // If already open, just focus it
  if (aboutWindow && document.getElementById(aboutWindow.id)) {
    const { focusWindow } = require('./window.js');
    focusWindow(aboutWindow.id);
    return;
  }
  
  // Create About Developer content with XP styling
  const content = `
    <div style="padding: 20px; font-family: Tahoma, sans-serif; font-size: 11px; overflow-y: auto; height: 100%;">
      
      <!-- Header Section -->
      <div style="text-align: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid #0054e3;">
        <img src="/assets/images/about.png" alt="Developer" style="width: 64px; height: 64px; margin-bottom: 10px;">
        <h2 style="margin: 0; color: #0054e3; font-size: 18px;">Ntokozo Ntshangase</h2>
        <p style="margin: 5px 0; color: #666; font-size: 12px;">Honours Graduate | Software Developer</p>
        <p style="margin: 5px 0; color: #666; font-size: 11px;">Durban, Kwa-Zulu Natal</p>
      </div>

      <!-- Contact Links -->
      <div style="background: #ece9d8; padding: 12px; border: 1px solid #808080; margin-bottom: 15px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 11px;">
          <div>
            <strong>📧 Email:</strong><br>
            <a href="mailto:ntokntshangase@gmail.com" style="color: #0054e3; text-decoration: none;">ntokntshangase@gmail.com</a>
          </div>
          <div>
            <strong>📱 Phone:</strong><br>
            <span>(+27) 61 466 9056</span>
          </div>
          <div>
            <strong>💼 LinkedIn:</strong><br>
            <a href="https://www.linkedin.com/in/ntokozo-ntshangase-8605672a0/" target="_blank" style="color: #0054e3; text-decoration: none;">View Profile</a>
          </div>
          <div>
            <strong>💻 GitHub:</strong><br>
            <a href="https://github.com/tkntsh" target="_blank" style="color: #0054e3; text-decoration: none;">@tkntsh</a>
          </div>
          <div style="grid-column: 1 / -1;">
            <strong>🌐 Portfolio:</strong><br>
            <a href="https://ntshportfolio.lovable.app/" target="_blank" style="color: #0054e3; text-decoration: none;">ntshportfolio.lovable.app</a>
          </div>
        </div>
      </div>

      <!-- Career Objective -->
      <div style="margin-bottom: 15px;">
        <h3 style="color: #0054e3; font-size: 13px; margin-bottom: 8px; border-bottom: 1px solid #808080; padding-bottom: 4px;">
          🎯 Career Objective
        </h3>
        <p style="line-height: 1.5; text-align: justify;">
          Driven by curiosity and a passion for using technology to inspire innovation and uplift communities, 
          I am a Computer Science and Postgraduate Diploma in e-Skills graduate. I thrive on exploring creative 
          solutions to complex challenges and have strong technical skills and problem-solving abilities. I am 
          eager to embrace new responsibilities that foster growth and enhance my skill set.
        </p>
      </div>

      <!-- Education -->
      <div style="margin-bottom: 15px;">
        <h3 style="color: #0054e3; font-size: 13px; margin-bottom: 8px; border-bottom: 1px solid #808080; padding-bottom: 4px;">
          🎓 Education
        </h3>
        
        <div style="margin-bottom: 12px; padding: 10px; background: #f0f0f0; border-left: 3px solid #0054e3;">
          <strong style="color: #0054e3;">University of the Western Cape</strong><br>
          <em>Postgraduate Diploma in E-Skills (Feb 2024 - Dec 2024)</em>
          <ul style="margin: 8px 0; padding-left: 20px; line-height: 1.6;">
            <li>Project: Developing AR application for Slave Lodge Museum with gamification</li>
            <li>Programming: C#</li>
            <li>Skills: Project Management, Android Development, AR/VR, 3D/2D Modeling</li>
          </ul>
        </div>

        <div style="margin-bottom: 12px; padding: 10px; background: #f0f0f0; border-left: 3px solid #0054e3;">
          <strong style="color: #0054e3;">University of the Western Cape</strong><br>
          <em>Bachelor of Science: Computer Science (Feb 2021 - Dec 2023)</em>
          <ul style="margin: 8px 0; padding-left: 20px; line-height: 1.6;">
            <li>Capstone: Web-based clothing application (HTML, CSS, JavaScript)</li>
            <li>Programming: Java, Python, C, C++, R, SAS</li>
            <li>Skills: Algorithms, Data Structures, AI, Machine Learning, Software Engineering</li>
          </ul>
        </div>

        <div style="margin-bottom: 12px; padding: 10px; background: #f0f0f0; border-left: 3px solid #0054e3;">
          <strong style="color: #0054e3;">Curro Hillcrest High School</strong><br>
          <em>Matric Certificate (2020)</em>
          <ul style="margin: 8px 0; padding-left: 20px; line-height: 1.6;">
            <li>Project: Java-based music application with OOP principles</li>
            <li>Programming: Java</li>
          </ul>
        </div>
      </div>

      <!-- Experience -->
      <div style="margin-bottom: 15px;">
        <h3 style="color: #0054e3; font-size: 13px; margin-bottom: 8px; border-bottom: 1px solid #808080; padding-bottom: 4px;">
          💼 Experience
        </h3>
        
        <div style="margin-bottom: 12px; padding: 10px; background: #f0f0f0; border-left: 3px solid #3dba3d;">
          <strong style="color: #0054e3;">Outlier - AI Model Tester</strong><br>
          <em>Jan 2025 - Current</em>
          <ul style="margin: 8px 0; padding-left: 20px; line-height: 1.6;">
            <li>Testing and validating AI models using Java and Python</li>
            <li>Ensuring model accuracy, performance optimization, and quality assurance</li>
            <li>Skills: AI testing, debugging, problem-solving, team collaboration</li>
          </ul>
        </div>

        <div style="margin-bottom: 12px; padding: 10px; background: #f0f0f0; border-left: 3px solid #3dba3d;">
          <strong style="color: #0054e3;">Hex Softwares - Software Engineer/Developer Intern</strong><br>
          <em>May 2025 - June 2025</em>
          <ul style="margin: 8px 0; padding-left: 20px; line-height: 1.6;">
            <li>Remote internship focused on Java programming</li>
            <li>Contributed to project development and team collaboration</li>
            <li>Skills: Java Programming, Problem Solving, Project Development</li>
          </ul>
        </div>
      </div>

      <!-- Skills -->
      <div style="margin-bottom: 15px;">
        <h3 style="color: #0054e3; font-size: 13px; margin-bottom: 8px; border-bottom: 1px solid #808080; padding-bottom: 4px;">
          🛠️ Skills
        </h3>
        <div style="background: #ece9d8; padding: 12px; border: 1px solid #808080;">
          <div style="margin-bottom: 8px;">
            <strong>Technical:</strong> Unity3D, Photoshop CS6, 3ds Max, NetBeans, IntelliJ
          </div>
          <div>
            <strong>Soft Skills:</strong> Entrepreneurial Mindset, Teamwork, Communication, 
            Project Management, Sustainable Development Integration
          </div>
        </div>
      </div>

      <!-- Interests -->
      <div style="margin-bottom: 15px;">
        <h3 style="color: #0054e3; font-size: 13px; margin-bottom: 8px; border-bottom: 1px solid #808080; padding-bottom: 4px;">
          ⚡ Interests
        </h3>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          <span style="background: #0054e3; color: white; padding: 4px 12px; border-radius: 3px; font-size: 10px;">Physical Fitness</span>
          <span style="background: #0054e3; color: white; padding: 4px 12px; border-radius: 3px; font-size: 10px;">Game Development</span>
          <span style="background: #0054e3; color: white; padding: 4px 12px; border-radius: 3px; font-size: 10px;">Football</span>
          <span style="background: #0054e3; color: white; padding: 4px 12px; border-radius: 3px; font-size: 10px;">Musical Instruments</span>
          <span style="background: #0054e3; color: white; padding: 4px 12px; border-radius: 3px; font-size: 10px;">Gaming</span>
        </div>
      </div>

      <!-- Achievement -->
      <div style="margin-bottom: 15px;">
        <h3 style="color: #0054e3; font-size: 13px; margin-bottom: 8px; border-bottom: 1px solid #808080; padding-bottom: 4px;">
          🏆 Achievement
        </h3>
        <div style="background: #fff3cd; padding: 10px; border: 1px solid #ffc107; border-radius: 3px;">
          <strong>Eternal Joy Church:</strong> Small group leadership course completed
        </div>
      </div>

      <!-- Footer -->
      <div style="text-align: center; margin-top: 20px; padding-top: 15px; border-top: 2px solid #0054e3; color: #666; font-size: 10px;">
        <p>Thank you for visiting! Feel free to reach out for collaborations or opportunities.</p>
        <p style="margin-top: 5px;">© 2025 Ntokozo Ntshangase. All rights reserved.</p>
      </div>

    </div>
  `;
  
  // Create window
  aboutWindow = createWindow({
    title: 'About Developer - Ntokozo Ntshangase',
    icon: '/assets/images/about.png',
    content,
    width: 700,
    height: 600
  });
}
