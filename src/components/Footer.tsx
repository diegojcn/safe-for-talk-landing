import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

export function Footer() {
    const { t } = useTranslation();
    return (
        <footer className="w-full bg-gray-100 p-1 flex flex-wrap items-center gap-x-2">
            <Link
                 to="/unsubscribe"
                className="inline-block text-xs underline text-grey-600 px-0 py-2 sora-400 hover:bg-blue-50 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:text-blue-600"
            >
                {t('cta-unsubscribe-button')}
            </Link>
            <span className="text-xs text-gray-400">·</span>
            <Link
                to="/privacy"
                className="inline-block text-xs underline text-grey-600 px-0 py-2 sora-400 hover:bg-blue-50 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:text-blue-600"
            >
                Política de Privacidade
            </Link>
            <span className="text-xs text-gray-400">·</span>
            <Link
                to="/terms"
                className="inline-block text-xs underline text-grey-600 px-0 py-2 sora-400 hover:bg-blue-50 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:text-blue-600"
            >
                Termos de Uso
            </Link>
            <span className="text-xs text-gray-400">·</span>
            <Link
                to="/support"
                className="inline-block text-xs underline text-grey-600 px-0 py-2 sora-400 hover:bg-blue-50 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:text-blue-600"
            >
                Suporte
            </Link>
        </footer>
    )
} 