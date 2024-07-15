import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {FAQItem} from '@/containers/Help/FAQItem/FAQItem';
import { Button } from '@/components/UI/Button/Button';
import { Title } from '@/components/UI/Title/Title';
import { Modal } from '@/components/UI/Modal/Modal';
import './Help.css';

export function Help () {
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

  return (
    <div className="help-page">
        <Title style={{fontSize: '32px'}} text={t('something_wrong')} />
        <div className="help-header">
            <Button style={{width: '290px', height: '58px', fontSize: '20px'}} size='lg' title={t('aba_help')} type='primary' />
            <Button style={{marginLeft: '20px'}} size='lg' title={t('technical_support')} type='default'/>
        </div>
        <div className="help-video">
            <Title style={{fontSize: '32px', marginTop: '50px'}} text={`${t('app_manual')}:`}></Title>
            <div className="video-placeholder">
                <div className="play-button">▶</div>
            </div>
            <a href="#" className="video-link" onClick={openModal}>{t('read_app_manual')}</a>
        </div>
        <div className="faq-section">
            <Title style={{fontSize: '32px', marginTop: '50px'}} text={t('faq')}></Title>
            {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
        </div>
        <Modal visible={isModalOpen} title={t('app_manual')} onClose={closeModal}>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde iusto enim corrupti necessitatibus autem excepturi asperiores. Maxime quos, accusantium ea, vel possimus dolorem fugiat autem voluptates quasi architecto saepe nulla!
            Suscipit atque possimus fugit optio, voluptatem harum quaerat ad, amet aliquam modi officia unde? Beatae minus illo aliquid ad quae ipsum tempore sit nesciunt voluptates, quidem, nemo possimus temporibus. Aspernatur!
            Quibusdam cum culpa non, quaerat expedita eaque. Maiores est officiis nam unde, animi rem eligendi, quis explicabo, recusandae beatae voluptatem ducimus aliquam fugiat nobis culpa voluptatum ea ratione voluptates sunt.
            Voluptatibus tenetur aperiam blanditiis natus illo, accusamus repudiandae est eos excepturi consequuntur minima accusantium quasi delectus aliquid repellat, ad a molestiae. Ullam veniam vel tempore doloribus vitae ad expedita aliquam.
            Quisquam, commodi laudantium eaque dolorum officiis molestias blanditiis ducimus? Fugiat eius corrupti aspernatur sit distinctio deleniti doloribus explicabo, possimus qui molestias esse ad atque illum quo facilis maxime? Voluptates, in?
            Quas dicta quasi assumenda architecto repudiandae numquam porro, earum sit dolorem saepe ab adipisci enim quam illum cum minima perferendis quos blanditiis aut iusto maxime voluptas magni consectetur. Distinctio, recusandae.
            Voluptate quae placeat nesciunt sit blanditiis deleniti inventore alias aliquam voluptatum nemo, dolorum enim qui voluptas officia quasi sapiente iusto. Amet voluptas dolorem ut sunt placeat dolorum vitae delectus earum!
            Neque commodi odio accusamus in? Assumenda quia incidunt non sapiente animi. Architecto excepturi quasi sit temporibus id, perspiciatis quos obcaecati, porro eveniet dolore unde officia asperiores deleniti praesentium dolorem. Qui.
            Maiores possimus exercitationem optio consectetur, excepturi tempora, veritatis consequuntur, perferendis animi praesentium ducimus nesciunt! Adipisci nostrum illo ducimus animi. Ut optio ratione error quidem dolorum? Delectus reiciendis provident temporibus dicta.
            Ab ut libero quasi nostrum omnis deleniti eveniet magnam tempore sit voluptas est, saepe aliquam debitis, vitae laudantium error neque sequi quia quidem ullam officiis sint illum! Nisi, provident facere.
            Alias quam rem porro quae earum modi tenetur. Adipisci consequatur quas porro beatae ex labore, temporibus pariatur assumenda aspernatur debitis nisi consequuntur laboriosam blanditiis hic alias voluptatum deleniti. Quas, nam.
            Veniam vitae fugiat velit aperiam, itaque iusto libero, delectus quidem, odio ratione quasi? Eveniet officiis beatae, aut ad placeat reiciendis, ducimus nisi optio, numquam fuga iste dolores molestiae enim! Eaque!
            Iste cum voluptates commodi ipsam eius laboriosam placeat non autem quasi obcaecati odio facilis magnam quo distinctio perferendis, at eaque repellat hic id illum laborum! Adipisci aspernatur ipsum non expedita.
            Eveniet placeat veritatis corporis porro praesentium quos nobis dicta quas voluptate inventore maiores harum numquam magni, recusandae sint officiis deleniti cum a accusantium est at. Distinctio alias nemo incidunt sed.
            Pariatur exercitationem ullam fugiat sed consectetur inventore dignissimos eum ipsum! Accusamus cum nihil soluta illum officia itaque enim id dolorum vel assumenda harum, eveniet a repudiandae, magnam nulla alias. Deleniti.
            Aut perferendis vel aspernatur nam quos. Omnis molestias soluta quo laudantium debitis minima accusantium vel doloribus, delectus recusandae ratione dicta dolorem porro a fugiat nesciunt quod sint. Assumenda, necessitatibus expedita?
            Sunt in nam commodi. Magnam sequi deserunt, laborum ipsum incidunt aut quod veniam. Eius qui, aliquid explicabo in distinctio natus. Itaque deleniti accusamus quidem, fugit libero sit nihil odio rem!
            Commodi sequi, eos blanditiis, quae voluptas cupiditate adipisci placeat aspernatur saepe perferendis corrupti dolores. Nostrum maxime consectetur eum temporibus expedita pariatur sed impedit. Quisquam fugiat doloribus odit, unde ex quae.
            Officia consectetur saepe adipisci, nostrum tenetur obcaecati laborum fugit minus dolores cumque aperiam. Pariatur, expedita corporis, numquam ipsa officia aut commodi quod possimus, officiis ex nostrum voluptate? Dignissimos, earum veritatis.
            Voluptatem modi voluptate eaque consequatur esse asperiores saepe distinctio reiciendis dolores tempora odio, veritatis labore? Explicabo necessitatibus eius, labore iste at in perspiciatis itaque nam ab, sapiente autem obcaecati laborum.
            Ab similique placeat excepturi et ipsum dicta veniam, laudantium dolorem id sequi nulla provident fuga vel vero atque ullam rem adipisci fugit accusamus sunt quod repellat harum est! Voluptates, laborum?
            Dignissimos, animi sed. Cumque ea, nulla porro quaerat fugit in consequatur exercitationem ratione, accusamus perspiciatis iusto cum. Velit, assumenda nobis, dolore eveniet accusamus rem cum sunt soluta voluptas quidem molestiae.
            Cupiditate delectus dolorum est facilis, obcaecati blanditiis nihil minima, corrupti aperiam tempora ipsa! Dicta cum consequatur a quae ullam. Dignissimos placeat ex magnam molestias, possimus nesciunt et repudiandae tenetur quod.
            Iste reprehenderit, magni quam odit quidem aspernatur cupiditate tempora voluptas, rerum quae ea facilis! Eius obcaecati, suscipit tempora labore laboriosam ducimus, sequi facilis ipsam sit nesciunt aspernatur non quos quasi.
            Aspernatur, cumque. Placeat, recusandae fuga doloremque sapiente ipsa ducimus? Saepe quidem cum iusto animi officiis impedit nam laboriosam molestiae sed, corrupti cumque explicabo vitae minima quae. Consequuntur fuga modi delectus?
            Earum illo laudantium, rerum delectus mollitia porro laborum autem sapiente ab obcaecati consequuntur molestiae praesentium soluta excepturi sint et non. Enim distinctio impedit ex aliquid ipsam tempore, est commodi quibusdam.
            Temporibus quod molestiae dicta quam in ullam tempora voluptate. Libero harum quo qui laboriosam possimus natus explicabo itaque modi commodi vel nemo vitae quidem sint totam temporibus ipsam, aliquid accusantium?
            Sint laudantium praesentium aliquid quod facilis doloremque dolore molestiae quisquam, quis omnis. Quam dolor dignissimos minus culpa dolores deserunt, nihil officia quas tempore atque provident illo, possimus asperiores. Maxime, nulla!
            At sed assumenda rem? Porro nesciunt facere nobis soluta dolorem ratione quisquam possimus, eum illum qui et voluptatem iste laudantium cupiditate consequatur est temporibus ea quae voluptates? Officiis, dolor deleniti.
            Ad consequatur rerum possimus nostrum molestiae explicabo optio sunt, reiciendis voluptatum, aliquid eveniet laboriosam sequi accusantium repellat officia aliquam quasi at perspiciatis, mollitia harum dolorem libero. Id quia molestiae ullam.
            Ipsum, porro est dolorum quis dignissimos ratione ullam praesentium laboriosam reiciendis eos autem illum voluptate repudiandae exercitationem unde facilis culpa, esse non molestias beatae! Distinctio assumenda nam quaerat dolorem voluptates.
            Fugit est voluptatum hic deleniti officia. Adipisci minus et, quasi illo quae nihil, enim eum commodi explicabo beatae debitis ipsam voluptates odio optio iste error. At doloribus ea optio cum.
            Eius, voluptate! Atque, debitis repellat rem dolorum illum, eligendi at harum eum alias minima id earum necessitatibus assumenda? Maxime aliquid rem repellat laborum vel ullam quas voluptatum officia modi temporibus?
            Similique obcaecati, ad porro deleniti, blanditiis perferendis necessitatibus autem tempore aspernatur nihil expedita sunt est quis adipisci magnam voluptatem ipsa eum consectetur ab! Eius, reiciendis corrupti sint dolore ut inventore.
            Quas voluptatibus quis eligendi. Exercitationem velit accusantium incidunt error aspernatur excepturi consectetur, necessitatibus similique nobis pariatur harum? Eligendi, esse tempore qui rerum veniam provident quos voluptatibus! Architecto officiis porro ducimus!
            Neque consectetur sed ullam dicta aliquid nostrum ea doloribus eum, molestias reiciendis ducimus, fugit modi in amet minus beatae dolor suscipit veritatis reprehenderit consequuntur pariatur! Neque obcaecati labore provident quos.
            Enim deserunt quibusdam, porro ea necessitatibus ipsam repellendus, vel id accusamus recusandae maiores officiis architecto eaque hic, at voluptate odit! Ipsum, minima deleniti voluptatibus minus quos incidunt accusamus omnis delectus.
            Quis sint asperiores eveniet obcaecati blanditiis rerum, suscipit, commodi accusamus quasi numquam quas dolor corporis animi unde inventore voluptates libero a sequi non eaque! Vitae eos recusandae animi mollitia tempora!
            Eveniet facere et quisquam harum perferendis enim tempora, sed dolore natus nemo id obcaecati iusto nisi error saepe, accusantium unde molestiae aut nam at officia porro velit eius. Nesciunt, ipsum.
            Veniam totam assumenda odio dignissimos quas odit quaerat facilis dicta similique? Odit dolores dicta culpa provident itaque voluptatum officiis laudantium harum maiores eos eum fuga deserunt ea, voluptatem, aspernatur at.
            Vero dolorem architecto velit, at earum assumenda minus unde inventore expedita numquam, ullam voluptas ab quibusdam veniam commodi! Rem facilis molestias eaque earum laudantium quae natus eveniet quod dolorum incidunt!
            Quis veritatis non suscipit, corrupti tempore dignissimos iusto, eius earum dolor nesciunt aliquam officia nisi accusamus error ex eum eveniet porro reiciendis atque sunt incidunt. Corrupti autem nisi dignissimos sequi.
            Non temporibus placeat quis labore optio eveniet ducimus reiciendis! Natus amet inventore dicta et, sequi, maiores magni explicabo ea odio, odit pariatur at quibusdam illum quidem eum earum velit nesciunt!
            Minus, ab veniam. Facilis, itaque, tempora deserunt et magni error vero quam doloribus minus quas totam nam commodi temporibus? Enim modi esse minus illum velit fugiat perspiciatis atque incidunt. Corporis.
            Consectetur, aperiam optio. Tenetur maiores numquam consectetur recusandae cum neque quo quaerat sed minima iste necessitatibus rerum quam aspernatur suscipit, officiis quisquam dicta nulla voluptates? Ab expedita nisi vel voluptas.
            Commodi eos assumenda perspiciatis obcaecati libero vel accusamus dicta, expedita architecto quis autem at fugiat in molestiae eveniet sunt necessitatibus corporis, numquam magni. Harum itaque autem quas delectus ratione laudantium.
            Eos in fugit ex, dolores asperiores magnam esse quod eum, hic eaque quae corporis quos harum sit porro totam nam? Ducimus rerum consequuntur culpa voluptatem voluptatibus itaque provident maiores eligendi.
            Soluta earum quos id, modi reiciendis nemo, iste mollitia tenetur vitae consequatur exercitationem corporis et dicta facilis ad ut praesentium quae! Soluta eos rerum voluptatibus, minima alias dolor fuga quisquam.
            Nisi sint magnam earum voluptatibus necessitatibus fugiat minima dolores neque repellat dignissimos. Ducimus maiores facilis totam laborum nobis a modi officia mollitia laudantium excepturi deserunt velit, fugiat dolore, sint magnam!
            Nam, quasi? Odio non hic doloribus a fuga similique, voluptas, sed eos eveniet explicabo fugit mollitia aut, quas quia quos minima praesentium modi velit consequuntur possimus enim asperiores ex aperiam?
            Provident laudantium possimus eaque corporis et similique delectus cum autem sed? A iste odio fugit tempora temporibus animi est adipisci! Ducimus, quisquam alias quo asperiores quibusdam maiores hic ipsam culpa.
            Ipsum perspiciatis fugit sit, et accusamus architecto nisi eius, consequuntur, quidem illum ipsa ullam id? Quia sed, velit cum accusamus nihil veniam culpa maiores! Quos quia nihil quasi iure officia.
            Repudiandae quas officiis ipsa. Officiis, iure atque ullam, fugiat hic, ad dignissimos incidunt eum veritatis explicabo tempore. Magnam quae amet, eligendi eius id quas, deserunt, quos earum maiores non minima.
            Mollitia tempora beatae rerum velit eius! In quo dignissimos architecto, cum nisi eveniet, iusto ducimus culpa rem ad ipsum, adipisci magnam quos minus? Reprehenderit hic aliquid, officiis eveniet explicabo error.
            Dolorem natus qui, hic animi consequatur adipisci tempore harum laboriosam quod illo ullam est provident sint, molestiae dolorum consectetur consequuntur eum itaque repellendus. Quos vitae aut maiores vero. Explicabo, eius.
            Praesentium cumque quae minus, maiores quidem quos debitis architecto, at, adipisci alias totam delectus illo ad repellat maxime nisi voluptatum. Rerum corporis itaque ipsum possimus sapiente hic deserunt voluptatum distinctio.
            Officiis quos tempore corporis! Aperiam nulla iusto at repellat id est dolores minus, quas eos libero accusamus rem tempore, veniam harum dicta quibusdam nesciunt, ab molestias alias? Voluptatum, sunt fugit?
            Reprehenderit, totam? Eligendi, quam iusto? Molestias placeat facilis velit ducimus aliquam quas perspiciatis sed hic veniam sunt quos, dignissimos illo autem eveniet? Iste cum amet, recusandae sequi commodi enim voluptate.
            Dolorem suscipit facere asperiores perferendis vero adipisci ullam porro sunt doloribus odit recusandae quod quidem nobis at non autem numquam, pariatur aspernatur voluptate nostrum quaerat distinctio. Numquam sed unde commodi.
            Animi, saepe pariatur omnis quod autem dolorum obcaecati atque nulla consequatur reprehenderit voluptas optio corrupti iste eius magni sequi veniam officiis. Dolores, veniam necessitatibus fugiat ullam quae aut esse quidem.
            Exercitationem quia molestias quibusdam itaque in molestiae nam expedita porro excepturi est? Dignissimos ipsa dolor fuga, aspernatur veniam quas cumque odio voluptatem minima nobis blanditiis, modi ipsam atque facere temporibus?
            Ex, obcaecati doloremque, voluptatem quas quia ea facilis voluptate at iste provident, totam maxime harum maiores eveniet accusamus reiciendis eius! Dolorem ipsam vero harum. Reiciendis similique esse perferendis error molestiae.
            Veritatis nisi, quod, animi eaque hic omnis, libero praesentium alias corrupti nulla similique. Nostrum alias velit amet eaque! Ut molestias facilis vero obcaecati ad beatae maxime assumenda vitae ea possimus.
            Sapiente delectus tempora culpa unde facilis, similique ratione voluptatibus recusandae aut minima illo eum distinctio dolorem, atque ex. Nostrum numquam blanditiis obcaecati quo deserunt aliquid sapiente, aut ab quidem officiis!
            Debitis cupiditate dolorem nulla, ex tenetur in voluptatum quasi deserunt culpa dolores voluptate! Magni repudiandae quam vero facilis accusantium repellendus, quasi numquam libero iusto reprehenderit necessitatibus esse veniam nemo illo.
            Officia, adipisci nobis, assumenda eius sint hic pariatur similique modi, enim ut atque ratione obcaecati quis possimus eos accusantium quo facere minus? Corporis dolorum, ab mollitia tempora officiis voluptate quas.
            Aliquid accusamus at laborum odio, vel dignissimos facere doloremque laboriosam dicta, doloribus esse commodi, nulla debitis rem aliquam minus explicabo? Recusandae et explicabo est doloremque magnam voluptatem ea beatae veritatis.
            Aliquam rerum velit veniam iusto, perspiciatis officia aut. Voluptatibus architecto unde ab consequatur rem praesentium aspernatur vero vitae quas, eum repudiandae. Magnam numquam quasi quos nihil in fugiat nisi molestias.
            Est rerum architecto minima natus perspiciatis vel velit laboriosam eveniet blanditiis sed nam fugit, quod nisi laudantium cum, soluta distinctio aut labore veritatis dolorem libero praesentium fuga optio! Nisi, veniam?
            Ratione delectus sit id debitis officiis mollitia sint porro voluptate, assumenda eligendi cupiditate in libero nesciunt distinctio quia nam accusamus hic voluptatem deleniti laboriosam? Cupiditate illum eos commodi. Officiis, labore!
            Vero totam fugit omnis repellendus, autem ducimus sapiente est odio possimus id facere qui commodi necessitatibus exercitationem amet adipisci, accusamus culpa excepturi. Ducimus, aut quisquam sit hic similique veniam culpa?
            Eveniet at aspernatur saepe dolores expedita ipsum. Tenetur quisquam voluptatum at. Suscipit consectetur, culpa libero natus ullam, ex esse nam sapiente reiciendis quas unde alias quam quaerat numquam dicta? Odit.
            Reprehenderit officiis nihil animi facilis quisquam dolore fuga voluptatem, optio saepe ut, fugit numquam quo, incidunt obcaecati qui ratione rem nesciunt est? Natus cum voluptates eveniet similique libero veniam itaque!
            Dolorum molestiae illum, officia quisquam autem deserunt sequi eveniet omnis unde sed recusandae iste hic officiis ex eligendi. Provident blanditiis molestiae, optio quam asperiores eveniet tempora esse. A, autem hic?
            Aliquid voluptatibus debitis aspernatur soluta fuga omnis rerum dolore facere nihil voluptatem optio quaerat nobis doloremque aliquam voluptas hic unde sit illo quae harum, architecto delectus excepturi minus id. Repudiandae.
            Quis dolor placeat, accusantium ut omnis deleniti! Minima, enim non! Aspernatur hic aliquam sint ducimus? Sapiente quidem facilis cum, fuga beatae ab libero, nemo ut illum voluptatibus soluta magnam minima.
            Deleniti necessitatibus eaque est, impedit tempore molestiae laudantium aliquam magni, quam totam aut sequi corporis quod, officiis quibusdam eos omnis modi adipisci porro ducimus corrupti mollitia delectus? Ad, quidem eligendi?
            Beatae doloribus animi tenetur. Non harum ipsa, sapiente odio aliquam obcaecati fugiat quasi accusantium a, odit optio omnis repellendus et voluptas esse rerum illo facilis, dignissimos unde maxime ea corporis?
            Minima quidem tempore ut nobis at sequi velit, delectus nemo nam nulla explicabo ab quos culpa inventore quod deserunt molestiae soluta animi porro doloremque? Labore aliquid rerum earum nihil illo.
            Odit quis est velit, reprehenderit tenetur nihil eveniet delectus voluptate atque corrupti et voluptas consequatur! Nostrum molestiae repellat fugiat quos, id cum illum quo dicta at delectus deserunt ullam quod?
            Explicabo, eaque voluptates. Officiis repellendus odit natus eaque consectetur quod voluptate vitae aliquam delectus? Suscipit nihil accusamus impedit quis quos, animi maiores pariatur libero rem aliquam similique quasi voluptatum sit.
            Minus tempore cumque facilis consequatur? Mollitia consequatur officiis autem cupiditate, maxime neque voluptatibus enim nam aliquam itaque? Officiis, repellendus. Saepe sint libero error autem minima consectetur vitae explicabo veniam architecto.
            Dignissimos facere, ipsum qui voluptas aut, laudantium impedit quas rerum atque nam eaque nemo? Quas, fugit dicta pariatur dolores debitis, doloribus laborum numquam praesentium hic possimus mollitia, consequatur inventore quaerat?
            Delectus atque adipisci quia quisquam accusantium. Delectus beatae fugiat harum nihil consequuntur asperiores error magni dolor. Fugiat esse sint dolorum culpa tenetur reprehenderit, repudiandae error illo consequatur voluptate cum cupiditate?
            Enim fuga commodi corrupti sequi aut, incidunt consequuntur quisquam necessitatibus, maiores, eaque laborum facere obcaecati sunt amet? Harum aliquid eaque incidunt unde voluptate consequuntur minima, amet fugiat quasi natus ut.
            Molestias ipsum voluptatum eum dolores vitae eligendi, expedita, harum deleniti atque explicabo cum quidem. Fugit pariatur voluptatibus commodi excepturi labore ad a vel nemo nesciunt non. Officia sequi deleniti ratione.
            Rem vero, nam quaerat incidunt, fugit eum minus delectus itaque esse, veritatis earum ipsum deserunt aperiam harum eos. Id sunt nulla assumenda minima corrupti suscipit cupiditate beatae optio, obcaecati quam?
            Veniam, cumque odit repellat expedita eius atque dignissimos animi ea sed veritatis, consequatur quod. Incidunt quibusdam magni rerum, velit voluptates sequi enim sapiente beatae delectus fugit debitis unde? Atque, sunt!
            Ipsam harum voluptas distinctio, laborum tenetur quasi. Quidem aut, qui mollitia illo ab perspiciatis deleniti sapiente suscipit, eligendi recusandae dignissimos perferendis consectetur repellat. Dolor voluptatibus cumque unde, dolorum esse cum.
            Non distinctio ducimus laudantium qui dolorem vel explicabo nemo? Eveniet voluptatem pariatur dicta harum assumenda repellat architecto eaque soluta cupiditate qui rem sunt sint accusamus at, maxime velit, neque accusantium.
            Officia sunt ex possimus temporibus tempore neque esse inventore iusto, consequuntur nobis voluptatum nemo. Magnam dolores cumque voluptas aliquam minus, non ut! Nostrum possimus officia labore incidunt accusamus! Inventore, iste.
            Fugiat, esse facere aut molestias quidem enim veritatis maxime? Natus et aliquid rem dolorem mollitia consequuntur itaque voluptatum eos placeat asperiores adipisci aperiam ex perspiciatis iure, alias earum, molestias provident!
            Doloribus aspernatur cupiditate numquam odit laboriosam aliquam debitis provident quas illo? Animi non inventore ratione error dolorem? Fugiat maxime fuga molestias consequatur, aperiam sapiente ut saepe, tenetur ipsum esse obcaecati.
            Dicta, reiciendis eveniet. Eum quod dolore doloribus? Nobis architecto illum nostrum dolorem ratione. Ipsam sequi, cumque rem animi non, sint harum ipsa debitis dolores eos cum dolorum autem vitae! Deleniti!
            Quisquam facere eos tempora eum ullam consectetur vitae tempore, autem iure ab mollitia molestiae ipsa minima, libero quo ex alias repudiandae voluptatem ut cupiditate expedita? Consequuntur culpa natus aspernatur itaque.
            Pariatur blanditiis omnis autem mollitia provident iusto officiis laborum praesentium, doloremque necessitatibus commodi et dolorem soluta non facere! Deserunt fuga quam ab eum architecto aliquam temporibus eligendi provident sint neque?
            Perspiciatis animi, ab quos sit qui tenetur, atque culpa nam officiis rerum earum totam nisi placeat recusandae porro aspernatur quam. Perferendis officia commodi dolor fugit expedita iusto dignissimos corrupti numquam?
            Quam numquam eaque sint distinctio deleniti, odio qui voluptates nisi et repellendus adipisci dolorem dicta obcaecati totam eius aut blanditiis ratione recusandae sit quibusdam eos! Accusantium aperiam cum aut quidem.
            Minus rerum doloremque animi minima modi dolorem possimus, voluptatem obcaecati delectus quibusdam consectetur odit vitae architecto sapiente, repellendus quod necessitatibus illo voluptatum exercitationem laborum at quasi. Aut ipsa architecto qui!
            Maxime hic assumenda blanditiis perspiciatis. Omnis officia consequatur voluptas, reprehenderit facere non placeat. Dolores adipisci ut repudiandae earum rem quaerat, inventore a molestiae id. Modi id beatae voluptatem iste porro?
            </p>
        </Modal>
    </div>
  );
}

