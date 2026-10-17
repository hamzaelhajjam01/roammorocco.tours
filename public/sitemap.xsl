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
            <xsl:when test="sitemap:sitemapindex">Sitemap Index — roammorocco.tours</xsl:when>
            <xsl:otherwise>XML Sitemap — roammorocco.tours</xsl:otherwise>
        </xsl:choose>
    </title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #f8fafc; color: #1e293b; padding: 2.5rem 2rem; }
        .container { max-width: 1200px; margin: 0 auto; }
        h1 { font-size: 1.6rem; font-weight: 700; color: #C8A45C; margin-bottom: 0.35rem; }
        .subtitle { color: #64748b; font-size: 0.9rem; margin-bottom: 1.5rem; }
        .stats { display: flex; gap: 1.5rem; margin-bottom: 1.5rem; }
        .stat { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.75rem 1.25rem; box-shadow: 0 1px 2px rgba(0,0,0,0.04); }
        .stat-value { font-size: 1.35rem; font-weight: 700; color: #C8A45C; }
        .stat-label { font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
        table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
        th { background: #111827; color: white; padding: 0.85rem 1rem; text-align: left; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; border-bottom: 2px solid #C8A45C; }
        td { padding: 0.65rem 1rem; border-bottom: 1px solid #f1f5f9; font-size: 0.85rem; color: #334155; }
        tr:last-child td { border-bottom: none; }
        tr:hover td { background: #fdfaf3; }
        a { color: #C8A45C; text-decoration: none; font-weight: 500; }
        a:hover { text-decoration: underline; color: #9A7B38; }
        .priority { font-weight: 600; }
        .priority-high { color: #b45309; }
        .priority-medium { color: #0284c7; }
        .priority-low { color: #64748b; }
    </style>
</head>
<body>
<div class="container">
    <h1>
        <xsl:choose>
            <xsl:when test="sitemap:sitemapindex">&#128506; Sitemap Index</xsl:when>
            <xsl:otherwise>&#128506; XML Sitemap</xsl:otherwise>
        </xsl:choose>
    </h1>
    <p class="subtitle">roammorocco.tours &#8212; Private Tours &amp; Chauffeur Transfers</p>

    <!-- Sitemap Index View -->
    <xsl:if test="sitemap:sitemapindex">
        <div class="stats">
            <div class="stat">
                <div class="stat-value"><xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/></div>
                <div class="stat-label">Sub-Sitemaps</div>
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th style="width: 50px;">#</th>
                    <th>Sitemap URL</th>
                    <th style="width: 200px;">Last Modified</th>
                </tr>
            </thead>
            <tbody>
                <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                    <tr>
                        <td style="color:#94a3b8;"><xsl:value-of select="position()"/></td>
                        <td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
                        <td><xsl:value-of select="sitemap:lastmod"/></td>
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
                <div class="stat-label">Total URLs</div>
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th style="width: 50px;">#</th>
                    <th>URL</th>
                    <th style="width: 100px;">Priority</th>
                    <th style="width: 130px;">Change Freq</th>
                    <th style="width: 180px;">Last Modified</th>
                </tr>
            </thead>
            <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                    <tr>
                        <td style="color:#94a3b8;"><xsl:value-of select="position()"/></td>
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
                        <td><xsl:value-of select="sitemap:changefreq"/></td>
                        <td><xsl:value-of select="sitemap:lastmod"/></td>
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
