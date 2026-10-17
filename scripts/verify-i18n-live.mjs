async function verifyLive() {
  const homeRes = await fetch('https://roammorocco.tours/');
  const html = await homeRes.text();
  console.log('Home status:', homeRes.status);
  console.log('Has lang dropdown:', html.includes('lang-dropdown-item'));
  console.log('Has mobile lang selector:', html.includes('mob-lang-section'));
  console.log('Has fr hreflang:', html.includes('hreflang="fr"'));
  console.log('Has es hreflang:', html.includes('hreflang="es"'));
  console.log('Has de hreflang:', html.includes('hreflang="de"'));
  console.log('Has it hreflang:', html.includes('hreflang="it"'));
  console.log('Includes roam-i18n.js:', html.includes('roam-i18n.js'));

  const jsRes = await fetch('https://roammorocco.tours/js/roam-i18n.js');
  console.log('roam-i18n.js status:', jsRes.status);

  const blogRes = await fetch('https://roammorocco.tours/blog/morocco-10-day-itinerary.html');
  const blogHtml = await blogRes.text();
  console.log('Blog has lang dropdown:', blogHtml.includes('lang-dropdown-item'));

  const transferRes = await fetch('https://roammorocco.tours/transfers/marrakech-to-essaouira.html');
  const transferHtml = await transferRes.text();
  console.log('Transfer has lang dropdown:', transferHtml.includes('lang-dropdown-item'));
}
verifyLive();
