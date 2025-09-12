import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
const UNSUBSCRIBE_URL_API: String = import.meta.env.VITE_SAFE_4_TALK_UNSUBSCRIBE_URL;

const deleteUser = async (email: string) => {
    try {
        console.log(`UNSUBSCRIBE_URL_API: ${UNSUBSCRIBE_URL_API} `);
        const response = await fetch(`${UNSUBSCRIBE_URL_API}${email}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        console.log(`Usuário deletado status: ${response.status} ${response.headers} - ${response.statusText} `);

        if (!response.ok) {
            throw new Error(`Erro ao deletar: ${response.status} - ${response.statusText}`);
        }

        console.log('Usuário deletado com sucesso:', response);
    } catch (error) {
        console.error('Erro ao fazer DELETE:', error);
    }
};

const Unsubscribe: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false)


    const handleSubmit = async () => {

        setLoading(true)
        setMessage('')

        const encodedEmail = encodeURIComponent(email);

        try {
            deleteUser(encodedEmail);
            setMessage(`The ${email} was unsubscribed with success!`)
        } catch (error) {

            console.error('Erro ao cancelar inscrição:', error);
            alert('Ocorreu um erro ao tentar cancelar sua inscrição.');
            setMessage('Erro ao processar sua solicitação.')

        } finally {
            setLoading(false)
        }

        setSubmitted(true);
    };

    return (
        <div className="w-full">
            <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
                <h2 className="text-xl text-blue-600" >Unsubscribe</h2>
                <p className="text-sm text-gray-600 py-4">If you want to unsubscribe from our application, please enter your email address below:</p>
                {submitted ? (
                    <p className="text-xl text-grey-600 py-4">
                        {message && <p style={{ marginTop: 20 }}>{message}</p>}
                    </p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">E-mail address:</label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            style={{ display: 'block', width: '100%', margin: '12px 0', padding: 8 }}
                            placeholder="your@email.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />

                        <Button
                            type="submit"
                            size="lg"
                            onClick={() => document.getElementById("site-header")?.scrollIntoView({ behavior: "smooth" })}
                            variant="outline"
                            className="border-blue-600 text-blue-600 sora-400 hover:bg-blue-50 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:text-blue-600"
                        >
                            {loading ? 'Sending...' : 'Unsubscribe'}
                        </Button>

                    </form>
                )}
            </div>
        </div>
    );
};

export default Unsubscribe;

