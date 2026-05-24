import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfUse: React.FC = () => {
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
                    <h1 className="text-2xl font-bold border-b pb-4 mb-2">Termos de Uso – Safe 4 Talk</h1>
                    <p className="text-sm text-gray-500 mb-8">Atualizado em: 24/06/2025</p>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">1. Aceitação dos Termos</h2>
                        <p className="text-gray-700">
                            Ao acessar ou utilizar o aplicativo Safe 4 Talk, você concorda com estes Termos de Uso. Se você
                            não concordar com qualquer parte destes termos, não utilize o aplicativo. O uso continuado da
                            plataforma após alterações nos termos constitui aceitação das mudanças.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">2. Elegibilidade</h2>
                        <p className="text-gray-700">
                            O Safe 4 Talk é destinado a pessoas com 13 anos ou mais. Usuários entre 13 e 18 anos devem ter
                            consentimento dos pais ou responsáveis legais para utilizar a plataforma. Ao criar uma conta,
                            você declara que atende aos requisitos de idade aplicáveis.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">3. Criação de Conta e Responsabilidades</h2>
                        <p className="mb-3 text-gray-700">
                            Para utilizar o Safe 4 Talk, você deverá criar uma conta fornecendo informações verdadeiras e
                            atualizadas. Você é responsável por:
                        </p>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                            <li>Manter a confidencialidade das suas credenciais de acesso</li>
                            <li>Todas as atividades realizadas em sua conta</li>
                            <li>Notificar-nos imediatamente sobre qualquer uso não autorizado da sua conta</li>
                            <li>Manter suas informações de perfil atualizadas e verídicas</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">4. Uso Permitido</h2>
                        <p className="mb-3 text-gray-700">
                            O Safe 4 Talk foi desenvolvido para facilitar a prática de idiomas entre usuários. Você pode
                            utilizar a plataforma para:
                        </p>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                            <li>Praticar idiomas estrangeiros por meio de conversas ao vivo (áudio e vídeo)</li>
                            <li>Interagir de forma respeitosa e colaborativa com outros usuários</li>
                            <li>Participar de salas de conversação temáticas</li>
                            <li>Oferecer e receber feedback sobre pronúncia e fluência</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">5. Condutas Proibidas</h2>
                        <p className="mb-3 text-gray-700">É estritamente proibido:</p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>Assediar, intimidar, ameaçar ou abusar de outros usuários</li>
                            <li>Publicar ou compartilhar discurso de ódio com base em raça, etnia, gênero, orientação sexual, religião ou qualquer outra característica</li>
                            <li>Enviar spam, mensagens em massa não solicitadas ou conteúdo publicitário não autorizado</li>
                            <li>Fazer-se passar por outra pessoa ou entidade</li>
                            <li>Compartilhar conteúdo ilegal, obsceno, difamatório ou que viole direitos de terceiros</li>
                            <li>Utilizar a plataforma para fins comerciais não autorizados</li>
                            <li>Tentar acessar sistemas, contas ou dados de outros usuários sem permissão</li>
                            <li>Usar bots, scripts automatizados ou qualquer meio que sobrecarregue a infraestrutura da plataforma</li>
                            <li>Compartilhar conteúdo sexual explícito ou envolvendo menores</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">6. Salas de Conversação por Áudio e Vídeo</h2>
                        <p className="mb-3 text-gray-700">
                            O Safe 4 Talk oferece salas de conversação em tempo real com áudio e/ou vídeo. Ao participar dessas salas:
                        </p>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                            <li>Você concorda em respeitar todos os outros participantes durante as sessões</li>
                            <li>Você está ciente de que sessões podem estar sujeitas a moderação para garantir a segurança da comunidade</li>
                            <li>Você pode reportar comportamentos inadequados diretamente pelo aplicativo</li>
                            <li>Gravações de sessões por terceiros sem o consentimento dos participantes são proibidas</li>
                            <li>O Safe 4 Talk pode agir com base em relatórios de abuso, incluindo a suspensão ou banimento de usuários</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">7. Propriedade Intelectual</h2>
                        <p className="mb-3 text-gray-700">
                            Todo o conteúdo do Safe 4 Talk — incluindo logotipos, design, textos, funcionalidades e código —
                            é propriedade do Safe 4 Talk ou de seus licenciadores e está protegido por leis de propriedade intelectual.
                        </p>
                        <p className="text-gray-700">
                            Você retém a propriedade do conteúdo que cria, mas concede ao Safe 4 Talk uma licença não exclusiva,
                            gratuita e mundial para usar, reproduzir e exibir esse conteúdo para fins operacionais da plataforma.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">8. Isenção de Garantias</h2>
                        <p className="text-gray-700">
                            O Safe 4 Talk é fornecido "como está" e "conforme disponível", sem garantias expressas ou implícitas.
                            Não garantimos que o serviço será ininterrupto, livre de erros ou completamente seguro. O uso da
                            plataforma é por sua conta e risco.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">9. Limitação de Responsabilidade</h2>
                        <p className="text-gray-700">
                            Na máxima extensão permitida por lei, o Safe 4 Talk não será responsável por danos indiretos,
                            incidentais, especiais ou consequentes decorrentes do uso ou incapacidade de uso da plataforma,
                            incluindo perda de dados, lucros cessantes ou danos resultantes de interações com outros usuários.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">10. Encerramento de Conta</h2>
                        <p className="mb-3 text-gray-700">
                            Você pode encerrar sua conta a qualquer momento através das configurações do aplicativo ou
                            solicitando a exclusão pelo e-mail{' '}
                            <a href="mailto:safefortalk@gmail.com" className="text-blue-600 hover:underline">
                                safefortalk@gmail.com
                            </a>
                            .
                        </p>
                        <p className="text-gray-700">
                            O Safe 4 Talk reserva-se o direito de suspender ou encerrar contas que violem estes Termos de Uso,
                            sem aviso prévio e a seu exclusivo critério.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">11. Alterações nos Termos</h2>
                        <p className="text-gray-700">
                            Podemos atualizar estes Termos de Uso periodicamente. Quando alterações significativas forem
                            realizadas, notificaremos os usuários por meio do aplicativo ou e-mail cadastrado. O uso
                            continuado após a notificação constitui aceitação dos novos termos.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">12. Contato</h2>
                        <p className="text-gray-700">
                            Em caso de dúvidas, sugestões ou denúncias relacionadas a estes Termos de Uso, entre em contato:
                        </p>
                        <p className="mt-2 text-gray-700">Safe 4 Talk</p>
                        <p className="text-gray-700">
                            Email:{' '}
                            <a href="mailto:safefortalk@gmail.com" className="text-blue-600 hover:underline">
                                safefortalk@gmail.com
                            </a>
                        </p>
                    </section>

                    <div className="border-t pt-6 mt-8 text-sm text-gray-500">
                        Consulte também nossa{' '}
                        <Link to="/privacy" className="text-blue-600 hover:underline">
                            Política de Privacidade
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

export default TermsOfUse;
