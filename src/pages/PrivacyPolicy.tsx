import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="w-full min-h-screen bg-[#f0f2f5] flex flex-col">
            <div className="bg-white shadow">
                <div className="container mx-auto p-4">
                    <Link
                        to="/"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                        &larr; Home
                    </Link>
                </div>
            </div>

            <div className="container mx-auto p-4 md:p-8 max-w-3xl flex-grow">
                <div className="bg-white rounded-lg shadow p-8">
                    <h1 className="text-2xl font-bold border-b pb-4 mb-2">Política de Privacidade – Safe 4 Talk</h1>
                    <p className="text-sm text-gray-500 mb-8">Atualizado em: 24/06/2025</p>

                    <p className="mb-6 text-gray-700">
                        A sua privacidade é importante para nós. Esta Política de Privacidade descreve como o Safe 4 Talk
                        coleta, usa e protege as informações dos usuários que utilizam nosso aplicativo para prática de idiomas.
                    </p>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mt-8 mb-4">1. Informações que Coletamos</h2>

                        <h3 className="text-base font-semibold mb-2 text-gray-800">1.1 Informações fornecidas por você</h3>
                        <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700">
                            <li>Nome de usuário</li>
                            <li>E-mail</li>
                        </ul>

                        <h3 className="text-base font-semibold mb-2 text-gray-800">1.2 Informações coletadas automaticamente</h3>
                        <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700">
                            <li>Dados de uso do aplicativo (frequência, duração das sessões, feedbacks)</li>
                            <li>Informações do dispositivo (modelo, sistema operacional, idioma)</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">2. Uso das Informações</h2>
                        <p className="mb-3 text-gray-700">Utilizamos suas informações para:</p>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                            <li>Oferecer pareamentos personalizados com base no idioma e nível</li>
                            <li>Melhorar a qualidade das interações e chamadas</li>
                            <li>Monitorar e manter a segurança da plataforma</li>
                            <li>Realizar melhorias de performance e experiência do usuário</li>
                            <li>Garantir o cumprimento de nossos Termos de Uso</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">3. Compartilhamento de Informações</h2>
                        <p className="mb-3 text-gray-700">
                            Não vendemos suas informações pessoais. Podemos compartilhá-las apenas quando:
                        </p>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                            <li>Exigido por lei ou autoridades competentes</li>
                            <li>Necessário para prevenir fraudes, abusos ou ameaças</li>
                            <li>
                                Para serviços de terceiros que nos ajudam a operar a plataforma (como serviços de hospedagem
                                ou análise de dados), sempre com cláusulas de confidencialidade
                            </li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">4. Armazenamento e Segurança</h2>
                        <p className="text-gray-700">
                            Armazenamos suas informações em servidores seguros, com protocolos de criptografia e controle de
                            acesso. Aplicamos medidas técnicas e organizacionais para proteger seus dados.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">5. Direitos do Usuário</h2>
                        <p className="mb-3 text-gray-700">Você tem o direito de:</p>
                        <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700">
                            <li>Acessar suas informações</li>
                            <li>Corrigir ou atualizar seus dados</li>
                            <li>Solicitar a exclusão de sua conta e dados</li>
                            <li>Revogar consentimentos a qualquer momento</li>
                        </ul>
                        <p className="text-gray-700">
                            Para exercer seus direitos, entre em contato conosco:{' '}
                            <a href="mailto:safefortalk@gmail.com" className="text-blue-600 hover:underline">
                                safefortalk@gmail.com
                            </a>
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">6. Dados de Crianças e Adolescentes</h2>
                        <p className="text-gray-700">
                            O uso do Safe 4 Talk é destinado a maiores de 13 anos. Caso identifiquemos o uso por menores sem
                            autorização dos responsáveis, os dados serão removidos.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">7. Alterações na Política</h2>
                        <p className="text-gray-700">
                            Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você por meio do app
                            ou email cadastrado.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">8. Contato</h2>
                        <p className="text-gray-700">Safe 4 Talk</p>
                        <p className="text-gray-700">
                            Email:{' '}
                            <a href="mailto:safefortalk@gmail.com" className="text-blue-600 hover:underline">
                                safefortalk@gmail.com
                            </a>
                        </p>
                    </section>

                    <div className="border-t pt-6 mt-8 text-sm text-gray-500">
                        Consulte também nossos{' '}
                        <Link to="/terms" className="text-blue-600 hover:underline">
                            Termos de Uso
                        </Link>
                        .
                    </div>
                </div>
            </div>

            <footer className="py-8 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Safe4Talk. Todos os direitos reservados.
            </footer>
        </div>
    );
};

export default PrivacyPolicy;
