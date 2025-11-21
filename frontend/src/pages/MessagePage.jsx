import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const MessagePage = () => {
    const { candidateName } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        setIsSending(true);
        
        setTimeout(() => {
            setIsSending(false);
            setSent(true);
            
            setTimeout(() => {
                navigate('/feed');
            }, 2000);
        }, 1500);
    };

    const handleCancel = () => {
        navigate('/feed');
    };

    if (sent) {
        return (
            <>
                <Header />
                <div className="flex min-h-screen items-center justify-center bg-light-bg dark:bg-dark-bg p-4">
                    <div className="bg-light-bg2 dark:bg-dark-bg2 rounded-2xl p-8 text-center max-w-md w-full shadow-2xl border border-light-border dark:border-dark-border">
                        <div className="text-6xl mb-4">✅</div>
                        <h2 className="text-2xl font-bold text-light-accent dark:text-dark-text2 mb-4">
                            Mensagem Enviada!
                        </h2>
                        <p className="text-light-text dark:text-dark-text1 mb-6">
                            Sua mensagem foi enviada com sucesso. Você será redirecionado para o feed.
                        </p>
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-light-accent dark:border-dark-text2 mx-auto"></div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="flex min-h-screen items-center justify-center bg-light-bg dark:bg-dark-bg p-4 pt-20">
                <div className="bg-light-bg2 dark:bg-dark-bg2 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-light-border dark:border-dark-border">
                    <h1 className="text-2xl font-bold text-light-text dark:text-dark-text1 mb-2">
                        Enviar Mensagem
                    </h1>
                    <p className="text-light-text/70 dark:text-dark-text1/70 mb-6">
                        Candidate: {candidateName}
                    </p>

                    <form onSubmit={handleSendMessage} className="space-y-6">
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-light-text dark:text-dark-text1 mb-2">
                                Sua mensagem
                            </label>
                            <textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Digite sua mensagem aqui..."
                                className="w-full h-40 p-4 border border-light-border dark:border-dark-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-text2 bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text1 placeholder-light-text/50 dark:placeholder-dark-text1/50 transition-all duration-300"
                                required
                            />
                            <div className="flex justify-between text-xs text-light-text/60 dark:text-dark-text1/60 mt-1">
                                <span>Mínimo: 10 caracteres</span>
                                <span>{message.length}/500</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={isSending}
                                className="flex-1 py-3 px-4 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text1 rounded-xl font-medium hover:bg-light-border dark:hover:bg-dark-border transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isSending || message.length < 10 || message.length > 500}
                                className="flex-1 py-3 px-4 bg-light-accent hover:bg-light-bg3 text-white rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSending ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        Enviando...
                                    </>
                                ) : (
                                    <>
                                        <span>✉️</span>
                                        Enviar Mensagem
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 p-4 bg-light-bg dark:bg-dark-bg rounded-lg border border-light-border/50 dark:border-dark-border/50">
                        <h3 className="text-sm font-medium text-light-text dark:text-dark-text1 mb-2">
                            💡 Dicas para uma boa mensagem:
                        </h3>
                        <ul className="text-xs text-light-text/70 dark:text-dark-text1/70 space-y-1">
                            <li>• Apresente-se brevemente</li>
                            <li>• Seja claro sobre seu interesse</li>
                            <li>• Sugira uma forma de contato</li>
                            <li>• Mantenha um tom profissional</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MessagePage;