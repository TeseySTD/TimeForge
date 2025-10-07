import type React from "react";
import { useEffect, useRef } from "react";
import "./About.scss";

const About: React.FC = () => {
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                    else{
                        entry.target.classList.remove("visible");
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        const elements = document.querySelectorAll(".animate-on-scroll");
        elements.forEach((el) => observerRef.current?.observe(el));

        return () => {
            observerRef.current?.disconnect();
        };
    }, []);

    return (
        <div className="about-container">
            <div className="about-content">
                <header className="about-header animate-on-scroll">
                    <h1 className="about-title">About TimeForge</h1>
                    <p className="about-tagline">
                        Master your time, forge your productivity
                    </p>
                </header>

                <section className="about-section animate-on-scroll">
                    <h2>What is TimeForge?</h2>
                    <p>
                        TimeForge is a modern web application designed to help you take control
                        of your time through customizable timer sets. Whether you're a student,
                        professional, or anyone looking to boost productivity, TimeForge provides
                        the tools you need to work smarter, not harder.
                    </p>
                </section>

                <section className="about-section animate-on-scroll">
                    <h2>Key Features</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                            </div>
                            <h3>Flexible Timer Sets</h3>
                            <p>
                                Create multiple timer sets for different workflows. Perfect for
                                Pomodoro technique with work sessions, short breaks, and long breaks.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </div>
                            <h3>Easy Navigation</h3>
                            <p>
                                Switch between timer sets and individual timers seamlessly using
                                intuitive routing. Jump to any timer instantly.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                                </svg>
                            </div>
                            <h3>Smart Notifications</h3>
                            <p>
                                Stay on track with customizable notifications and sound alerts.
                                Enable or disable them based on your preferences.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                                    <polyline points="17 21 17 13 7 13 7 21" />
                                    <polyline points="7 8 15 8" />
                                </svg>
                            </div>
                            <h3>Saving Timers Locally</h3>
                            <p>
                                Your timer sets and preferences are automatically saved in your
                                browser's local storage. No account needed - your data stays private
                                and accessible across sessions.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="about-section animate-on-scroll">
                    <h2>The Pomodoro Technique</h2>
                    <p>
                        TimeForge is built with the <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique">Pomodoro Technique</a> in mind - a proven time
                        management method that breaks work into focused intervals (traditionally
                        25 minutes) separated by short breaks. After completing four work sessions,
                        you take a longer break to recharge.
                    </p>
                    <p>
                        This technique helps maintain focus, prevent burnout, and boost overall
                        productivity. With TimeForge, implementing Pomodoro is as simple as
                        starting a timer set.
                    </p>
                    <p>
                        Studies have shown that the Pomodoro Technique can significantly improve
                        concentration and reduce mental fatigue. By dividing your work into
                        manageable chunks, you create a sustainable rhythm that keeps you
                        productive throughout the day.
                    </p>
                </section>

                <section className="about-section animate-on-scroll">
                    <h2>How It Works</h2>
                    <div className="steps-list">
                        <div className="step-item">
                            <div className="step-wrapper">
                                <span className="step-number">1</span>
                                <div className="step-content">
                                    <h4>Create Your Timer Set</h4>
                                    <p>
                                        Set up a collection of timers that match your workflow. Define
                                        work sessions, short breaks, and long breaks with custom durations.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="step-item">
                            <div className="step-wrapper">
                                <span className="step-number">2</span>
                                <div className="step-content">
                                    <h4>Configure Preferences</h4>
                                    <p>
                                        Adjust notifications, sounds, and other settings. Make TimeForge
                                        work the way you want it to work.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="step-item">
                            <div className="step-wrapper">
                                <span className="step-number">3</span>
                                <div className="step-content">
                                    <h4>Start Working</h4>
                                    <p>
                                        Begin your timer and focus on the task at hand. Let TimeForge
                                        handle the time tracking while you concentrate on your work.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="step-item">
                            <div className="step-wrapper">
                                <span className="step-number">4</span>
                                <div className="step-content">
                                    <h4>Take Breaks</h4>
                                    <p>
                                        Rest when the timer signals. Maintaining balance is key to
                                        sustained productivity and preventing burnout.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="about-section animate-on-scroll">
                    <h2>Perfect For</h2>
                    <div className="use-cases">
                        <div className="use-case-item">
                            <h4>Students</h4>
                            <p>
                                Manage study sessions effectively and maintain focus during
                                exam preparation.
                            </p>
                        </div>
                        <div className="use-case-item">
                            <h4>Developers</h4>
                            <p>
                                Break down coding tasks into focused sprints with regular breaks
                                to maintain code quality.
                            </p>
                        </div>
                        <div className="use-case-item">
                            <h4>Writers</h4>
                            <p>
                                Overcome writer's block by committing to focused writing sessions
                                with built-in rest periods.
                            </p>
                        </div>
                        <div className="use-case-item">
                            <h4>Remote Workers</h4>
                            <p>
                                Structure your workday and maintain healthy boundaries between
                                work and personal time.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="about-section about-cta animate-on-scroll">
                    <h2>Ready to Transform Your Productivity?</h2>
                    <p>
                        Start using TimeForge today and experience the power of structured
                        time management. No sign-up required, completely free to use.
                    </p>
                    <p>
                        Join thousands of users who have already improved their productivity
                        and work-life balance with TimeForge.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default About;