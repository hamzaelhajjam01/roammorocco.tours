<?php
/**
 * Roam Morocco Tours — Instant WhatsApp Redirect & Click Email Dispatcher
 * Sends real-time email notification to agency management whenever a visitor
 * clicks or triggers any WhatsApp link across the website.
 */

// Allow cross-origin & preflight requests
header('X-Robots-Tag: noindex, nofollow, noarchive');
header('Content-Type: application/json; charset=UTF-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST' && $_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

// Read raw JSON or form-encoded POST / GET
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    $data = $_REQUEST;
}

// Helper sanitizer
function clean($str) {
    return htmlspecialchars(trim($str ?? ''), ENT_QUOTES, 'UTF-8');
}

$page       = clean($data['page'] ?? ($_SERVER['HTTP_REFERER'] ?? 'https://roammorocco.tours/'));
$title      = clean($data['title'] ?? 'Roam Morocco Tours');
$button     = clean($data['button'] ?? $data['buttonText'] ?? 'WhatsApp CTA Button');
$waUrl      = trim($data['waUrl'] ?? $data['url'] ?? 'https://wa.me/212760426269');
$message    = trim($data['message'] ?? '');
$referrer   = clean($data['referrer'] ?? 'Direct / Unknown');
$device     = clean($data['device'] ?? 'Unknown');
$lang       = clean($data['lang'] ?? 'en');

// Extract message from URL query param if not explicitly passed
if (empty($message) && !empty($waUrl)) {
    $parsed = parse_url($waUrl);
    if (!empty($parsed['query'])) {
        parse_str($parsed['query'], $query);
        if (!empty($query['text'])) {
            $message = trim($query['text']);
        }
    }
}

if (empty($message)) {
    $message = "(No pre-filled text - user initiated empty chat)";
}

// Visitor Network & Geo Details
$clientIp = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'Unknown IP';
if (strpos($clientIp, ',') !== false) {
    $parts = explode(',', $clientIp);
    $clientIp = trim($parts[0]);
}
$countryCode = clean($_SERVER['HTTP_CF_IPCOUNTRY'] ?? '');
$countryDisplay = !empty($countryCode) ? " (" . $countryCode . ")" : "";
$userAgent = clean($_SERVER['HTTP_USER_AGENT'] ?? 'Unknown Browser');
$timestamp = date('Y-m-d H:i:s T');

// Determine Subject & Context
$contextName = $title;
if (strpos($page, '/transfers/') !== false) {
    $contextName = "Transfer Inquiry";
} elseif (strpos($page, '/destination-') !== false) {
    $contextName = "Destination Tour";
} elseif (strpos($page, '/tour-') !== false || strpos($page, '/tours') !== false) {
    $contextName = "Signature Circuit";
} elseif (strpos($page, 'custom-morocco-tour') !== false) {
    $contextName = "Custom Tour Builder";
}

$subject = "🔔 WhatsApp Click Alert: " . $contextName . $countryDisplay . " [" . $device . "]";

// Recipients: Primary Management + Operations
$to = 'contact@roammorocco.tours, hamzaelhajjam01@gmail.com';

// Build High-End HTML Email
$htmlBody = '
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f7f5f0; margin: 0; padding: 25px 12px; color: #1a1a1a; }
    .card { max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e0d8; border-top: 5px solid #25D366; border-radius: 6px; box-shadow: 0 4px 16px rgba(0,0,0,0.06); overflow: hidden; }
    .header { background: #111111; color: #ffffff; padding: 22px 28px; text-align: left; }
    .header h2 { margin: 0 0 4px; font-size: 19px; font-weight: 700; color: #C8A45C; letter-spacing: 0.04em; text-transform: uppercase; }
    .header p { margin: 0; font-size: 12px; color: #25D366; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
    .content { padding: 24px 28px; }
    .intro { font-size: 14px; line-height: 1.6; margin-bottom: 20px; color: #333333; }
    .msg-box { background: #f0fdf4; border-left: 4px solid #25D366; padding: 16px; margin: 18px 0; border-radius: 0 4px 4px 0; }
    .msg-title { font-size: 11px; font-weight: 700; color: #166534; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px; }
    .msg-text { font-size: 14px; font-weight: 600; color: #14532d; line-height: 1.5; white-space: pre-wrap; }
    table { width: 100%; border-collapse: collapse; margin-top: 18px; margin-bottom: 20px; }
    th, td { padding: 10px 12px; text-align: left; font-size: 13px; border-bottom: 1px solid #f0ece3; }
    th { width: 32%; color: #666666; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; background: #faf8f5; vertical-align: top; }
    td { color: #111111; font-weight: 500; word-break: break-word; }
    .actions { text-align: center; margin: 26px 0 10px; display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; }
    .btn-wa { display: inline-block; background: #25D366; color: #ffffff !important; padding: 12px 22px; text-decoration: none; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; border-radius: 4px; }
    .btn-page { display: inline-block; background: #111111; color: #ffffff !important; padding: 12px 22px; text-decoration: none; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; border-radius: 4px; }
    .footer { background: #faf8f5; border-top: 1px solid #f0ece3; padding: 14px 28px; text-align: center; font-size: 11px; color: #888888; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h2>Roam Morocco Tours</h2>
      <p>⚡ LIVE WHATSAPP TRIGGER ALERT</p>
    </div>
    <div class="content">
      <p class="intro">
        Salam Hamza,<br>
        A website visitor just triggered a <strong>WhatsApp chat button</strong> and was redirected to your business desk (+212 760-426269).
      </p>

      <div class="msg-box">
        <div class="msg-title">💬 PRE-FILLED WHATSAPP MESSAGE (CLIENT INQUIRY):</div>
        <div class="msg-text">' . nl2br(htmlspecialchars($message)) . '</div>
      </div>

      <table>
        <tr>
          <th>Source Page</th>
          <td><a href="' . $page . '" style="color:#C8A45C; font-weight:700;">' . $page . '</a></td>
        </tr>
        <tr>
          <th>Page Title</th>
          <td>' . $title . '</td>
        </tr>
        <tr>
          <th>Button Triggered</th>
          <td><strong>' . $button . '</strong></td>
        </tr>
        <tr>
          <th>Device / Country</th>
          <td>' . $device . ' ' . $countryDisplay . ' (Lang: ' . strtoupper($lang) . ')</td>
        </tr>
        <tr>
          <th>Referrer</th>
          <td>' . $referrer . '</td>
        </tr>
        <tr>
          <th>Visitor IP</th>
          <td>' . $clientIp . '</td>
        </tr>
        <tr>
          <th>Timestamp</th>
          <td>' . $timestamp . '</td>
        </tr>
      </table>

      <div class="actions">
        <a href="' . htmlspecialchars($waUrl) . '" class="btn-wa">💬 Open WhatsApp Pre-fill</a>
        <a href="' . $page . '" class="btn-page">📍 View Visited Page</a>
      </div>
    </div>
    <div class="footer">
      Automated WhatsApp Conversion Telemetry · <a href="https://roammorocco.tours/" style="color:#C8A45C;">roammorocco.tours</a>
    </div>
  </div>
</body>
</html>
';

// Email Headers
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=UTF-8';
$headers[] = 'From: Roam Morocco Alerts <contact@roammorocco.tours>';
$headers[] = 'Reply-To: Roam Morocco Operations <contact@roammorocco.tours>';
$headers[] = 'Cc: hamzaelhajjam01@gmail.com';
$headers[] = 'X-Mailer: PHP/' . phpversion();

$mailSent = @mail($to, $subject, $htmlBody, implode("\r\n", $headers));

// Google Apps Script Cloud Webhook logging if available
$googleWebhookUrl = '';
$configPath = __DIR__ . '/webhook-config.json';
if (file_exists($configPath)) {
    $cfg = json_decode(@file_get_contents($configPath), true);
    if (!empty($cfg['google_sheet_webhook'])) {
        $googleWebhookUrl = trim($cfg['google_sheet_webhook']);
    }
}

if (!empty($googleWebhookUrl)) {
    $sheetPayload = [
        'source'     => 'WhatsApp Click Alert',
        'name'       => 'WhatsApp Lead (' . $device . ')',
        'email'      => '',
        'phone'      => '+212 760-426269 (Desk)',
        'pickup'     => $title,
        'date'       => $timestamp,
        'passengers' => '',
        'vehicle'    => $button,
        'notes'      => $message,
        'page'       => $page,
        'timestamp'  => $timestamp
    ];

    $ch = curl_init($googleWebhookUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($sheetPayload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_TIMEOUT, 2);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    @curl_exec($ch);
    @curl_close($ch);
}

echo json_encode([
    "status"   => "success",
    "message"  => "WhatsApp click tracked and alert dispatched",
    "mailSent" => (bool)$mailSent
]);
