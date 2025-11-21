import { Link } from 'react-router-dom';
import {FaSun, FaMoon} from 'react-icons/fa'
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const {isDark, toggleTheme} = useTheme()

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(flase)
    }

    return(
        <header className="bg-transparent border-b border-light-border dark:border-dark-border absolute w-full z-50 backdrop-blur-sm bg-white/10 dark:bg-dark-bg2/10">
            <nav className="container mx-auto px-4 ">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center -ml-2" onClick={closeMobileMenu}>
                            <img 
                                src="/logo/arandu-h.png" 
                                alt="logo" 
                                className="h-28 object-cover block dark:hidden"
                            />
                            <img 
                                src="/logo/arandu-h-dark.png" 
                                alt="logo" 
                                className="h-28 w-auto hidden dark:block"
                            />
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-light-text dark:text-dark-text1 hover:text-light-accent dark:hover:text-dark-text2 transition-colors duration-300 relative group font-medium">
                            Home
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-light-accent dark:bg-dark-text2 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link to="/feed" className="text-light-text dark:text-dark-text1 hover:text-light-accent dark:hover:text-dark-text2 transition-colors duration-300 relative group font-medium">
                            Feed
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-light-accent dark:bg-dark-text2 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link to="/quiz" className="text-light-text dark:text-dark-text1 hover:text-light-accent dark:hover:text-dark-text2 transition-colors duration-300 relative group font-medium">
                            Quiz
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-light-accent dark:bg-dark-text2 group-hover:w-full transition-all duration-300"></span>
                        </Link>

                        <button
                            onClick={toggleTheme}
                            className='p-2 rounded-lg hover:bg-light-bg3/10 dark:hover:bg-dark-text2/2 transition-colors'
                        >
                        {isDark ?
                        <FaSun className='text-yellow-500 w-5 h-5'/>:
                        <FaMoon className='text-light-text w-5 h-5'/>    
                    }
                        </button>
                    </div>
                    <div className=' flex items-center space-x-2 md:hidden'>
                        <button
                            onClick={toggleTheme}
                            className='p-2 rounded-lg hover:bg-light-bg3/10 dark:hover:bg-dark-text2/2 transition-colors'
                        >
                        {isDark ?
                        <FaSun className='text-yellow-500 w-5 h-5'/>:
                        <FaMoon className='text-light-text w-5 h-5'/>    
                    }
                        </button>
                    <button 
                        className="text-light-text dark:text-dark-text1 p-2 rounded-lg hover:bg-light-bg3/10 dark:hover:bg-dark-text2/10 transition-colors duration-300"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                    </div>
                </div>

                <div className={`md:hidden mt-4 ${isMobileMenuOpen ? 'block' : 'hidden'} bg-white/90 dark:bg-dark-bg2/90 rounded-lg p-4 backdrop-blur-sm`}>
                    <div className="flex flex-col space-y-4">
                             <Link to="/" className="text-light-text dark:text-dark-text1 hover:text-light-accent dark:hover:text-dark-text2 transition-colors duration-300 relative group font-medium" onClick={closeMobileMenu}>
                            Home
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-light-accent dark:bg-dark-text2 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link to="/feed" className="text-light-text dark:text-dark-text1 hover:text-light-accent dark:hover:text-dark-text2 transition-colors duration-300 relative group font-medium" onClick={closeMobileMenu}>
                            Feed
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-light-accent dark:bg-dark-text2 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link to="/quiz" className="text-light-text dark:text-dark-text1 hover:text-light-accent dark:hover:text-dark-text2 transition-colors duration-300 relative group font-medium" onClick={closeMobileMenu}>
                            Quiz
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-light-accent dark:bg-dark-text2 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header