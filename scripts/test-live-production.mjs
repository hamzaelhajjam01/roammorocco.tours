async function verifyLive() {
  // 1. Check spain-morocco-itinerary.html links & images
  const spainRes = await fetch('https://roammorocco.tours/blog/spain-morocco-itinerary.html');
  const spainHtml = await spainRes.text();
  console.log('Spain itinerary status:', spainRes.status);
  console.log('Contains /blog/what-to-wear-in-morocco.html:', spainHtml.includes('href="/blog/what-to-wear-in-morocco.html"'));
  console.log('Contains /blog/is-morocco-safe-for-tourists.html:', spainHtml.includes('href="/blog/is-morocco-safe-for-tourists.html"'));
  console.log('Contains spain-seville-plaza.jpg:', spainHtml.includes('spain-seville-plaza.jpg'));
  console.log('Contains spain-morocco-ferry-hero.jpg:', spainHtml.includes('spain-morocco-ferry-hero.jpg'));

  // 2. Check css roam-blog.css has rounded FAQ
  const cssRes = await fetch('https://roammorocco.tours/css/roam-blog.css');
  const css = await cssRes.text();
  console.log('roam-blog.css has .faq-item rounded (16px):', css.includes('.faq-item') && css.includes('border-radius: 16px !important'));

  // 3. Check best-time-to-visit-sahara-morocco.html duplicate elimination
  const saharaRes = await fetch('https://roammorocco.tours/blog/best-time-to-visit-sahara-morocco.html');
  const saharaHtml = await saharaRes.text();
  const saharaCampCount = (saharaHtml.match(/sahara_camp\.webp/g) || []).length;
  console.log('sahara_camp.webp occurrences in sahara blog (now 1):', saharaCampCount);
  console.log('Contains new morocco-sahara-dunes-sunset.jpg:', saharaHtml.includes('morocco-sahara-dunes-sunset.jpg'));

  // 4. Check agafay-desert-vs-merzouga.html
  const agafayRes = await fetch('https://roammorocco.tours/blog/agafay-desert-vs-merzouga.html');
  const agafayHtml = await agafayRes.text();
  console.log('Agafay blog contains morocco-agafay-desert-camp.jpg:', agafayHtml.includes('morocco-agafay-desert-camp.jpg'));

  // 5. Check 301 redirect
  const redirectRes = await fetch('https://roammorocco.tours/what-to-wear-in-morocco.html', { redirect: 'manual' });
  console.log('Legacy URL redirect status:', redirectRes.status, 'Location:', redirectRes.headers.get('location'));
}
verifyLive();
