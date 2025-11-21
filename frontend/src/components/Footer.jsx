const Footer = () => {
    return (
        <footer className="bg-light-bg2 dark:bg-dark-bg2 border-t border-light-border dark:border-dark-border py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center mb-4 md:mb-0">
                        <img 
                            src="/logo/arandu-h.png" 
                            alt="Logo" 
                            className="h-12 object-cover block dark:hidden"
                        />
                        <img 
                            src="/logo/arandu-h-dark.png" 
                            alt="Logo" 
                            className="h-12 w-auto hidden dark:block"
                        />
                        <span className="ml-3 text-lg font-semibold text-light-text dark:text-dark-text1">
                            Arandu
                        </span>
                    </div>

                    <div className="text-center md:text-right">
                        <p className="text-sm text-light-text/50 dark:text-dark-text1/50">
                            © 2024 Arandu. Desenvolvido por Carlos Sanches & Vitor Ramos.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer