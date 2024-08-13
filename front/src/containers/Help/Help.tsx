import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FAQItem } from '@/containers/Help/FAQItem/FAQItem';
import { Button } from '@/components/UI/Button/Button';
import { Title } from '@/components/UI/Title/Title';
import { Modal } from '@/components/UI/Modal/Modal';
import './Help.css';
import { Theme, useMediaQuery } from "@mui/material";

export function Help() {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const faqs = Array.from({ length: 20 }, (_, index) => ({
        question: `${t('question')} ${index + 1}: ${t('how_to_use')}`,
        answer: t('usage_instruction_here'),
    }));

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const isLargeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
    const buttonSize = isLargeScreen ? 'md' : 'lg';
    const buttonFontSize = isLargeScreen ?  '20px': '14px';
    const headerMargin = isLargeScreen ? '50px': '16px 0';
    const videoLinkFontSize = isLargeScreen ? '16px' : '14px';
    const titleSize = isLargeScreen ? '24px' :'32px' ;

    return (
        <div className="help-page">
            <Title style={{ fontSize: titleSize}} text={t('something_wrong')} />
            <div className="help-header" style={{ flexDirection: 'row' }}>
                <Button
                    style={{
                        fontSize: buttonFontSize,
                        marginBottom: isLargeScreen ? '16px' : '0',
                        width: isLargeScreen ? '250px': '300px'
                        
                    }}
                    size={buttonSize}
                    title={t('aba_help')}
                    type='primary'
                />
                <Button
                    style={{ marginLeft: '20px', fontSize: buttonFontSize }}
                    size={buttonSize}
                    title={t('technical_support')}
                    type='default'
                />
            </div>
            <div className="help-video">
                <Title style={{ fontSize: titleSize, marginTop: headerMargin }} text={`${t('app_manual')}:`}></Title>
                <div className="video-placeholder">
                    <div className="play-button">▶</div>
                </div>
                <a href="#" className="video-link" onClick={openModal} style={{ fontSize: videoLinkFontSize }}>
                    {t('read_app_manual')}
                </a>
            </div>
            <div className="faq-section">
                <Title style={{ fontSize: titleSize, marginTop: headerMargin }} text={t('faq')}></Title>
                {faqs.map((faq, index) => (
                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>
            <Modal visible={isModalOpen} title={t('app_manual')} onClose={closeModal} >
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus quia cupiditate molestiae nesciunt ipsa officia accusantium officiis iusto, voluptas non sequi itaque velit qui amet numquam perferendis, repellat ullam quo!
                    Nostrum recusandae distinctio rerum mollitia numquam, provident officiis quisquam alias eius, maiores, minima autem fuga porro non deleniti enim iure voluptates possimus perferendis. Reprehenderit, atque enim itaque vitae suscipit praesentium.
                    Laudantium perspiciatis facere eaque magni cum autem dolore officia aut. Laborum omnis, vel quas fuga hic dolorum repudiandae, iusto dignissimos dolores in ipsum mollitia qui soluta sapiente ipsam. Explicabo, delectus.
                    Sapiente ab consectetur harum id mollitia aut nemo, sit reprehenderit veritatis facilis voluptates dignissimos voluptatem et illum, excepturi doloremque eaque a voluptatibus nulla in consequuntur magnam. Quos iusto illo repellendus!
                    Sapiente aperiam doloremque vitae totam saepe, earum eligendi porro error neque quia voluptatem distinctio, praesentium, illo voluptatum cumque facilis placeat quae. Voluptatum quae dolor fugiat debitis, illum eveniet sunt nobis.
                    Consequuntur, magni aliquam! Provident labore incidunt laboriosam corporis, cum consequatur praesentium nostrum consequuntur voluptatum placeat velit at rem in dignissimos molestiae optio commodi aspernatur fugit culpa saepe dolores distinctio. Magni!
                    Sit nihil consequatur perspiciatis ab cumque eum beatae aliquid laboriosam fuga quas facere harum tempora saepe deleniti doloremque aperiam nam quaerat necessitatibus aut deserunt, rem vero repudiandae? Odio, iusto cupiditate.
                    Officia molestias, qui architecto reprehenderit quisquam, assumenda voluptate dolor odio perspiciatis placeat consectetur aliquam deserunt a blanditiis. Sapiente eius architecto facere. Error nobis nam, itaque illum voluptas possimus ipsum recusandae!
                    Nihil doloribus voluptas esse perferendis modi voluptatem tempora velit eveniet nostrum minus, commodi dolores corporis atque sunt dolore maiores quam debitis ex corrupti? Molestias alias perferendis deleniti quis! Quia, provident?
                    Nisi corrupti neque consectetur repellat porro facilis architecto ipsam, ipsum atque. Omnis ipsa, fuga repellendus mollitia perferendis quia illo. Quos nihil, quidem dolores aspernatur reprehenderit autem corporis perferendis praesentium cupiditate!
                    Eveniet voluptates animi nobis illum, labore ipsum et commodi eaque excepturi ducimus deleniti nesciunt quis fugit ratione eius reiciendis repudiandae eum. Voluptate, est obcaecati eos nobis quam amet quos distinctio!
                    Tenetur ducimus eos inventore doloribus magni facere fuga nihil asperiores, itaque in maxime fugiat praesentium et delectus excepturi incidunt quisquam sapiente cum exercitationem eveniet magnam ipsum veritatis non. Sunt, molestiae.
                    Repellendus labore ducimus architecto quis modi unde laborum! Fuga error alias non perspiciatis, architecto voluptate nisi? Distinctio veritatis ducimus dolorum facere quae minus possimus eligendi commodi odio, expedita, omnis amet.
                    Cupiditate voluptatum distinctio recusandae! Amet corporis maiores quam laboriosam accusantium, quos nemo? Quisquam optio exercitationem praesentium distinctio perferendis laudantium reiciendis neque velit aut quae! Repellat animi eius similique voluptatem aperiam.
                    Nesciunt harum laboriosam nisi id facilis sapiente libero vitae rem magni, neque nostrum soluta cum quidem explicabo commodi optio sint? Commodi facere vitae quisquam totam placeat sunt omnis ut dolore!
                    Veniam odit doloribus recusandae ab laboriosam corrupti ipsum quae fugit nesciunt. Laudantium, voluptates! Voluptatum soluta, pariatur repudiandae neque voluptatibus, eaque veritatis inventore obcaecati placeat sint, earum nam doloribus sunt nulla!
                    Fugiat provident nulla, blanditiis, at et harum tenetur possimus tempore neque similique aspernatur ratione quasi voluptatum voluptate asperiores minus modi tempora quod aperiam? Dignissimos veniam enim reprehenderit doloremque repudiandae voluptas!
                    Eveniet et minus repellat. Odio, perspiciatis unde facilis praesentium repellendus, omnis cumque laboriosam optio vitae quisquam laborum porro ratione libero natus dolorum excepturi exercitationem alias tempora repellat fuga facere possimus.
                    Rem, perspiciatis eveniet! Dolores illum ut nisi. Atque, facere quam? Cum totam nam soluta error ipsa. Iste sed aliquam reprehenderit delectus recusandae dignissimos soluta error? Aspernatur repellendus architecto id natus.
                    Adipisci, quis quia corporis ipsa voluptatibus culpa. Tempora, soluta natus? Maiores culpa magnam aperiam vitae doloribus, molestias quidem incidunt voluptatibus non sapiente explicabo mollitia iste. Rerum eveniet totam maiores assumenda.
                    Nemo ipsam assumenda tenetur iusto velit eaque autem, asperiores qui incidunt debitis consequuntur eos inventore iste, sed facere molestiae quasi eum, voluptatibus deserunt architecto sapiente commodi. Eos incidunt facilis optio?
                    Quidem ducimus quia veritatis dolor hic quasi corporis sequi sed facere praesentium fugit tempora laborum itaque, nisi natus doloribus atque quaerat aut vel! Expedita magnam, veritatis numquam blanditiis nobis quia.
                    Doloremque praesentium, provident iure modi non possimus perferendis soluta, dolore iste accusamus eos, ullam quam esse mollitia? Velit necessitatibus expedita possimus omnis molestias inventore ducimus dolores, aliquid magni voluptas tempore!
                    Modi enim reprehenderit eligendi hic animi! Cupiditate fugiat corrupti veritatis fuga quidem sapiente cumque eveniet voluptate quod ullam assumenda, dignissimos exercitationem quas, eaque amet omnis? Fuga earum soluta totam voluptate.
                    Dolorem debitis aperiam consequuntur dolor sunt laborum iure beatae molestias natus, cumque ad dolore nesciunt sed deserunt alias voluptates soluta? Ut molestiae incidunt nobis repudiandae repellat praesentium, natus veritatis animi!
                    Vel odio non soluta vitae exercitationem officiis cum nostrum iusto molestiae impedit. Quasi ratione delectus voluptatibus? Maxime ullam dolore officiis. Architecto modi laudantium nihil facere consequatur dolor rerum recusandae veniam?
                    Repellendus voluptate quaerat praesentium dicta optio officiis vero beatae dolore in quis rem voluptatem iusto quasi omnis sint illum soluta voluptates iste, hic explicabo facilis sunt aspernatur reprehenderit eveniet. Eos.
                    Laudantium, neque totam veniam nemo ut quod non quam! Veniam rerum pariatur ex vel molestiae, rem tempore, quo iusto eaque odit consequuntur delectus, accusantium sunt ducimus doloribus praesentium totam dignissimos.
                    Atque error, excepturi eaque quisquam qui hic voluptate reiciendis veritatis nesciunt voluptatem velit tenetur eligendi facere cumque nulla vitae minima ab harum unde aut? Maxime vitae saepe maiores assumenda dicta!
                    Consequatur quae, laborum dignissimos excepturi sapiente cum tenetur iusto temporibus officia? Velit, ipsa suscipit nisi voluptates facilis consequatur? Odio fuga minus eaque. Error ex optio id. Autem accusamus sit est.
                    Officiis sequi nesciunt, aperiam repellendus laudantium fugiat sed autem odio rem culpa aliquam unde ex debitis eos magnam provident quasi. Illo quas iusto exercitationem temporibus esse! Dignissimos reprehenderit repellat cumque!
                    Pariatur voluptates ea officiis culpa, id accusamus tenetur delectus officia consequuntur laudantium tempore rem quod excepturi autem rerum molestiae doloribus blanditiis sapiente magni expedita, itaque enim harum quia? Natus, temporibus?
                    Ad expedita cum obcaecati ipsum animi sequi sit magni velit molestiae dolor asperiores quas suscipit, ea, cumque magnam. Sed earum ea soluta itaque fugiat labore iure dolor ut excepturi saepe?
                    Debitis expedita eligendi, ducimus labore sint exercitationem totam impedit fuga id, fugit provident. Et minima ratione ad aut vero architecto est ut id sapiente eligendi, sunt doloremque culpa quasi neque!
                    Sint voluptatum debitis mollitia corrupti, beatae maxime asperiores nostrum error dolor provident temporibus facilis eveniet perspiciatis laborum. Corrupti, a? Perspiciatis numquam quae fugiat blanditiis itaque? Fugit dolore unde obcaecati nulla!
                    Nam, dicta! Quas unde, aliquam laboriosam asperiores cupiditate necessitatibus. In optio voluptatum dolorum recusandae rerum eligendi voluptate repellat molestiae necessitatibus, error doloribus, fugiat reprehenderit, fugit sint suscipit laborum sunt placeat.
                    In amet nesciunt veniam nisi dolorum necessitatibus illum ea, excepturi soluta reiciendis ipsam, mollitia saepe laboriosam, aliquam eligendi sapiente recusandae laborum! Ad, cumque. Iste, quam officiis. Facilis praesentium provident quas.
                    Consequatur, dolorem eaque veritatis blanditiis eos expedita est voluptatum nemo totam quibusdam, optio eum quidem dolor qui iure eveniet dignissimos laboriosam. Iusto quod dolorum ipsum commodi eveniet odit unde omnis.
                    Similique porro totam itaque nam animi at perspiciatis ea deleniti voluptatem sint impedit id maiores, reiciendis laborum temporibus velit iusto debitis. Beatae placeat corrupti aliquid minima consequuntur officiis ratione aspernatur?
                    Fuga nobis, quibusdam inventore similique qui maiores expedita aliquid, aperiam distinctio quas non atque earum repellat magnam laboriosam ab velit soluta quasi modi voluptatum blanditiis et! Corporis numquam maxime cum.
                    Facere, necessitatibus? Commodi aspernatur similique sunt explicabo corrupti minima magni voluptatem impedit numquam expedita in quae, voluptas vitae odit vero id, ullam non dolor esse iusto et debitis possimus ipsa!
                    Obcaecati perferendis ut earum eligendi quo, neque accusamus tempore! Quos, laboriosam explicabo ullam voluptatum dolor consequatur ut esse id est porro maiores amet voluptate repellendus, enim optio. Officiis, corrupti quas?
                    Blanditiis, quidem debitis expedita reiciendis magni aliquid quam a id, ea dolorem, non eius consectetur qui quae voluptate nostrum sint ex corrupti repellat excepturi deserunt! Repellendus consequuntur labore iusto dolor!
                    Dolorem ipsam, id magnam dolor aspernatur, repellendus veniam itaque veritatis quisquam ratione nostrum doloremque consectetur perspiciatis, recusandae in incidunt eum officia. Dicta voluptatem, similique asperiores facilis totam aut magni tempora?
                    Officia enim neque aut ad repellat doloribus, eum dicta necessitatibus accusantium iusto delectus. Voluptatibus cum maiores neque velit totam excepturi, eveniet minima earum aut magni. Tenetur perspiciatis libero porro doloremque.
                    Blanditiis, eos ipsam nulla animi voluptatem provident, quod ea vero maxime quaerat molestias reiciendis impedit velit. Reprehenderit necessitatibus doloremque ea. Laborum, quibusdam ea? Perferendis distinctio, minus maiores voluptates libero neque!
                    Soluta quae, molestias quasi sit necessitatibus delectus laudantium, reiciendis fuga aut ut quia repudiandae commodi eius beatae illum voluptatem? Deleniti in molestias dolore doloribus provident sapiente expedita, blanditiis repellendus perspiciatis.
                    Id quis incidunt sint consequatur recusandae ullam eaque aut porro voluptates vero, necessitatibus laboriosam deleniti dolore quidem placeat doloremque officiis ad. Facere consectetur libero at asperiores nesciunt tempore, quasi aliquam?
                    Quam non error minus alias ab, vitae hic perspiciatis omnis odio fuga tempora iusto unde velit incidunt quo officiis commodi corrupti reprehenderit cupiditate odit veniam deleniti numquam. Fuga, ab recusandae?
                    Incidunt commodi aspernatur cum atque non soluta, corporis enim quos, voluptatum, repellendus autem magni. Quisquam quam veritatis ipsa! A possimus ad unde pariatur inventore! Vel quo labore ea itaque! Totam!
                </p>
            </Modal>
        </div>
    );
}
