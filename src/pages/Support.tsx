import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SUPPORT_EMAIL = 'safefortalk@gmail.com';

const Support: React.FC = () => {
    const { t } = useTranslation();

    const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5'];

    return (
        <div className="w-full min-h-screen bg-[#f0f2f5] flex flex-col">
            <div className="bg-white shadow">
                <div className="container mx-auto p-4">
                    <Link
                        to="/"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                        {t('support-back')}
                    </Link>
                </div>
            </div>

            <div className="container mx-auto p-4 md:p-8 max-w-3xl flex-grow">
                <div className="bg-white rounded-lg shadow p-8">
                    <h1 className="text-2xl font-bold border-b pb-4 mb-2">{t('support-title')}</h1>
                    <p className="text-gray-700 mb-8">{t('support-intro')}</p>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">{t('support-contact-title')}</h2>
                        <p className="mb-3 text-gray-700">{t('support-contact-text')}</p>
                        <p className="text-gray-700">
                            {t('support-email-label')}{' '}
                            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-blue-600 hover:underline">
                                {SUPPORT_EMAIL}
                            </a>
                        </p>
                        <p className="mt-3 text-sm text-gray-500">{t('support-response-time')}</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">{t('support-faq-title')}</h2>
                        <div className="space-y-6">
                            {faqKeys.map((k) => (
                                <div key={k}>
                                    <h3 className="text-base font-semibold mb-1 text-gray-800">
                                        {t(`support-faq-${k}-q`)}
                                    </h3>
                                    <p className="text-gray-700">{t(`support-faq-${k}-a`)}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">{t('support-legal-title')}</h2>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                            <li>
                                <Link to="/privacy" className="text-blue-600 hover:underline">
                                    {t('support-legal-privacy')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-blue-600 hover:underline">
                                    {t('support-legal-terms')}
                                </Link>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>

            <footer className="py-8 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Safe4Talk. {t('support-copyright')}
            </footer>
        </div>
    );
};

export default Support;
