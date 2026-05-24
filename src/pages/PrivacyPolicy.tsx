import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="w-full min-h-screen bg-[#f0f2f5] flex flex-col">
            <div className="bg-white shadow">
                <div className="container mx-auto p-4">
                    <Link
                        to="/"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                        {t('privacy-back')}
                    </Link>
                </div>
            </div>

            <div className="container mx-auto p-4 md:p-8 max-w-3xl flex-grow">
                <div className="bg-white rounded-lg shadow p-8">
                    <h1 className="text-2xl font-bold border-b pb-4 mb-2">{t('privacy-title')}</h1>
                    <p className="text-sm text-gray-500 mb-8">{t('privacy-updated')}</p>

                    <p className="mb-6 text-gray-700">
                        {t('privacy-intro')}
                    </p>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mt-8 mb-4">{t('privacy-s1-title')}</h2>

                        <h3 className="text-base font-semibold mb-2 text-gray-800">{t('privacy-s1-1-title')}</h3>
                        <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700">
                            <li>{t('privacy-s1-1-li1')}</li>
                            <li>{t('privacy-s1-1-li2')}</li>
                        </ul>

                        <h3 className="text-base font-semibold mb-2 text-gray-800">{t('privacy-s1-2-title')}</h3>
                        <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700">
                            <li>{t('privacy-s1-2-li1')}</li>
                            <li>{t('privacy-s1-2-li2')}</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">{t('privacy-s2-title')}</h2>
                        <p className="mb-3 text-gray-700">{t('privacy-s2-intro')}</p>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                            <li>{t('privacy-s2-li1')}</li>
                            <li>{t('privacy-s2-li2')}</li>
                            <li>{t('privacy-s2-li3')}</li>
                            <li>{t('privacy-s2-li4')}</li>
                            <li>{t('privacy-s2-li5')}</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">{t('privacy-s3-title')}</h2>
                        <p className="mb-3 text-gray-700">
                            {t('privacy-s3-intro')}
                        </p>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                            <li>{t('privacy-s3-li1')}</li>
                            <li>{t('privacy-s3-li2')}</li>
                            <li>
                                {t('privacy-s3-li3')}
                            </li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">{t('privacy-s4-title')}</h2>
                        <p className="text-gray-700">
                            {t('privacy-s4-text')}
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">{t('privacy-s5-title')}</h2>
                        <p className="mb-3 text-gray-700">{t('privacy-s5-intro')}</p>
                        <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700">
                            <li>{t('privacy-s5-li1')}</li>
                            <li>{t('privacy-s5-li2')}</li>
                            <li>{t('privacy-s5-li3')}</li>
                            <li>{t('privacy-s5-li4')}</li>
                        </ul>
                        <p className="text-gray-700">
                            {t('privacy-s5-contact')}{' '}
                            <a href="mailto:safefortalk@gmail.com" className="text-blue-600 hover:underline">
                                safefortalk@gmail.com
                            </a>
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">{t('privacy-s6-title')}</h2>
                        <p className="text-gray-700">
                            {t('privacy-s6-text')}
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">{t('privacy-s7-title')}</h2>
                        <p className="text-gray-700">
                            {t('privacy-s7-text')}
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">{t('privacy-s8-title')}</h2>
                        <p className="text-gray-700">{t('privacy-s8-name')}</p>
                        <p className="text-gray-700">
                            Email:{' '}
                            <a href="mailto:safefortalk@gmail.com" className="text-blue-600 hover:underline">
                                safefortalk@gmail.com
                            </a>
                        </p>
                    </section>

                    <div className="border-t pt-6 mt-8 text-sm text-gray-500">
                        {t('privacy-footer-link')}{' '}
                        <Link to="/terms" className="text-blue-600 hover:underline">
                            {t('privacy-footer-link-text')}
                        </Link>
                        .
                    </div>
                </div>
            </div>

            <footer className="py-8 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Safe4Talk. {t('privacy-copyright')}
            </footer>
        </div>
    );
};

export default PrivacyPolicy;
