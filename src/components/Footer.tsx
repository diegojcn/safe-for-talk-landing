import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

export function Footer() {
    const { t } = useTranslation();
    return (
        <footer className="w-full bg-gray-100 p-1"> 
            <Link
                 to="/unsubscribe"
                className="inline-block text-xs underline text-grey-600 px-0 py-2 sora-400 hover:bg-blue-50 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:text-blue-600"
            >
                {t('cta-unsubscribe-button')}
            </Link>
        </footer>
    )
} 