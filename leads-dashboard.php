<?php
session_start();

// Dashboard Access Key (change anytime)
$ACCESS_KEY = 'roam2026';

// Check authentication
$isAuthenticated = false;
$providedKey = $_GET['key'] ?? $_POST['key'] ?? ($_SESSION['roam_lead_auth'] ?? '');

if ($providedKey === $ACCESS_KEY) {
    $isAuthenticated = true;
    $_SESSION['roam_lead_auth'] = $ACCESS_KEY;
}

// 1. CSV EXPORT FOR EXCEL OR GOOGLE SHEETS =IMPORTDATA()
if (isset($_GET['export']) && $_GET['export'] === 'csv') {
    if (!$isAuthenticated) {
        http_response_code(403);
        die("Access Denied: Invalid key");
    }

    $csvFile = __DIR__ . '/data/leads.csv';
    if (!file_exists($csvFile)) {
        header('Content-Type: text/plain');
        die("No leads recorded yet.");
    }

    header('Content-Type: text/csv; charset=UTF-8');
    header('Content-Disposition: attachment; filename="roammorocco_leads_' . date('Ymd_His') . '.csv"');
    header('Cache-Control: no-cache, no-store, must-revalidate');
    header('Pragma: no-cache');
    header('Expires: 0');
    readfile($csvFile);
    exit;
}

// 2. LOGIN FORM IF NOT AUTHENTICATED
if (!$isAuthenticated) {
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Roam Morocco Tours — Leads Access</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0c0c0c; color: #f4f4f4; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; }
        .login-box { background: #161616; border: 1px solid #2a2a2a; border-top: 4px solid #C8A45C; padding: 40px 32px; border-radius: 4px; width: 100%; max-width: 380px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); text-align: center; }
        h1 { font-size: 19px; text-transform: uppercase; letter-spacing: 0.08em; color: #C8A45C; margin: 0 0 8px; font-weight: 800; }
        p { font-size: 13px; color: #888; margin: 0 0 24px; }
        input[type="password"] { width: 100%; padding: 13px 14px; background: #222; border: 1px solid #333; color: #fff; font-size: 15px; margin-bottom: 16px; box-sizing: border-box; outline: none; border-radius: 2px; text-align: center; }
        input[type="password"]:focus { border-color: #C8A45C; }
        button { width: 100%; padding: 13px; background: #C8A45C; color: #000; border: none; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; cursor: pointer; border-radius: 2px; }
        button:hover { background: #dfba6d; }
      </style>
    </head>
    <body>
      <div class="login-box">
        <h1>Roam Morocco</h1>
        <p>Operations &amp; Leads Portal</p>
        <form method="POST">
          <input type="password" name="key" placeholder="Enter Access Key" autofocus required>
          <button type="submit">Unlock Dashboard &rarr;</button>
        </form>
      </div>
    </body>
    </html>
    <?php
    exit;
}

// 3. READ LEADS FROM CSV
$csvFile = __DIR__ . '/data/leads.csv';
$rows = [];
if (file_exists($csvFile)) {
    if (($handle = fopen($csvFile, 'r')) !== false) {
        $header = fgetcsv($handle);
        while (($data = fgetcsv($handle)) !== false) {
            if (!empty($data) && count($data) >= 3) {
                $rows[] = $data;
            }
        }
        fclose($handle);
    }
}
// Show newest inquiries first
$rows = array_reverse($rows);
$totalLeads = count($rows);
$todayLeads = 0;
$todayDate = date('Y-m-d');
foreach ($rows as $r) {
    if (isset($r[0]) && strpos($r[0], $todayDate) === 0) {
        $todayLeads++;
    }
}

// Current sheet import formula
$actualUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[PHP_SELF]";
$importFormula = '=IMPORTDATA("' . $actualUrl . '?export=csv&key=' . $ACCESS_KEY . '")';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Roam Morocco Tours — Live Leads Dashboard</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap">
  <style>
    * { box-sizing: border-box; }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #0f0f11; color: #e4e4e7; margin: 0; padding: 24px 20px; }
    .container { max-width: 1400px; margin: 0 auto; }
    
    /* HEADER */
    .top-bar { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 24px; border-bottom: 1px solid #27272a; padding-bottom: 20px; }
    .brand h1 { margin: 0 0 4px; font-size: 22px; font-weight: 800; color: #C8A45C; text-transform: uppercase; letter-spacing: 0.05em; }
    .brand p { margin: 0; font-size: 13px; color: #a1a1aa; }

    /* STATS */
    .stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; }
    .stat-card { background: #18181b; border: 1px solid #27272a; border-radius: 6px; padding: 18px 20px; }
    .stat-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #a1a1aa; font-weight: 700; }
    .stat-val { font-size: 28px; font-weight: 800; color: #f4f4f5; margin-top: 6px; }
    .stat-val.gold { color: #C8A45C; }

    /* ACTION BAR */
    .actions-bar { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 14px; margin-bottom: 20px; }
    .search-input { background: #18181b; border: 1px solid #27272a; color: #fff; padding: 10px 16px; border-radius: 4px; font-size: 13px; min-width: 280px; outline: none; }
    .search-input:focus { border-color: #C8A45C; }
    .btn-group { display: flex; gap: 10px; flex-wrap: wrap; }
    .btn { display: inline-flex; align-items: center; gap: 6px; padding: 10px 16px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; border-radius: 4px; text-decoration: none; cursor: pointer; border: none; transition: 0.2s ease; }
    .btn-gold { background: #C8A45C; color: #000; }
    .btn-gold:hover { background: #dfba6d; }
    .btn-dark { background: #27272a; color: #fff; }
    .btn-dark:hover { background: #3f3f46; }
    .btn-wa { background: #25D366; color: #000; font-weight: 800; padding: 6px 12px; font-size: 11px; border-radius: 3px; }
    .btn-wa:hover { background: #20BA59; }

    /* GOOGLE SHEETS BOX */
    .sheet-sync-banner { background: #18181b; border: 1px solid #3f3f46; border-left: 4px solid #C8A45C; padding: 16px 20px; margin-bottom: 24px; border-radius: 4px; font-size: 13px; line-height: 1.6; }
    .sheet-sync-banner strong { color: #C8A45C; }
    .formula-code { background: #09090b; padding: 8px 12px; border-radius: 3px; font-family: monospace; color: #22c55e; border: 1px solid #27272a; display: inline-block; margin-top: 6px; user-select: all; font-size: 12px; }

    /* TABLE */
    .table-box { background: #18181b; border: 1px solid #27272a; border-radius: 6px; overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; text-align: left; font-size: 13px; }
    th { background: #121214; color: #a1a1aa; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 0.06em; padding: 14px 16px; border-bottom: 1px solid #27272a; white-space: nowrap; }
    td { padding: 14px 16px; border-bottom: 1px solid #27272a; vertical-align: top; color: #d4d4d8; }
    tr:hover td { background: #202024; }
    .badge-tour { display: inline-block; padding: 4px 8px; background: rgba(200, 164, 92, 0.15); color: #C8A45C; border: 1px solid rgba(200, 164, 92, 0.3); border-radius: 3px; font-size: 11px; font-weight: 700; }
    .notes-snippet { max-width: 260px; font-size: 12px; color: #a1a1aa; line-height: 1.4; word-break: break-word; }
    .customer-name { font-weight: 700; color: #fff; font-size: 14px; }
    .link-email { color: #C8A45C; text-decoration: none; }
    .link-email:hover { text-decoration: underline; }
    .time-stamp { font-size: 11px; color: #71717a; white-space: nowrap; }

    @media (max-width: 768px) {
      body { padding: 14px 10px; }
      .actions-bar { flex-direction: column; align-items: stretch; }
      .search-input { min-width: 100%; }
      .btn-group { justify-content: stretch; }
      .btn-group .btn { flex: 1; justify-content: center; }
    }
  </style>
</head>
<body>

  <div class="container">

    <!-- TOP BAR -->
    <div class="top-bar">
      <div class="brand">
        <h1>Roam Morocco Tours</h1>
        <p>Live Inquiry &amp; Lead Management Desk</p>
      </div>
      <div class="btn-group">
        <a href="?export=csv&key=<?= urlencode($ACCESS_KEY) ?>" class="btn btn-gold">📥 Export Excel / CSV</a>
        <a href="?key=<?= urlencode($ACCESS_KEY) ?>" class="btn btn-dark">🔄 Refresh</a>
      </div>
    </div>

    <!-- STATS -->
    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-label">Total Inquiries Received</div>
        <div class="stat-val gold"><?= $totalLeads ?></div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Today's Inquiries</div>
        <div class="stat-val"><?= $todayLeads ?></div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Database Storage Status</div>
        <div class="stat-val" style="font-size: 18px; color: #22c55e;">● Live &amp; Recording</div>
      </div>
    </div>

    <!-- 1-CLICK GOOGLE SHEETS LIVE SYNC BANNER -->
    <div class="sheet-sync-banner">
      <strong>📊 Want this live in Google Sheets? (Instant 1-Click Sync)</strong><br>
      You don't need any complex apps or scripts. Open a blank Google Sheet at <a href="https://sheets.google.com" target="_blank" rel="noopener" style="color:#C8A45C; text-decoration:underline;">sheets.google.com</a>, click cell <strong>A1</strong>, and paste this exact formula:<br>
      <div class="formula-code"><?= htmlspecialchars($importFormula) ?></div><br>
      <span style="font-size:12px; color:#a1a1aa;">Google Sheets will automatically fetch and sync all your website inquiries into your spreadsheet!</span>
    </div>

    <!-- ACTION / SEARCH BAR -->
    <div class="actions-bar">
      <input type="text" id="searchInput" class="search-input" placeholder="🔍 Search leads by name, email, tour, or phone...">
      <div style="font-size:12px; color:#71717a;">Showing <?= $totalLeads ?> inquiries (newest first)</div>
    </div>

    <!-- TABLE -->
    <div class="table-box">
      <table id="leadsTable">
        <thead>
          <tr>
            <th>Date &amp; Time</th>
            <th>Tour / Source</th>
            <th>Traveler Name</th>
            <th>Email</th>
            <th>Phone / WhatsApp</th>
            <th>Travel Dates</th>
            <th>Guests</th>
            <th>Special Requests / Notes</th>
          </tr>
        </thead>
        <tbody>
          <?php if (empty($rows)): ?>
            <tr>
              <td colspan="8" style="text-align: center; padding: 40px; color: #71717a;">
                No inquiries recorded yet. Once a traveler submits any form, their details will appear here instantly.
              </td>
            </tr>
          <?php else: ?>
            <?php foreach ($rows as $lead): 
              $time   = htmlspecialchars($lead[0] ?? '');
              $source = htmlspecialchars($lead[1] ?? '');
              $cName  = htmlspecialchars($lead[2] ?? '');
              $cEmail = htmlspecialchars($lead[3] ?? '');
              $cPhone = htmlspecialchars($lead[4] ?? '');
              $cPickup= htmlspecialchars($lead[5] ?? '');
              $cDates = htmlspecialchars($lead[6] ?? '');
              $cGuests= htmlspecialchars($lead[7] ?? '');
              $cNotes = htmlspecialchars($lead[9] ?? '');

              $cleanNum = preg_replace('/[^0-9]/', '', $cPhone);
              $waLink   = !empty($cleanNum) ? 'https://wa.me/' . $cleanNum : 'https://wa.me/212653506441';
            ?>
              <tr>
                <td class="time-stamp"><?= $time ?></td>
                <td><span class="badge-tour"><?= $source ?></span></td>
                <td><div class="customer-name"><?= $cName ?></div></td>
                <td><a href="mailto:<?= $cEmail ?>" class="link-email"><?= $cEmail ?></a></td>
                <td>
                  <a href="<?= $waLink ?>" target="_blank" rel="noopener" class="btn btn-wa">💬 <?= $cPhone ?: 'Chat' ?></a>
                </td>
                <td><?= $cDates ?></td>
                <td><?= $cGuests ?></td>
                <td><div class="notes-snippet"><?= nl2br($cNotes) ?></div></td>
              </tr>
            <?php endforeach; ?>
          <?php endif; ?>
        </tbody>
      </table>
    </div>

  </div>

  <script>
    // Live Search Filter
    const searchInput = document.getElementById('searchInput');
    const table = document.getElementById('leadsTable');
    if (searchInput && table) {
      searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(tr => {
          const text = tr.innerText.toLowerCase();
          tr.style.display = text.includes(query) ? '' : 'none';
        });
      });
    }
  </script>

</body>
</html>
