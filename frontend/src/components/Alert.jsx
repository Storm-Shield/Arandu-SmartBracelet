import { useEffect } from "react"

const Alert = ({message, bpm}) => {

     useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all duration-300">
            <div className="bg-light-bg2/95 dark:bg-dark-bg2/95 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto transform transition-all duration-300 shadow-2xl border border-light-border/30 dark:border-dark-border/30">
                <div className="p-8 text-center space-y-6">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-light-bg3 to-light-accent dark:from-dark-text2 dark:to-dark-text1 bg-clip-text text-transparent">
                        {message}
                    </h1>
                    
                    <div className="flex items-center justify-center gap-4 bg-light-bg/50 dark:bg-dark-bg/50 rounded-2xl p-6 border border-light-border/20 dark:border-dark-border/20">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                            Batimentos Cardíacos:
                        </span>
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    </div>

                    <div className={`w-32 h-32 mx-auto rounded-full border-8 ${
                        bpm > 90 ? 'border-red-500 bg-red-500/20 animate-pulse' : 
                        bpm > 79 && bpm < 90 && 'border-yellow-500 bg-yellow-500/20' 
                    } transition-all duration-500 flex items-center justify-center`}>
                        <span className={`text-2xl font-bold ${ 
                        bpm > 90 ? 'text-red-600' :
                        bpm > 79 && bpm < 90 && 'text-yellow-400'
                            
                        }`}>
                            {bpm}
                        </span>
                    </div>

                    <div className="w-full bg-light-border/30 dark:bg-dark-border/30 rounded-full h-3">
                        <div 
                            className={`h-3 rounded-full transition-all duration-1000 ${
                                bpm > 90 ? 'bg-red-500' : 
                                bpm < 90 && bpm > 79 && 'bg-yellow-500'
                            }`}
                            style={{ width: `${Math.min(bpm / 2, 100)}%` }}
                        ></div>
                    </div>

                
                </div>
            </div>
        </div>
    )
}

export default Alert