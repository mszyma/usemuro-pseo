import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Language, SUPPORTED_LANGUAGES } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import Navigation from '../components/Navigation';
import styles from './legal.module.css';

const SITE_URL = 'https://usemuro.com';

export async function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Language }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const titles: Record<Language, string> = {
    en: 'Terms of Service & Privacy Policy | Muro',
    de: 'Nutzungsbedingungen & Datenschutzrichtlinie | Muro',
    pl: 'Regulamin i Polityka Prywatności | Muro',
  };

  const descriptions: Record<Language, string> = {
    en: 'Terms of Service and Privacy Policy for Muro, the AI-powered wall color visualization app.',
    de: 'Nutzungsbedingungen und Datenschutzrichtlinie für Muro, die KI-gestützte App zur Visualisierung von Wandfarben.',
    pl: 'Regulamin i Polityka Prywatności dla Muro, aplikacji do wizualizacji kolorów ścian opartej na AI.',
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    alternates: {
      canonical: `${SITE_URL}/${lang}/legal`,
      languages: {
        en: `${SITE_URL}/en/legal`,
        de: `${SITE_URL}/de/legal`,
        pl: `${SITE_URL}/pl/legal`,
      },
    },
  };
}

const legalContent: Record<Language, { title: string; updated: string; content: React.ReactNode }> = {
  en: {
    title: 'Terms of Service & Privacy Policy',
    updated: 'Last updated: January 21, 2026',
    content: (
      <>
        <p className={styles.intro}>
          <strong>PLEASE READ THESE TERMS OF SERVICE ("AGREEMENT" OR "TERMS OF SERVICE") CAREFULLY BEFORE USING THE
            SERVICES OFFERED BY MURO. THIS AGREEMENT SETS FORTH THE LEGALLY BINDING TERMS AND CONDITIONS FOR
            YOUR USE OF THE MURO WEBSITE AND ALL RELATED SERVICES, INCLUDING ALL FEATURES, CONTENT, WEBSITES OR
            APPLICATIONS OFFERED BY MURO IN CONNECTION THEREWITH (COLLECTIVELY "SERVICES"). BY USING THE
            SERVICES IN ANY MANNER, YOU AGREE TO BE BOUND BY THIS AGREEMENT.</strong>
        </p>

        <p>"The Site" refers to the websites operated by Muro, including all associated applications, services,
          features, content, and functionalities offered by Muro.</p>

        <hr />

        <h2>1. Acceptance of Terms</h2>
        <p>The Service is offered subject to acceptance without modification of all of these Terms of Service and
          all other operating rules, policies and procedures that may be published from time to time in connection
          with the Services by Muro. In addition, some services offered through the Service may be subject to
          additional terms and conditions promulgated by Muro from time to time; your use of such services is
          subject to those additional terms and conditions, which are incorporated into these Terms of Service by
          this reference.</p>
        <p>Muro may, in its sole discretion, refuse to offer the Service to any person or entity and change its
          eligibility criteria at any time. This provision is void where prohibited by law and the right to access
          the Service is revoked in such jurisdictions.</p>

        <hr />

        <h2>2. Rules and Conduct</h2>

        <h3>2.1. Use of the Service</h3>
        <p>By using Muro, you confirm that the Service is intended solely for visualizing paint colors on walls
          using AI technology. You confirm that when using the Service, you will only upload photos of spaces you
          own or have permission to photograph.</p>

        <h3>2.2. Age Requirements</h3>
        <p>By using the Muro app, you confirm that you are at least 18 years old or have reached the age of majority
          in your country of residence. If you are under 18 or the age of majority in your country (whichever is
          higher), you are prohibited from using the app. It is your responsibility to ensure compliance with
          local laws regarding age restrictions for digital services.</p>

        <h3>2.3. User Obligations</h3>
        <p>As a condition of use, you promise not to use the Service for any purpose prohibited by the Terms of
          Service. You shall not:</p>
        <ul>
          <li>Violate any applicable laws, rules, or regulations</li>
          <li>Infringe upon any intellectual property or other rights of any person</li>
          <li>Use the Service in a threatening, harassing, defamatory, fraudulent, invasive of privacy, tortious,
            obscene, or offensive manner</li>
          <li>Generate or disseminate false information with the intent to harm others</li>
          <li>Impersonate or attempt to impersonate others</li>
        </ul>

        <h3>2.4. Additional Restrictions</h3>
        <p>You shall not (directly or indirectly):</p>
        <ul>
          <li>Take any action that imposes an unreasonable or disproportionately large load on Muro&apos;s
            infrastructure</li>
          <li>Interfere or attempt to interfere with the proper working of the Service</li>
          <li>Bypass any measures Muro may use to prevent or restrict access to the Service</li>
          <li>Use any method of data extraction from the Services, including web scraping</li>
          <li>Decompile, disassemble, or attempt to discover source code or underlying components of models</li>
          <li>Reproduce, duplicate, copy, sell, resell, or exploit any portion of the Site without express written
            permission</li>
        </ul>

        <hr />

        <h2>3. Modifications to Terms</h2>
        <p>Muro may, in its sole discretion, modify or replace any of the Terms of Service, and change, suspend, or
          discontinue the Service (including the availability of any feature, database, or content) at any time by
          posting a notice on the Muro website or sending you an email. Muro may also impose limits on certain
          features and services or restrict your access to parts or all of the Service without notice or
          liability.</p>
        <p>You are responsible for periodically checking the Terms of Service for changes. Your continued use of the
          Service following the posting of any changes constitutes acceptance of those changes.</p>

        <hr />

        <h2>4. License Terms</h2>
        <p>Subject to your compliance with this Agreement, the conditions herein, and any limitations applicable to
          Muro or by law:</p>
        <ol>
          <li>You are granted a non-exclusive, limited, non-transferable, non-sublicensable, non-assignable,
            freely revocable license to access and use the Service for business or personal use</li>
          <li>You own all Content you create with the Services</li>
          <li>Muro hereby assigns to you all rights, title, and interest in and to such Content for your personal
            or commercial use</li>
        </ol>
        <p>Otherwise, Muro reserves all rights not expressly granted under these Terms of Service.</p>

        <hr />

        <h2>5. Fees and Payments</h2>

        <h3>5.1. Immediate Access and Waiver of Right to Withdraw</h3>
        <p>You expressly acknowledge that Muro provides immediate access to digital content and begins service
          consumption immediately upon purchase, without the standard 14-day withdrawal period. Therefore, you
          expressly waive your right to withdraw from this purchase. Due to high GPU processing costs, Muro is
          unable to offer refunds as servers are reserved and costs are incurred immediately upon usage.</p>

        <h3>5.2. Subscription</h3>
        <p>Muro offers a paid Service. You may sign up for a weekly, monthly or yearly subscription that will
          automatically renew. You may stop using the Service and cancel your subscription at any time through
          your device&apos;s subscription settings. If you cancel your subscription, you will not receive a refund or
          credit for any amounts that have already been billed or paid.</p>
        <p><strong>If you do not wish to renew your subscription, you should cancel before the renewal
          date.</strong></p>

        <h3>5.3. Price Changes</h3>
        <p>Muro reserves the right to change prices and offerings at any time. For users on a subscription plan,
          price changes will not apply until the next renewal.</p>

        <h3>5.4. Taxes</h3>
        <p>Unless otherwise stated, your subscription fees do not include federal, state, local, and foreign taxes,
          duties, and other similar assessments. You are responsible for all Taxes associated with your purchase,
          and Muro may invoice you for such Taxes.</p>

        <hr />

        <h2>6. Termination</h2>
        <p>Muro may terminate your access to all or any part of the Service at any time if you fail to comply with
          these Terms of Service, which may result in the forfeiture and destruction of all information associated
          with your account. Either party may terminate the Services for any reason and at any time upon written
          notice.</p>
        <p>If you wish to terminate your account, you may do so by following the instructions on the Service. Any
          fees paid are non-refundable. Upon termination, all rights and licenses granted to you in this Agreement
          shall immediately terminate, but all provisions which by their nature should survive termination shall
          survive.</p>

        <hr />

        <h2>7. Limitation of Liability</h2>
        <p><strong>IN NO EVENT SHALL MURO OR ITS DIRECTORS, EMPLOYEES, AGENTS, PARTNERS, SUPPLIERS, OR CONTENT
          PROVIDERS BE LIABLE UNDER CONTRACT, TORT, STRICT LIABILITY, NEGLIGENCE, OR ANY OTHER LEGAL OR
          EQUITABLE THEORY WITH RESPECT TO THE SERVICE FOR:</strong></p>
        <ol>
          <li><strong>ANY LOST PROFITS, DATA LOSS, COST OF PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES, OR
            SPECIAL, INDIRECT, INCIDENTAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES OF ANY KIND</strong></li>
          <li><strong>FOR YOUR RELIANCE ON THE SERVICE</strong></li>
          <li><strong>FOR ANY DIRECT DAMAGES IN EXCESS (IN THE AGGREGATE) OF THE FEES PAID BY YOU FOR THE SERVICE
            OR, IF GREATER, $500</strong></li>
        </ol>
        <p>SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE
          LIMITATIONS AND EXCLUSIONS MAY NOT APPLY TO YOU.</p>

        <hr />

        <h2>8. Disclaimer</h2>
        <p><strong>ALL USE OF THE SERVICE AND ANY CONTENT IS UNDERTAKEN ENTIRELY AT YOUR OWN RISK. THE SERVICE IS
          PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING, BUT
          NOT LIMITED TO, THE IMPLIED WARRANTIES OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY, AND FITNESS FOR
          A PARTICULAR PURPOSE, AND ANY WARRANTIES IMPLIED BY ANY COURSE OF PERFORMANCE OR USAGE OF TRADE, ALL
          OF WHICH ARE EXPRESSLY DISCLAIMED.</strong></p>

        <hr />

        <h2>9. Dispute Resolution</h2>
        <p>You and Muro agree that any and all disputes, claims, or causes of action that have arisen or may arise
          between you and us will be resolved exclusively through final and binding arbitration before a neutral
          arbitrator, rather than in court by a judge or jury.</p>
        <p>You agree that by entering into these Terms, you and we are each waiving the right to a trial by jury or
          to participate in a class action.</p>
        <p>Any and all Claims shall be governed by the internal substantive laws of Poland, without regard for the
          jurisdiction or forum in which the user is located.</p>

        <hr />

        <h2>10. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at <a
          href="mailto:mariusz@szyma.co">mariusz@szyma.co</a>.</p>

        <hr />

        <p><em>Muro reserves the right to update and modify these Terms at any time. Please check this page
          regularly for changes.</em></p>
      </>
    ),
  },
  de: {
    title: 'Nutzungsbedingungen & Datenschutzrichtlinie',
    updated: 'Zuletzt aktualisiert: 21. Januar 2026',
    content: (
      <>
        <p className={styles.intro}>
          <strong>BITTE LESEN SIE DIESE NUTZUNGSBEDINGUNGEN ("VEREINBARUNG" ODER "AGB") SORGFALTIG DURCH, BEVOR SIE
            DIE VON MURO ANGEBOTENEN DIENSTE NUTZEN. DIESE VEREINBARUNG LEGT DIE RECHTLICH BINDENDEN BEDINGUNGEN
            FUR DIE NUTZUNG DER MURO-WEBSITE UND ALLER ZUGEHORIGEN DIENSTE FEST, EINSCHLIESSLICH ALLER
            FUNKTIONEN, INHALTE, WEBSITES ODER ANWENDUNGEN, DIE VON MURO IN VERBINDUNG DAMIT ANGEBOTEN WERDEN
            (ZUSAMMEN "DIENSTE"). DURCH DIE NUTZUNG DER DIENSTE AUF JEDWEDE WEISE STIMMEN SIE ZU, AN DIESE
            VEREINBARUNG GEBUNDEN ZU SEIN.</strong>
        </p>

        <p>"Die Website" bezieht sich auf die von Muro betriebenen Websites, einschliesslich aller zugehorigen
          Anwendungen, Dienste, Funktionen, Inhalte und Funktionalitaten, die von Muro angeboten werden.</p>

        <hr />

        <h2>1. Annahme der Bedingungen</h2>
        <p>Der Dienst wird unter der Bedingung angeboten, dass alle diese Nutzungsbedingungen und alle anderen
          Betriebsregeln, Richtlinien und Verfahren, die von Muro in Verbindung mit den Diensten veroffentlicht
          werden, ohne Anderungen akzeptiert werden. Daruber hinaus konnen einige uber den Dienst angebotene
          Dienste zusatzlichen Bedingungen unterliegen, die von Muro von Zeit zu Zeit festgelegt werden; die
          Nutzung solcher Dienste unterliegt diesen zusatzlichen Bedingungen, die durch diesen Verweis in diese
          Nutzungsbedingungen einbezogen werden.</p>
        <p>Muro kann nach eigenem Ermessen jeder Person oder Organisation den Dienst verweigern und die
          Berechtigungskriterien jederzeit andern. Diese Bestimmung ist dort ungultig, wo sie gesetzlich verboten
          ist, und das Recht auf Zugang zum Dienst wird in solchen Gerichtsbarkeiten widerrufen.</p>

        <hr />

        <h2>2. Regeln und Verhalten</h2>

        <h3>2.1. Nutzung des Dienstes</h3>
        <p>Durch die Nutzung von Muro bestatigen Sie, dass der Dienst ausschliesslich fur die Visualisierung von
          Wandfarben mit KI-Technologie bestimmt ist. Sie bestatigen, dass Sie bei der Nutzung des Dienstes nur
          Fotos von Raumen hochladen, die Ihnen gehoren oder fur die Sie die Erlaubnis zum Fotografieren haben.</p>

        <h3>2.2. Altersanforderungen</h3>
        <p>Durch die Nutzung der Muro-App bestatigen Sie, dass Sie mindestens 18 Jahre alt sind oder die
          Volljahrigkeit in Ihrem Wohnsitzland erreicht haben. Wenn Sie unter 18 Jahre alt sind oder die
          Volljahrigkeit in Ihrem Land noch nicht erreicht haben (je nachdem, welches Alter hoher ist), ist die
          Nutzung der App untersagt. Es liegt in Ihrer Verantwortung, die Einhaltung lokaler Gesetze bezuglich der
          Altersbeschrankungen fur digitale Dienste sicherzustellen.</p>

        <h3>2.3. Benutzerpflichten</h3>
        <p>Als Bedingung fur die Nutzung versprechen Sie, den Dienst nicht fur Zwecke zu verwenden, die durch die
          Nutzungsbedingungen verboten sind. Sie durfen nicht:</p>
        <ul>
          <li>Geltende Gesetze, Regeln oder Vorschriften verletzen</li>
          <li>Urheberrechte oder andere Rechte anderer Personen verletzen</li>
          <li>Den Dienst in einer bedrohlichen, belastigenden, verleumderischen, betrugerischen, die Privatsphare
            verletzenden, unerlaubten, obszonen oder beleidigenden Weise verwenden</li>
          <li>Falsche Informationen mit der Absicht erstellen oder verbreiten, anderen zu schaden</li>
          <li>Sich als andere Personen ausgeben oder versuchen, sich als solche auszugeben</li>
        </ul>

        <h3>2.4. Zusatzliche Einschrankungen</h3>
        <p>Sie durfen nicht (direkt oder indirekt):</p>
        <ul>
          <li>Massnahmen ergreifen, die eine unzumutbare oder unverhaltnismassig grosse Belastung fur die
            Infrastruktur von Muro darstellen</li>
          <li>Versuchen, die ordnungsgemasse Funktion des Dienstes zu beeintrachtigen</li>
          <li>Massnahmen umgehen, die Muro moglicherweise verwendet, um den Zugang zum Dienst zu verhindern oder
            einzuschranken</li>
          <li>Methoden zur Datenextraktion aus den Diensten verwenden, einschliesslich Web-Scraping</li>
          <li>Dekompilieren, disassemblieren oder versuchen, Quellcode oder Komponenten von Modellen zu entdecken</li>
          <li>Die Website oder Teile davon ohne ausdruckliche schriftliche Genehmigung reproduzieren, duplizieren,
            kopieren, verkaufen, weiterverkaufen oder nutzen</li>
        </ul>

        <hr />

        <h2>3. Anderungen der Bedingungen</h2>
        <p>Muro kann nach eigenem Ermessen jederzeit beliebige Bestimmungen der Nutzungsbedingungen andern oder
          ersetzen sowie den Dienst (einschliesslich der Verfugbarkeit einer Funktion, Datenbank oder Inhalte)
          andern, aussetzen oder einstellen, indem eine Mitteilung auf der Website von Muro veroffentlicht oder
          Ihnen eine E-Mail gesendet wird. Muro kann auch Limits fur bestimmte Funktionen und Dienste festlegen
          oder Ihren Zugang zu Teilen oder dem gesamten Dienst ohne Mitteilung oder Haftung einschranken.</p>
        <p>Sie sind dafur verantwortlich, die Nutzungsbedingungen regelmassig auf Anderungen zu uberprufen. Ihre
          fortgesetzte Nutzung des Dienstes nach der Veroffentlichung von Anderungen der Nutzungsbedingungen
          stellt die Annahme dieser Anderungen dar.</p>

        <hr />

        <h2>4. Lizenzbedingungen</h2>
        <p>Unter der Bedingung Ihrer Einhaltung dieser Vereinbarung, der hierin enthaltenen Bedingungen und aller
          anwendbaren Einschrankungen:</p>
        <ol>
          <li>Erhalten Sie eine nicht ausschliessliche, begrenzte, nicht ubertragbare, nicht unterlizenzierbare,
            nicht zuweisbare, frei widerrufbare Lizenz fur den Zugriff auf und die Nutzung des Dienstes fur
            geschaftliche oder personliche Zwecke</li>
          <li>Stehen Ihnen alle von Ihnen mit den Diensten erstellten Inhalte zu</li>
          <li>Tragt Muro hiermit alle Rechte, Titel und Interessen an solchen Inhalten fur Ihre personliche oder
            gewerbliche Nutzung uber</li>
        </ol>
        <p>Andernfalls behalt Muro alle Rechte vor, die in diesen Nutzungsbedingungen nicht ausdrucklich gewahrt
          werden.</p>

        <hr />

        <h2>5. Gebuhren und Zahlungen</h2>

        <h3>5.1. Sofortiger Zugang und Verzicht auf das Widerrufsrecht</h3>
        <p>Sie nehmen ausdrucklich zur Kenntnis, dass Muro sofortigen Zugang zu digitalen Inhalten gewahrt und den
          Dienstverbrauch unmittelbar nach dem Kauf beginnt, ohne die standardmassige 14-tagige Widerrufsfrist.
          Daher verzichten Sie ausdrucklich auf Ihr Recht, von diesem Kauf zuruckzutreten. Aufgrund der hohen
          GPU-Verarbeitungskosten kann Muro keine Ruckerstattungen anbieten, da Server reserviert und Kosten
          unmittelbar bei der Nutzung entstehen.</p>

        <h3>5.2. Abonnement</h3>
        <p>Muro bietet einen kostenpflichtigen Dienst an. Sie konnen sich fur ein wochentliches, monatliches oder
          jahrliches Abonnement anmelden, das automatisch erneuert wird. Sie konnen die Nutzung des Dienstes
          jederzeit uber die Abonnement-Einstellungen Ihres Gerates beenden und Ihr Abonnement kundigen. Wenn Sie
          Ihr Abonnement kundigen, erhalten Sie keine Ruckerstattung oder Gutschrift fur bereits in Rechnung
          gestellte oder bezahlte Betrage.</p>
        <p><strong>Wenn Sie Ihr Abonnement nicht erneuern mochten, sollten Sie vor dem Verlangerungsdatum
          kundigen.</strong></p>

        <h3>5.3. Preisanderungen</h3>
        <p>Muro behalt sich das Recht vor, Preise und Angebote jederzeit zu andern. Fur Benutzer eines
          Abonnementplans gelten Preisanderungen erst bei der nachsten Verlangerung.</p>

        <h3>5.4. Steuern</h3>
        <p>Sofern nicht anders angegeben, beinhalten Ihre Abonnementgebuhren keine Bundes-, Landes-, Kommunal- und
          auslandischen Steuern, Zolle und ahnlichen Abgaben. Sie sind fur alle mit Ihrem Kauf verbundenen Steuern
          verantwortlich, und Muro kann Ihnen diese Steuern in Rechnung stellen.</p>

        <hr />

        <h2>6. Beendigung</h2>
        <p>Muro kann Ihren Zugang zu allen oder Teilen des Dienstes jederzeit beenden, wenn Sie gegen diese
          Nutzungsbedingungen verstossen, was zum Verlust und zur Vernichtung aller mit Ihrem Konto verbundenen
          Informationen fuhren kann. Daruber hinaus kann jede Partei die Dienste aus beliebigem Grund und
          jederzeit durch schriftliche Mitteilung beenden.</p>
        <p>Wenn Sie Ihr Konto kundigen mochten, konnen Sie dies tun, indem Sie den Anweisungen im Dienst folgen.
          Alle bezahlten Gebuhren sind nicht erstattungsfahig. Bei Beendigung erloschen alle Rechte und Lizenzen,
          die Ihnen in dieser Vereinbarung gewahrt wurden, jedoch bleiben alle Bestimmungen, die ihrer Natur nach
          die Beendigung uberdauern sollten, in Kraft.</p>

        <hr />

        <h2>7. Haftungsbeschrankung</h2>
        <p><strong>IN KEINEM FALL HAFTEN MURO ODER IHRE DIREKTOREN, MITARBEITER, AGENTEN, PARTNER, LIEFERANTEN ODER
          INHALTSANBIETER VERTRAGLICH, AUS UNERLAUBTER HANDLUNG, VERSCHULDENSUNABHANGIGER HAFTUNG,
          FAHRLASSIGKEIT ODER JEDER ANDEREN RECHTLICHEN ODER GLEICHWERTIGEN THEORIE GEGENUBER DEM DIENST
          FUR:</strong></p>
        <ol>
          <li><strong>ENTGANGENEN GEWINN, DATENVERLUST, KOSTEN DER BESCHAFFUNG VON ERSATZGUTERN ODER -DIENSTEN
            ODER BESONDERE, INDIREKTE, ZUFALLIGE, STRAF- ODER FOLGESCHADEN JEDWEDER ART</strong></li>
          <li><strong>FUR IHR VERTRAUEN AUF DEN DIENST</strong></li>
          <li><strong>FUR DIREKTE SCHADEN, DIE IN DER GESAMTHEIT DIE VON IHNEN FUR DEN DIENST GEZAHLTEN GEBUHREN
            ODER, WENN HOHER, 500 USD UBERSTEIGEN</strong></li>
        </ol>
        <p>EINIGE STAATEN ERLAUBEN DEN AUSSCHLUSS ODER DIE BESCHRANKUNG VON ZUFALLIGEN ODER FOLGESCHADEN NICHT,
          SODASS DIE OBIGEN BESCHRANKUNGEN UND AUSSCHLUSSE MOGLICHERWEISE NICHT AUF SIE ZUTREFFEN.</p>

        <hr />

        <h2>8. Haftungsausschluss</h2>
        <p><strong>DIE GESAMTE NUTZUNG DES DIENSTES UND ALLER INHALTE ERFOLGT AUSSCHLIESSLICH AUF EIGENES RISIKO.
          DER DIENST WIRD "WIE BESEHEN" UND "WIE VERFUGBAR" OHNE JEGLICHE GEWAHRLEISTUNG JEGLICHER ART,
          AUSDRUCKLICH ODER STILLSCHWEIGEND, EINSCHLIESSLICH, ABER NICHT BESCHRANKT AUF DIE STILLSCHWEIGENDEN
          GEWAHRLEISTUNGEN DER MARKTGANGIGKEIT, DER NICHTVERLETZUNG VON RECHTEN, DER EIGNUNG FUR EINEN
          BESTIMMTEN ZWECK UND ALLER GEWAHRLEISTUNGEN, DIE SICH AUS EINEM HANDELSBRAUCH ODER EINER
          HANDELSPRAXIS ERGEBEN KONNEN, ZUR VERFUGUNG GESTELLT.</strong></p>

        <hr />

        <h2>9. Streitbeilegung</h2>
        <p>Sie und Muro erklaren sich damit einverstanden, dass alle Streitigkeiten, Anspruche oder Klagegrunde, die
          zwischen Ihnen und uns entstanden sind oder entstehen konnten, ausschliesslich durch endgultigen und
          bindenden Schiedsverfahren vor einem neutralen Schiedsrichter und nicht vor Gericht durch einen Richter
          oder eine Jury beigelegt werden.</p>
        <p>Sie erklaren sich damit einverstanden, dass durch das Eingehen dieser Nutzungsbedingungen Sie und wir
          jeweils auf das Recht auf ein Schwurgerichtsverfahren oder die Teilnahme an einer Sammelklage
          verzichten.</p>
        <p>Alle Anspruche unterliegen den internen Sachrechten Polens, unabhangig von der Gerichtsbarkeit oder dem
          Forum, in dem Sie sich befinden.</p>

        <hr />

        <h2>10. Kontaktieren Sie uns</h2>
        <p>Wenn Sie Fragen zu diesen Nutzungsbedingungen haben, kontaktieren Sie uns bitte unter <a
          href="mailto:mariusz@szyma.co">mariusz@szyma.co</a>.</p>

        <hr />

        <p><em>Muro behalt sich das Recht vor, diese Nutzungsbedingungen jederzeit zu aktualisieren und zu andern.
          Bitte uberprufen Sie diese Seite regelmassig auf Anderungen.</em></p>
      </>
    ),
  },
  pl: {
    title: 'Regulamin i Polityka Prywatnosci',
    updated: 'Data ostatniej aktualizacji: 21 stycznia 2026',
    content: (
      <>
        <p className={styles.intro}>
          <strong>PROSIMY O UWAZNE PRZECZYTANIE NINIEJSZEGO REGULAMINU ("UMOWA" LUB "REGULAMIN") PRZED KORZYSTANIEM
            Z USLUG OFEROWANYCH PRZEZ MURO. NINIEJSZA UMOWA OKRESLA PRAWNIE WIAZACE WARUNKI I ZASADY KORZYSTANIA
            ZE STRONY INTERNETOWEJ MURO ORAZ WSZYSTKICH POWIAZANYCH USLUG, W TYM WSZYSTKICH FUNKCJI, TRESCI,
            STRON INTERNETOWYCH LUB APLIKACJI OFEROWANYCH PRZEZ MURO W ZWIAZKU Z NIMI (LACZNIE "USLUGI").
            KORZYSTAJAC Z USLUG W DOWOLNY SPOSOB, WYRAZASZ ZGODE NA ZWIAZANIE NINIEJSZA UMOWA.</strong>
        </p>

        <p>"Strona" odnosi sie do stron internetowych obslugiwanych przez Muro, w tym wszelkich powiazanych
          aplikacji, uslug, funkcji, tresci i funkcjonalnosci oferowanych przez Muro.</p>

        <hr />

        <h2>1. Akceptacja Regulaminu</h2>
        <p>Usluga jest oferowana pod warunkiem pelnej akceptacji bez modyfikacji niniejszego Regulaminu oraz
          wszystkich innych zasad operacyjnych, polityk i procedur, ktore moga byc publikowane od czasu do czasu w
          zwiazku z Uslugami przez Muro. Ponadto niektore uslugi oferowane za posrednictwem Uslugi moga podlegac
          dodatkowym warunkom i zasadom ustalanym przez Muro; korzystanie z takich uslug podlega tym dodatkowym
          warunkom, ktore sa wlaczane do niniejszego Regulaminu przez niniejsze odniesienie.</p>
        <p>Muro moze, wedlug wlasnego uznania, odmowic oferowania Uslugi jakiejkolwiek osobie lub podmiotowi oraz
          zmienic kryteria kwalifikacji w dowolnym momencie. Niniejsze postanowienie jest niewazne tam, gdzie jest
          to zabronione przez prawo, a prawo do dostepu do Uslugi zostaje cofniete w takich jurysdykcjach.</p>

        <hr />

        <h2>2. Zasady i Postepowanie</h2>

        <h3>2.1. Korzystanie z Uslugi</h3>
        <p>Korzystajac z Muro, uzytkownik potwierdza, ze Usluga jest przeznaczona wylacznie do wizualizacji kolorow
          farb na scianach przy uzyciu technologii AI. Uzytkownik potwierdza, ze korzystajac z Uslugi, bedzie
          przesylac tylko zdjecia przestrzeni, ktore sa jego wlasnoscia lub na ktore ma pozwolenie na
          fotografowanie.</p>

        <h3>2.2. Wymagania wiekowe</h3>
        <p>Korzystajac z aplikacji Muro, uzytkownik potwierdza, ze ma ukonczone 18 lat lub osiagnal pelnoletnosc w
          swoim kraju zamieszkania. Jesli uzytkownik ma mniej niz 18 lat lub nie osiagnal pelnoletnosci w swoim
          kraju (w zaleznosci od tego, co wyzsze), korzystanie z aplikacji jest zabronione. Uzytkownik jest
          odpowiedzialny za zapewnienie zgodnosci z lokalnymi przepisami dotyczacymi ograniczen wiekowych dla
          uslug cyfrowych.</p>

        <h3>2.3. Zobowiazania Uzytkownika</h3>
        <p>Jako warunek korzystania, uzytkownik obiecuje nie uzywac Uslugi do zadnego celu zabronionego przez
          Regulamin. Miedzy innymi, uzytkownik nie moze:</p>
        <ul>
          <li>Naruszac obowiazujacych praw, zasad lub regulacji</li>
          <li>Naruszac praw wlasnosci intelektualnej lub innych praw osob trzecich</li>
          <li>Uzywac Uslugi w sposob zastraszajacy, nekajacy, znieslawiajaczy, oszukanczy, inwazyjny wobec
            prywatnosci, torturerski, obsceniczny lub obrazliwy</li>
          <li>Generowac lub rozpowszechniac falszywych informacji z zamiarem szkodzenia innym</li>
          <li>Podszywac sie pod inne osoby</li>
        </ul>

        <h3>2.4. Dodatkowe Ograniczenia</h3>
        <p>Uzytkownik nie moze (bezposrednio ani posrednio):</p>
        <ul>
          <li>Podejmowac dzialan nakladajacych nieuzasadnione lub nieproporcjonalnie duze obciazenie na
            infrastrukture Muro</li>
          <li>Ingerowac lub probowac zaklucac prawidlowe dzialanie Uslugi</li>
          <li>Omijac srodkow stosowanych przez Muro w celu zapobiegania lub ograniczania dostepu do Uslugi</li>
          <li>Uzywac jakiejkolwiek metody ekstrakcji danych z Uslug, w tym web scraping</li>
          <li>Dekompilowac, deasemblowac lub probowac odkryc kodu zrodlowego lub podstawowych komponentow modeli</li>
          <li>Reprodukowac, duplikowac, kopiowac, sprzedawac, odsprzedawac lub eksploatowac jakakkolwiek czesc
            Strony bez wyraznej pisemnej zgody</li>
        </ul>

        <hr />

        <h2>3. Modyfikacje Regulaminu</h2>
        <p>Muro moze, wedlug wlasnego uznania, modyfikowac lub zastepowac dowolne postanowienia Regulaminu oraz
          zmieniac, zawieszac lub wycofywac Usluge (w tym dostepnosc dowolnej funkcji, bazy danych lub tresci) w
          dowolnym momencie, publikujac powiadomienie na stronach internetowych Muro lub wysylajac uzytkownikowi
          e-mail. Muro moze rowniez nakladac limity na pewne funkcje i uslugi lub ograniczac dostep do czesci lub
          calosci Uslugi bez powiadomienia lub odpowiedzialnosci.</p>
        <p>Uzytkownik jest odpowiedzialny za okresowe sprawdzanie Regulaminu pod katem zmian. Dalsze korzystanie z
          Uslugi po opublikowaniu zmian w Regulaminie stanowi akceptacje tych zmian.</p>

        <hr />

        <h2>4. Warunki Licencji</h2>
        <p>Z zastrzezeniem zgodnosci uzytkownika z niniejsza Umowa, warunkami tutaj zawartymi oraz wszelkimi
          ograniczeniami obowiazujacymi w Muro lub wynikajacymi z prawa:</p>
        <ol>
          <li>Uzytkownik otrzymuje niewylaczna, ograniczona, nieprzenosalna, niepodlicencjonowalna,
            nieprzypisana, odwolywalna licencje na dostep do Uslugi i korzystanie z niej w celach biznesowych
            lub osobistych</li>
          <li>Uzytkownik jest wlascicielem wszystkich Tresci utworzonych za pomoca Uslug</li>
          <li>Muro niniejszym przenosi na uzytkownika wszystkie prawa, tytul i interes do takich Tresci do uzytku
            osobistego lub komercyjnego</li>
        </ol>
        <p>W przeciwnym razie Muro zastrzega wszystkie prawa niewyraznie przyznane w niniejszym Regulaminie.</p>

        <hr />

        <h2>5. Oplaty i Platnosci</h2>

        <h3>5.1. Natychmiastowy Dostep i Rezygnacja z Prawa do Odstapienia</h3>
        <p>Uzytkownik wyraznie potwierdza, ze Muro zapewnia natychmiastowy dostep do tresci cyfrowych i rozpoczyna
          korzystanie z uslugi natychmiast po zakupie, bez standardowego 14-dniowego okresu na odstapienie. W
          zwiazku z tym uzytkownik wyraznie zrzeka sie prawa do odstapienia od tego zakupu. Ze wzgledu na wysokie
          koszty przetwarzania GPU, Muro nie jest w stanie oferowac zwrotow, poniewaz serwery sa rezerwowane i
          koszty sa ponoszone natychmiast po rozpoczeciu korzystania.</p>

        <h3>5.2. Subskrypcja</h3>
        <p>Muro oferuje platna Usluge. Uzytkownik moze zapisac sie na tygodniowa, miesieczna lub roczna subskrypcje,
          ktora automatycznie sie odnawia. Uzytkownik moze przestac korzystac z Uslugi i anulowac subskrypcje w
          dowolnym momencie przez ustawienia subskrypcji urzadzenia. W przypadku anulowania subskrypcji,
          uzytkownik nie otrzyma zwrotu lub kredytu za zadne kwoty, ktore zostaly juz naliczone lub zaplacone.</p>
        <p><strong>Jesli uzytkownik nie chce odnowic subskrypcji, powinien anulowac przed data odnowienia.</strong></p>

        <h3>5.3. Zmiany Cen</h3>
        <p>Muro zastrzega prawo do zmiany cen i oferty w dowolnym momencie. Dla uzytkownikow planu subskrypcji,
          zmiany cen nie beda stosowane do nastepnego odnowienia.</p>

        <h3>5.4. Podatki</h3>
        <p>O ile nie stwierdzono inaczej, oplaty subskrypcyjne uzytkownika nie obejmuja federalnych, stanowych,
          lokalnych i zagranicznych podatkow, cel i innych podobnych oplat. Uzytkownik jest odpowiedzialny za
          wszystkie Podatki zwiazane z zakupem, a Muro moze wystawic fakture za takie Podatki.</p>

        <hr />

        <h2>6. Rozwiazanie Umowy</h2>
        <p>Muro moze rozwiazac dostep uzytkownika do calosci lub czesci Uslugi w dowolnym momencie, jesli uzytkownik
          nie przestrzega niniejszego Regulaminu, co moze skutkowac utrata i zniszczeniem wszystkich informacji
          powiazanych z kontem. Ponadto kazda ze stron moze rozwiazac Usluge z dowolnego powodu i w dowolnym
          momencie za pisemnym powiadomieniem.</p>
        <p>Jesli uzytkownik chce rozwiazac swoje konto, moze to zrobic, postepujac zgodnie z instrukcjami w Usludze.
          Wszelkie oplaty uiszczone w ramach niniejszej Umowy nie podlegaja zwrotowi. Po rozwiazaniu, wszystkie
          prawa i licencje przyznane uzytkownikowi w niniejszej Umowie natychmiast wygasaja, ale wszystkie
          postanowienia, ktore z natury powinny przetrwac rozwiazanie, pozostana w mocy.</p>

        <hr />

        <h2>7. Ograniczenie Odpowiedzialnosci</h2>
        <p><strong>W ZADNYM PRZYPADKU MURO ANI JEJ DYREKTORZY, PRACOWNICY, AGENCI, PARTNERZY, DOSTAWCY LUB DOSTAWCY
          TRESCI NIE BEDA ODPOWIEDZIALNI W RAMACH UMOWY, CZYNU NIEDOZWOLONEGO, SUROWEJ ODPOWIEDZIALNOSCI,
          ZANIEDBANIA LUB JAKIEJKOLWIEK INNEJ PODSTAWY PRAWNEJ LUB ROWNOWAZNEJ WOBEC USLUGI ZA:</strong></p>
        <ol>
          <li><strong>UTRATE ZYSKOW, UTRATE DANYCH, KOSZTY POZYSKANIA ZASTEPCZYCH TOWAROW LUB USLUG, LUB
            SZCZEGOLNE, POSREDNIE, INCYDENTALNE, KARNE LUB KONSEKWENCYJNE SZKODY JAKIEGOKOLWIEK
            RODZAJU</strong></li>
          <li><strong>ZA UZALEZNIENIE OD USLUGI</strong></li>
          <li><strong>ZA JAKIEKOLWIEK BEZPOSREDNIE SZKODY PRZEKRACZAJACE W SUMIE OPLATY ZAPLACONE PRZEZ
            UZYTKOWNIKA ZA USLUGE LUB, JEZELI WIEKSZE, 500 USD</strong></li>
        </ol>
        <p>NIEKTORE STANY NIE POZWALAJA NA WYLACZENIE LUB OGRANICZENIE SZKOD INCYDENTALNYCH LUB KONSEKWENCYJNYCH,
          POWYZSZE OGRANICZENIA I WYLACZENIA MOGA NIE DOTYCZYC UZYTKOWNIKA.</p>

        <hr />

        <h2>8. Wylaczenie Gwarancji</h2>
        <p><strong>WSZYSTKIE KORZYSTANIE Z USLUGI I WSZYSTKIE TRESCI ODBYWAJA SIE WYLACZNIE NA WLASNE RYZYKO
          UZYTKOWNIKA. USLUGA JEST DOSTARCZANA "TAK JAK JEST" I "TAK JAK DOSTEPNA" I BEZ JAKIEJKOLWIEK
          GWARANCJI JAKIEGOKOLWIEK RODZAJU, WYRAZNEJ LUB DOROZUMIANEJ, W TYM, ALE NIE OGRANICZAJAC SIE DO,
          DOROZUMIANYCH GWARANCJI TYTULU, NIENARUSZANIA PRAW, ZBYWALNOSCI I PRZYDATNOSCI DO OKRESLONEGO CELU,
          ORAZ WSZYSTKICH GWARANCJI DOROZUMIANYCH PRZEZ KURS WYKONANIA LUB UZYTKU HANDLOWEGO, KTORE WSZYSTKIE
          SA WYRAZNIE WYLACZONE.</strong></p>

        <hr />

        <h2>9. Rozwiazywanie Sporow</h2>
        <p>Uzytkownik i Muro zgadzaja sie, ze wszelkie spory, roszczenia, zadania lub przyczyny roszczen, ktore
          powstaly lub moga powstac miedzy uzytkownikiem a nami, zostana rozstrzygniete wylacznie poprzez
          ostateczny i wiazacy arbitraz przed neutralnym arbitrem, a nie w sadzie przez sedziego lub lawe
          przysieglych.</p>
        <p>Uzytkownik zgadza sie, ze wchodzac w niniejszy Regulamin, uzytkownik i my kazdy zrzekamy sie prawa do
          procesu z lawa przysieglych lub uczestnictwa w pozwie zbiorowym.</p>
        <p>Wszelkie Roszczenia beda regulowane przez wewnetrzne prawa materialne Polski, bez wzgledu na jurysdykcje
          lub forum, w ktorym uzytkownik jest zameldowany.</p>

        <hr />

        <h2>10. Kontakt z Nami</h2>
        <p>Jesli masz jakiekolwiek pytania dotyczace niniejszego Regulaminu, skontaktuj sie z nami pod adresem <a
          href="mailto:mariusz@szyma.co">mariusz@szyma.co</a>.</p>

        <hr />

        <p><em>Muro zastrzega prawo do aktualizacji i modyfikacji niniejszego Regulaminu w dowolnym momencie.
          Prosimy o regularne sprawdzanie tej strony pod katem zmian.</em></p>
      </>
    ),
  },
};

export default async function LegalPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const content = legalContent[lang];

  const translations: Record<Language, string> = {
    en: 'legal',
    de: 'legal',
    pl: 'legal',
  };

  return (
    <>
      <Navigation lang={lang} downloadText={dict.nav.download} translations={translations} />

      <main className={styles.main}>
        <header className={styles.header}>
          <h1>{content.title}</h1>
          <p className={styles.updated}>{content.updated}</p>
        </header>

        <article className={styles.content}>
          {content.content}
        </article>

        <div className={styles.backLink}>
          <Link href={`/${lang}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {lang === 'de' ? 'Zuruck' : lang === 'pl' ? 'Wstecz' : 'Back to Home'}
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <Link href={`/${lang}`} className={styles.footerLogo}>muro</Link>
          <p>&copy; 2026 Muro. <a href="mailto:mariusz@szyma.co">mariusz@szyma.co</a></p>
        </div>
      </footer>
    </>
  );
}
