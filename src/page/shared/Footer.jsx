import React from 'react';

const Footer = () => {
    return (
        <div className="bg-neutral p-10">
            <footer className="footer max-w-7xl mx-auto bg-neutral text-neutral-content p-10">
                <aside>
                   
                    <p>
                        <span className="text-green-600  text-3xl font-bold">PieceWork</span>
                        <br />
                        Empowering productivity through micro-tasks and seamless earning opportunities.
                    </p>
                </aside>
                <nav>
                    <h6 className="footer-title text-lg">Social</h6>
                    <div className="grid grid-flow-col gap-4">
                        {/* LinkedIn */}
                        <a
                            href="https://www.linkedin.com/in/md-shofiqul-islam-saad/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current text-blue-700"
                            >
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.5c-.966 0-1.5-.679-1.5-1.5s.534-1.5 1.5-1.5c.966 0 1.5.679 1.5 1.5s-.534 1.5-1.5 1.5zm13.5 11.5h-3v-5.604c0-1.336-.477-2.25-1.673-2.25-.912 0-1.452.637-1.69 1.252-.087.211-.109.504-.109.799v5.803h-3s.04-9.409 0-10.391h3v1.473c.398-.615 1.111-1.492 2.705-1.492 1.976 0 3.467 1.291 3.467 4.066v6.344z" />
                            </svg>
                        </a>
                        {/* GitHub */}
                        <a
                            href="https://github.com/shofiq18"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current text-gray-400"
                            >
                                <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.084-.729.084-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.762-1.605-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.468-2.382 1.236-3.222-.123-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.654 1.653.241 2.873.118 3.176.77.84 1.234 1.912 1.234 3.222 0 4.61-2.807 5.624-5.479 5.922.43.371.814 1.102.814 2.222 0 1.605-.015 2.898-.015 3.292 0 .322.217.694.825.577 4.765-1.585 8.205-6.082 8.205-11.385 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                        {/* Facebook */}
                        <a
                            href="https://www.facebook.com/mdshafiqulislam.shafiq.9659"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current text-blue-600"
                            >
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                            </svg>
                        </a>
                    </div>
                </nav>
            </footer>
            <div className="mt-10 border-t border-gray-600 text-white pt-6 text-center">
                
                <p className="text-xs mt-2">
                    &copy; {new Date().getFullYear()} PieceWork. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Footer;
