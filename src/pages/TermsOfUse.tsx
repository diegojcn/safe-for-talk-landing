import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const TermsOfUse: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="w-full min-h-screen bg-[#f0f2f5] flex flex-col">
            <div className="bg-white shadow">
                <div className="container mx-auto p-4">
                    <Link
                        to="/"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                        {t('terms-back')}
                    </Link>
                </div>
            </div>

            <div className="container mx-auto p-4 md:p-8 max-w-3xl flex-grow">
                <div className="bg-white rounded-lg shadow p-8">
                    <h1 className="text-2xl font-bold border-b pb-4 mb-2">{t('terms-title')}</h1>
                    <p className="text-sm text-gray-500 mb-8">{t('terms-updated')}</p>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">{t('terms-s1-title')}</h2>
                        <p className="text-gray-700">
                            {t('terms-s1-text')}
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">{t('terms-s2-title')}</h2>
                        <p className="text-gray-700">
                            {t('terms-s2-text')}
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">{t('terms-s3-title')}</h2>
                        <p className="mb-3 text-gray-700">
                            {t('terms-s3-intro')}
                        </p>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                            <li>{t('terms-s3-li1')}</li>
                            <li>{t('terms-s3-li2')}</li>
                            <li>{t('terms-s3-li3')}</li>
                            <li>{t('terms-s3-li4')}</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">{t('terms-s4-title')}</h2>
                        <p className="mb-3 text-gray-700">
                            {t('terms-s4-intro')}
                        </p>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                            <li>{t('terms-s4-li1')}</li>
                            <li>{t('terms-s4-li2')}</li>
                            <li>{t('terms-s4-li3')}</li>
                            <li>{t('terms-s4-li4')}</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">{t('terms-s5-title')}</h2>
                        <p className="mb-3 text-gray-700">{t('terms-s5-intro')}</p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>{t('terms-s5-li1')}</li>
                            <li>{t('terms-s5-li2')}</li>
                            <li>{t('terms-s5-li3')}</li>
                            <li>{t('terms-s5-li4')}</li>
                            <li>{t('terms-s5-li5')}</li>
                            <li>{t('terms-s5-li6')}</li>
                            <li>{t('terms-s5-li7')}</li>
                            <li>{t('terms-s5-li8')}</li>
                            <li>{t('terms-s5-li9')}</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">{t('terms-s6-title')}</h2>
                        <p className="mb-3 text-gray-700">
                            {t('terms-s6-intro')}
                        </p>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                            <li>{t('terms-s6-li1')}</li>
                            <li>{t('terms-s6-li2')}</li>
                            <li>{t('terms-s6-li3')}</li>
                            <li>{t('terms-s6-li4')}</li>
                            <li>{t('terms-s6-li5')}</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">{t('terms-s7-title')}</h2>
                        <p className="mb-3 text-gray-700">
                            {t('terms-s7-p1')}
                        </p>
                        <p className="text-gray-700">
                            {t('terms-s7-p2')}
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">{t('terms-s8-title')}</h2>
                        <p className="text-gray-700">
                            {t('terms-s8-text')}
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">{t('terms-s9-title')}</h2>
                        <p className="text-gray-700">
                            {t('terms-s9-text')}
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">{t('terms-s10-title')}</h2>
                        <p className="mb-3 text-gray-700">
                            {t('terms-s10-p1')}{' '}
                            <a href="mailto:safefortalk@gmail.com" className="text-blue-600 hover:underline">
                                safefortalk@gmail.com
                            </a>
                            .
                        </p>
                        <p className="text-gray-700">
                            {t('terms-s10-p2')}
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">{t('terms-s11-title')}</h2>
                        <p className="text-gray-700">
                            {t('terms-s11-text')}
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">{t('terms-s12-title')}</h2>
                        <p className="text-gray-700">
                            {t('terms-s12-intro')}
                        </p>
                        <p className="mt-2 text-gray-700">{t('terms-s12-name')}</p>
                        <p className="text-gray-700">
                            Email:{' '}
                            <a href="mailto:safefortalk@gmail.com" className="text-blue-600 hover:underline">
                                safefortalk@gmail.com
                            </a>
                        </p>
                    </section>

                    <div className="border-t pt-6 mt-8 text-sm text-gray-500">
                        {t('terms-footer-link')}{' '}
                        <Link to="/privacy" className="text-blue-600 hover:underline">
                            {t('terms-footer-link-text')}
                        </Link>
                        .
                    </div>
                </div>
            </div>

            <footer className="py-8 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Safe4Talk. {t('terms-copyright')}
            </footer>
        </div>
    );
};

export default TermsOfUse;
