<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
<xsl:output method="html" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html>
<head>
    <title>
        <xsl:choose>
            <xsl:when test="sitemap:sitemapindex">Sitemap Index — Roam Morocco Tours</xsl:when>
            <xsl:otherwise>XML Sitemap — Roam Morocco Tours</xsl:otherwise>
        </xsl:choose>
    </title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #0b1120; color: #e2e8f0; padding: 2.5rem 2rem; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #1e293b; }
        h1 { font-size: 1.6rem; font-weight: 700; color: #C8A45C; display: flex; align-items: center; gap: 0.5rem; }
        .subtitle { color: #94a3b8; font-size: 0.9rem; margin-top: 0.35rem; }
        .badge { background: rgba(200, 164, 92, 0.15); color: #C8A45C; border: 1px solid rgba(200, 164, 92, 0.3); padding: 0.35rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
        .stats { display: flex; gap: 1rem; margin-bottom: 1.5rem; }
        .stat { background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 0.75rem 1.25rem; }
        .stat-value { font-size: 1.4rem; font-weight: 700; color: #C8A45C; }
        .stat-label { font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
        .info-box { background: rgba(200, 164, 92, 0.08); border-left: 4px solid #C8A45C; padding: 0.85rem 1rem; border-radius: 4px; margin-bottom: 1.5rem; font-size: 0.85rem; color: #cbd5e1; }
        .info-box a { color: #C8A45C; text-decoration: underline; font-weight: 600; }
        table { width: 100%; border-collapse: collapse; background: #111827; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3); border: 1px solid #1e293b; }
        th { background: #0f172a; color: #94a3b8; padding: 0.85rem 1rem; text-align: left; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; border-bottom: 2px solid #C8A45C; }
        td { padding: 0.75rem 1rem; border-bottom: 1px solid #1e293b; font-size: 0.85rem; color: #e2e8f0; }
        tr:last-child td { border-bottom: none; }
        tr:hover td { background: #1e293b; }
        a { color: #C8A45C; text-decoration: none; font-weight: 500; word-break: break-all; }
        a:hover { text-decoration: underline; color: #e2ba6f; }
        .priority { font-weight: 600; }
        .priority-high { color: #34d399; }
        .priority-medium { color: #38bdf8; }
        .priority-low { color: #94a3b8; }
    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <div>
            <h1>
                <xsl:choose>
                    <xsl:when test="sitemap:sitemapindex">&#128506; Categorized Sitemap Index</xsl:when>
                    <xsl:otherwise>&#128506; XML Sitemap</xsl:otherwise>
                </xsl:choose>
            </h1>
            <p class="subtitle">Roam Morocco Tours &#8212; Private Tours &amp; Chauffeur Transfers</p>
        </div>
        <div>
            <xsl:choose>
                <xsl:when test="sitemap:sitemapindex">
                    <span class="badge">Master Index</span>
                </xsl:when>
                <xsl:otherwise>
                    <span class="badge"><a href="/sitemap.xml" style="color: inherit; text-decoration: none;">&larr; Back to Index</a></span>
                </xsl:otherwise>
            </xsl:choose>
        </div>
    </div>

    <!-- Sitemap Index View -->
    <xsl:if test="sitemap:sitemapindex">
        <div class="stats">
            <div class="stat">
                <div class="stat-value"><xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/></div>
                <div class="stat-label">Categorized Sub-Sitemaps</div>
            </div>
            <div class="stat">
                <div class="stat-value">176+</div>
                <div class="stat-label">Total Indexed Pages</div>
            </div>
        </div>
        <div class="info-box">
            This is the master XML sitemap index. Each sub-sitemap groups related URLs (transfers, tours, destinations, guides) to optimize crawling efficiency and Google Search Console index monitoring.
        </div>
        <table>
            <thead>
                <tr>
                    <th style="width: 50px;">#</th>
                    <th>Category Sub-Sitemap</th>
                    <th style="width: 180px;">Last Modified</th>
                </tr>
            </thead>
            <tbody>
                <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                    <tr>
                        <td style="color:#64748b;"><xsl:value-of select="position()"/></td>
                        <td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
                        <td style="color:#94a3b8;"><xsl:value-of select="sitemap:lastmod"/></td>
                    </tr>
                </xsl:for-each>
            </tbody>
        </table>
    </xsl:if>

    <!-- URL Set View -->
    <xsl:if test="sitemap:urlset">
        <div class="stats">
            <div class="stat">
                <div class="stat-value"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></div>
                <div class="stat-label">Total URLs in Category</div>
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th style="width: 50px;">#</th>
                    <th>Page URL</th>
                    <th style="width: 90px;">Priority</th>
                    <th style="width: 120px;">Change Freq</th>
                    <th style="width: 140px;">Last Modified</th>
                </tr>
            </thead>
            <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                    <tr>
                        <td style="color:#64748b;"><xsl:value-of select="position()"/></td>
                        <td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
                        <td>
                            <xsl:choose>
                                <xsl:when test="sitemap:priority &gt;= 0.9">
                                    <span class="priority priority-high"><xsl:value-of select="sitemap:priority"/></span>
                                </xsl:when>
                                <xsl:when test="sitemap:priority &gt;= 0.7">
                                    <span class="priority priority-medium"><xsl:value-of select="sitemap:priority"/></span>
                                </xsl:when>
                                <xsl:otherwise>
                                    <span class="priority priority-low"><xsl:value-of select="sitemap:priority"/></span>
                                </xsl:otherwise>
                            </xsl:choose>
                        </td>
                        <td style="color:#94a3b8;"><xsl:value-of select="sitemap:changefreq"/></td>
                        <td style="color:#94a3b8;"><xsl:value-of select="sitemap:lastmod"/></td>
                    </tr>
                </xsl:for-each>
            </tbody>
        </table>
    </xsl:if>
</div>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
