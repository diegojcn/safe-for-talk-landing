import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
        throw error;
    }
};

const Unsubscribe: React.FC = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        setLoading(true);
        setMessage('');

        const encodedEmail = encodeURIComponent(email);

        try {
            await deleteUser(encodedEmail);
            setMessage(t('unsubscribe-success', { email }));
        } catch (error) {
            console.error('Erro ao cancelar inscrição:', error);
            setMessage(t('unsubscribe-error'));
        } finally {
            setLoading(false);
            setSubmitted(true);
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#f0f2f5] flex flex-col">
            <div className="bg-white shadow">
                <div className="container mx-auto p-4">
                    <Button
                        variant="ghost"
                        onClick={() => window.location.href = '/'}
                        className="text-primary"
                    >
                        &larr; Home
                    </Button>
                </div>
            </div>

            <div className="container mx-auto p-4 md:p-8 max-w-4xl flex-grow">
                <div className="bg-white rounded-lg shadow p-8">
                    <h1 className="text-2xl font-bold border-b pb-4 mb-6">{t('data-deletion-title')}</h1>

                    <p className="mb-6">{t('data-deletion-intro')}</p>

                    <h2 className="text-xl font-semibold mt-8 mb-4">{t('data-deletion-request-title')}</h2>

                    {/* New Intro Text pointing to form */}
                    <p className="mb-4">{t('data-deletion-form-intro')}</p>

                    {/* Form Section - Left Aligned & Integrated */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8 max-w-xl">
                        <h3 className="text-lg font-medium text-blue-600 mb-2">{t('unsubscribe-title')}</h3>
                        <p className="text-sm text-gray-600 mb-4">{t('unsubscribe-desc')}</p>

                        {submitted ? (
                            <p className="text-lg py-2 font-medium">
                                {message && <span className={message.toLowerCase().includes('success') || message.toLowerCase().includes('sucesso') ? 'text-green-600' : 'text-red-600'}>{message}</span>}
                            </p>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                                <div className="flex-grow">
                                    <label htmlFor="email" className="sr-only">{t('unsubscribe-email-label')}</label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder={t('unsubscribe-placeholder')}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm whitespace-nowrap"
                                >
                                    {loading ? t('unsubscribe-sending') : t('unsubscribe-button')}
                                </Button>
                            </form>
                        )}
                    </div>

                    <p className="mb-4 font-medium text-gray-700" dangerouslySetInnerHTML={{ __html: t('data-deletion-alt-intro') }}></p>

                    <ol className="list-decimal pl-6 mb-6 space-y-2">
                        <li dangerouslySetInnerHTML={{ __html: t('data-deletion-request-li1') }}></li>
                        <li dangerouslySetInnerHTML={{ __html: t('data-deletion-request-li2') }}></li>
                        <li dangerouslySetInnerHTML={{ __html: t('data-deletion-request-li3') }}></li>
                    </ol>

                    <p className="mb-4">{t('data-deletion-facebook-p2')}</p>
                    <ol className="list-decimal pl-6 mb-6 space-y-2">
                        <li dangerouslySetInnerHTML={{ __html: t('data-deletion-facebook-li1') }}></li>
                        <li dangerouslySetInnerHTML={{ __html: t('data-deletion-facebook-li2') }}></li>
                        <li dangerouslySetInnerHTML={{ __html: t('data-deletion-facebook-li3') }}></li>
                        <li dangerouslySetInnerHTML={{ __html: t('data-deletion-facebook-li4') }}></li>
                    </ol>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r">
                        <p className="text-sm" dangerouslySetInnerHTML={{ __html: t('data-deletion-note') }}></p>
                    </div>

                    <h2 className="text-xl font-semibold mt-8 mb-4">{t('data-deletion-types-title')}</h2>
                    <p className="mb-4">{t('data-deletion-types-p1')}</p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>{t('data-deletion-types-li1')}</li>
                        <li>{t('data-deletion-types-li2')}</li>
                        <li>{t('data-deletion-types-li3')}</li>
                    </ul>

                    <h2 className="text-xl font-semibold mt-8 mb-4">{t('data-deletion-timeframe-title')}</h2>
                    <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('data-deletion-timeframe-p1') }}></p>
                </div>
            </div>

            <footer className="py-8 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Safe4Talk. All rights reserved.
            </footer>
        </div>
    );
};

export default Unsubscribe;

