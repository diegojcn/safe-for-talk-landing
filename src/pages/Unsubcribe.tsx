import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";

const Unsubscribe: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="w-full min-h-screen bg-[#f0f2f5] flex flex-col">
            <div className="bg-white shadow">
                {/* Minimal Header or reuse SiteHeader if appropriate. For a legal page, a simple header is often better. 
                     But to keep consistency with the app flow, let's just use a simple container or the existing layout. 
                     The user asked for "HTML pronto para produção" for the *content*. 
                     The previous page had a layout inside "w-full".
                 */}
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
                    <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('data-deletion-request-p1') }}></p>

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

