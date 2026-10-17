<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>XML Sitemap | Roam Morocco Tours</title>
        <style>
          :root {
            --bg: #f8fafc;
            --card-bg: #ffffff;
            --text-main: #0f172a;
            --text-muted: #64748b;
            --gold: #C8A45C;
            --gold-dark: #9A7B38;
            --gold-light: #FDF9F0;
            --border: #e2e8f0;
            --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          }

          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          body {
            background-color: var(--bg);
            color: var(--text-main);
            font-family: var(--font-family);
            font-size: 14px;
            line-height: 1.5;
            padding: 32px 20px 60px;
          }

          .container {
            max-width: 1140px;
            margin: 0 auto;
          }

          /* Header Card */
          .header-card {
            background: linear-gradient(135deg, #18181b 0%, #09090b 100%);
            color: #ffffff;
            border-radius: 16px;
            padding: 32px 36px;
            margin-bottom: 24px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(200, 164, 92, 0.25);
          }

          .header-card::after {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            width: 280px;
            height: 100%;
            background: radial-gradient(circle, rgba(200, 164, 92, 0.18) 0%, rgba(0, 0, 0, 0) 70%);
            pointer-events: none;
          }

          .brand-tag {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: rgba(200, 164, 92, 0.15);
            color: #e2ca8d;
            border: 1px solid rgba(200, 164, 92, 0.3);
            border-radius: 9999px;
            padding: 4px 12px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            margin-bottom: 12px;
          }

          .header-card h1 {
            font-size: 26px;
            font-weight: 800;
            letter-spacing: -0.02em;
            margin-bottom: 8px;
            color: #ffffff;
          }

          .header-card p {
            color: #94a3b8;
            font-size: 14px;
            max-width: 720px;
            line-height: 1.6;
          }

          /* Sub-sitemaps Switcher Nav */
          .sitemap-nav {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 24px;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
          }

          .sitemap-pill {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 14px;
            background: rgba(255, 255, 255, 0.08);
            color: #f1f5f9;
            text-decoration: none;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 600;
            transition: all 0.15s ease;
            border: 1px solid rgba(255, 255, 255, 0.08);
          }

          .sitemap-pill:hover {
            background: #C8A45C;
            color: #000000;
            border-color: #C8A45C;
            transform: translateY(-1px);
          }

          /* Stats Strip */
          .stats-strip {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 16px 24px;
            margin-bottom: 20px;
          }

          .stats-count {
            font-size: 14px;
            color: var(--text-muted);
            font-weight: 500;
          }

          .stats-count strong {
            color: var(--text-main);
            font-size: 16px;
            font-weight: 700;
          }

          .home-link {
            color: var(--gold-dark);
            text-decoration: none;
            font-weight: 600;
            font-size: 13px;
            display: inline-flex;
            align-items: center;
            gap: 4px;
          }

          .home-link:hover {
            text-decoration: underline;
          }

          /* Table Container */
          .table-card {
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
          }

          table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
          }

          thead {
            background-color: #f1f5f9;
            border-bottom: 1px solid var(--border);
          }

          th {
            padding: 14px 18px;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: #475569;
          }

          td {
            padding: 14px 18px;
            border-bottom: 1px solid var(--border);
            color: var(--text-main);
            font-size: 13.5px;
          }

          tr:last-child td {
            border-bottom: none;
          }

          tbody tr:hover {
            background-color: #f8fafc;
          }

          /* Table Links */
          td a {
            color: #0f172a;
            text-decoration: none;
            font-weight: 500;
            word-break: break-all;
          }

          td a:hover {
            color: var(--gold-dark);
            text-decoration: underline;
          }

          /* Badges */
          .badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.02em;
          }

          .badge-high {
            background: #fef3c7;
            color: #92400e;
            border: 1px solid #fde68a;
          }

          .badge-mid {
            background: #e0f2fe;
            color: #075985;
            border: 1px solid #bae6fd;
          }

          .badge-low {
            background: #f1f5f9;
            color: #475569;
            border: 1px solid #e2e8f0;
          }

          .freq-pill {
            color: #64748b;
            font-size: 12px;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          }

          .date-col {
            color: #64748b;
            font-size: 12.5px;
            white-space: nowrap;
          }

          /* Footer */
          footer {
            margin-top: 36px;
            text-align: center;
            font-size: 12px;
            color: #94a3b8;
          }

          footer a {
            color: var(--gold-dark);
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header Banner -->
          <div class="header-card">
            <div class="brand-tag">✨ Roam Morocco Tours</div>
            <xsl:choose>
              <xsl:when test="s:sitemapindex">
                <h1>XML Sitemap Index</h1>
                <p>
                  This is the master XML sitemap index for <strong>roammorocco.tours</strong>. It organizes all 176 indexed pages into 5 categorized sub-sitemaps for optimal search engine crawling and indexing.
                </p>
              </xsl:when>
              <xsl:otherwise>
                <h1>XML Sub-Sitemap</h1>
                <p>
                  This sitemap contains verified URLs for <strong>roammorocco.tours</strong>, formatted with canonical paths, update frequencies, and crawl priorities.
                </p>
              </xsl:otherwise>
            </xsl:choose>

            <!-- Quick Navigation to Category Sitemaps -->
            <div class="sitemap-nav">
              <a href="/sitemap.xml" class="sitemap-pill">📁 Master Index</a>
              <a href="/sitemap-transfers.xml" class="sitemap-pill">🚗 Transfers (128)</a>
              <a href="/sitemap-tours.xml" class="sitemap-pill">🐪 Tours (6)</a>
              <a href="/sitemap-destinations.xml" class="sitemap-pill">📍 Destinations (9)</a>
              <a href="/sitemap-blog.xml" class="sitemap-pill">📖 Blog Guides (22)</a>
              <a href="/sitemap-main.xml" class="sitemap-pill">🏛️ Main &amp; Chauffeur (11)</a>
            </div>
          </div>

          <!-- SITEMAP INDEX VIEW -->
          <xsl:if test="s:sitemapindex">
            <div class="stats-strip">
              <div class="stats-count">
                Categorized Sub-Sitemaps: <strong><xsl:value-of select="count(s:sitemapindex/s:sitemap)"/></strong>
              </div>
              <a href="https://roammorocco.tours/" class="home-link">Return to Roam Morocco &#8594;</a>
            </div>

            <div class="table-card">
              <table>
                <thead>
                  <tr>
                    <th style="width: 50px;">#</th>
                    <th>Sub-Sitemap Resource URL</th>
                    <th style="width: 180px;">Last Modified</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="s:sitemapindex/s:sitemap">
                    <tr>
                      <td style="color:#94a3b8; font-weight:600;"><xsl:value-of select="position()"/></td>
                      <td>
                        <a href="{s:loc}"><xsl:value-of select="s:loc"/></a>
                      </td>
                      <td class="date-col">
                        <xsl:value-of select="s:lastmod"/>
                      </td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </xsl:if>

          <!-- URLSET VIEW (INDIVIDUAL CATEGORY SITEMAP) -->
          <xsl:if test="s:urlset">
            <div class="stats-strip">
              <div class="stats-count">
                Total URLs in this category: <strong><xsl:value-of select="count(s:urlset/s:url)"/></strong>
              </div>
              <a href="/sitemap.xml" class="home-link">&#8592; Back to Master Sitemap Index</a>
            </div>

            <div class="table-card">
              <table>
                <thead>
                  <tr>
                    <th style="width: 45px;">#</th>
                    <th>Page URL</th>
                    <th style="width: 100px;">Priority</th>
                    <th style="width: 120px;">Changefreq</th>
                    <th style="width: 130px;">Last Modified</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="s:urlset/s:url">
                    <tr>
                      <td style="color:#94a3b8; font-weight:600;"><xsl:value-of select="position()"/></td>
                      <td>
                        <a href="{s:loc}"><xsl:value-of select="s:loc"/></a>
                      </td>
                      <td>
                        <xsl:choose>
                          <xsl:when test="s:priority &gt;= 0.95">
                            <span class="badge badge-high"><xsl:value-of select="s:priority"/></span>
                          </xsl:when>
                          <xsl:when test="s:priority &gt;= 0.80">
                            <span class="badge badge-mid"><xsl:value-of select="s:priority"/></span>
                          </xsl:when>
                          <xsl:otherwise>
                            <span class="badge badge-low"><xsl:value-of select="s:priority"/></span>
                          </xsl:otherwise>
                        </xsl:choose>
                      </td>
                      <td class="freq-pill">
                        <xsl:value-of select="s:changefreq"/>
                      </td>
                      <td class="date-col">
                        <xsl:value-of select="s:lastmod"/>
                      </td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </xsl:if>

          <footer>
            <p>
              Generated by <a href="https://roammorocco.tours/">Roam Morocco Tours</a> Sitemap Engine &#8226; Validated with Schema.org &amp; Google Search Console
            </p>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
