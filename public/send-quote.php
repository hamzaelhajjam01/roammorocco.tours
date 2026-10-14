<?php
header('Content-Type: application/json; charset=UTF-8');

// Allow cross-origin requests if needed
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

// Read raw JSON or form-encoded POST
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    $data = $_POST;
}

// Helper sanitizer
function clean($str) {
    return htmlspecialchars(trim($str ?? ''), ENT_QUOTES, 'UTF-8');
}

$name       = clean($data['name'] ?? $data['fullName'] ?? $data['clientName'] ?? 'Traveler');
$email      = filter_var(trim($data['email'] ?? $data['emailAddress'] ?? $data['clientEmail'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone      = clean($data['phone'] ?? $data['phoneWhatsApp'] ?? $data['clientPhone'] ?? 'Not provided');
$service    = clean($data['service'] ?? $data['serviceType'] ?? $data['tourName'] ?? $data['destination'] ?? 'Custom Morocco Inquiry');
$pickup     = clean($data['pickup'] ?? $data['pickupLocation'] ?? $data['destination'] ?? 'Not specified');
$date       = clean($data['date'] ?? $data['travelDates'] ?? $data['startDate'] ?? 'Flexible / Pending');
$duration   = clean($data['duration'] ?? $data['durationDays'] ?? '');
$passengers = clean($data['passengers'] ?? $data['groupSize'] ?? $data['guests'] ?? 'Not specified');
$vehicle    = clean($data['vehicle'] ?? $data['vehicleClass'] ?? $data['style'] ?? '');
$notes      = clean($data['notes'] ?? $data['specialNotes'] ?? 'None');
$source     = clean($data['source'] ?? $data['page'] ?? ($_SERVER['HTTP_REFERER'] ?? 'roammorocco.tours'));

// Ensure clean, non-empty values for Google Sheets & operations
if (empty($vehicle) || $vehicle === 'Recommended') {
    if (strpos(strtolower($passengers), '5+') !== false || strpos(strtolower($passengers), 'minivan') !== false) {
        $vehicle = 'Private Minivan (Mercedes)';
    } else {
        $vehicle = 'Private 4x4 Toyota Prado';
    }
}
if (empty($pickup) || $pickup === 'Not specified') {
    $pickup = $service;
}

if (empty($email) && empty($phone)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Email or phone number is required"]);
    exit;
}

// Determine inquiry context & subject line
$lowerService = strtolower($service);
if (strpos($lowerService, 'driver') !== false || strpos($lowerService, 'chauffeur') !== false) {
    $badge = "Private Chauffeur Quote";
    $subject = "🚗 New Private Driver Quote: " . $name . " (" . $service . ")";
} elseif (strpos($lowerService, 'calculator') !== false || strpos($lowerService, 'estimate') !== false) {
    $badge = "Trip Cost Calculator Estimate";
    $subject = "🧭 New Trip Estimate: " . $name . " (" . ($pickup !== 'Not specified' ? $pickup : $service) . ")";
} else {
    $badge = "Signature Tour Proposal Request";
    $subject = "🐪 New Tour Inquiry: " . $name . " - " . $service;
}

// Clean phone for WhatsApp links
$cleanPhone = preg_replace('/[^0-9]/', '', $phone);
$waChatUrl  = !empty($cleanPhone) ? "https://wa.me/" . $cleanPhone : "https://wa.me/212653506441";

// Target emails: Primary operations + CC copy
$to = 'contact@roammorocco.tours, hamzaelhajjam01@gmail.com';

// HTML Email Body
$htmlBody = '
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f7f5f0; margin: 0; padding: 30px 15px; color: #1a1a1a; }
    .card { max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e0d8; border-top: 5px solid #C8A45C; border-radius: 4px; box-shadow: 0 4px 16px rgba(0,0,0,0.06); overflow: hidden; }
    .header { background: #111111; color: #ffffff; padding: 24px 30px; text-align: left; }
    .header h2 { margin: 0 0 4px; font-size: 20px; font-weight: 700; color: #C8A45C; letter-spacing: 0.05em; text-transform: uppercase; }
    .header p { margin: 0; font-size: 13px; color: #bbbbbb; text-transform: uppercase; letter-spacing: 0.04em; }
    .content { padding: 30px; }
    .intro { font-size: 15px; line-height: 1.6; margin-bottom: 24px; color: #333333; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    th, td { padding: 12px 14px; text-align: left; font-size: 14px; border-bottom: 1px solid #f0ece3; }
    th { width: 35%; color: #666666; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.06em; background: #faf8f5; vertical-align: top; }
    td { color: #111111; font-weight: 500; }
    .notes-box { background: #faf8f5; border-left: 3px solid #C8A45C; padding: 16px; margin: 20px 0; font-size: 14px; line-height: 1.6; color: #444444; }
    .actions { text-align: center; margin: 30px 0 10px; display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; }
    .btn-reply { display: inline-block; background: #111111; color: #ffffff !important; padding: 14px 24px; text-decoration: none; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; border-radius: 3px; }
    .btn-wa { display: inline-block; background: #25D366; color: #ffffff !important; padding: 14px 24px; text-decoration: none; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; border-radius: 3px; }
    .footer { background: #faf8f5; border-top: 1px solid #f0ece3; padding: 16px 30px; text-align: center; font-size: 12px; color: #888888; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h2>Roam Morocco Tours</h2>
      <p>' . htmlspecialchars($badge) . '</p>
    </div>
    <div class="content">
      <p class="intro">Salam Hamza,<br>You have received a new verified traveler inquiry from <strong>' . $name . '</strong> via roammorocco.tours.</p>
      
      <table>
        <tr><th>Customer Name</th><td>' . $name . '</td></tr>
        <tr><th>Email Address</th><td><a href="mailto:' . $email . '" style="color:#C8A45C; font-weight:700;">' . $email . '</a></td></tr>
        <tr><th>Phone / WhatsApp</th><td><a href="' . $waChatUrl . '" style="color:#25D366; font-weight:700;">' . $phone . '</a></td></tr>
        <tr><th>Tour / Service</th><td><strong>' . $service . '</strong></td></tr>
        ' . (!empty($pickup) && $pickup !== 'Not specified' && $pickup !== $service ? '<tr><th>Pickup / Route</th><td>' . $pickup . '</td></tr>' : '') . '
        <tr><th>Travel Dates</th><td>' . $date . (!empty($duration) ? ' (' . $duration . ')' : '') . '</td></tr>
        <tr><th>Guests / Pax</th><td>' . $passengers . '</td></tr>
        ' . (!empty($vehicle) && $vehicle !== 'Recommended' ? '<tr><th>Vehicle / Style</th><td>' . $vehicle . '</td></tr>' : '') . '
        <tr><th>Source Page</th><td>' . $source . '</td></tr>
      </table>

      <h4 style="margin:20px 0 8px; font-size:12px; text-transform:uppercase; letter-spacing:0.06em; color:#666;">Trip Notes &amp; Client Requests:</h4>
      <div class="notes-box">' . nl2br($notes) . '</div>

      <div class="actions">
        <a href="mailto:' . $email . '?subject=Re:%20Roam%20Morocco%20Tours%20-%20' . rawurlencode($service) . '" class="btn-reply">✉️ Reply by Email</a>
        <a href="' . $waChatUrl . '" class="btn-wa">💬 Chat on WhatsApp</a>
      </div>
    </div>
    <div class="footer">
      Received via <a href="https://roammorocco.tours/" style="color:#C8A45C;">roammorocco.tours</a> at ' . date('Y-m-d H:i:s T') . '
    </div>
  </div>
</body>
</html>
';

// Email Headers
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=UTF-8';
$headers[] = 'From: Roam Morocco Tours <contact@roammorocco.tours>';
$headers[] = 'Reply-To: ' . $name . ' <' . ($email ?: 'contact@roammorocco.tours') . '>';
$headers[] = 'Cc: hamzaelhajjam01@gmail.com';
$headers[] = 'X-Mailer: PHP/' . phpversion();

$mailSent = @mail($to, $subject, $htmlBody, implode("\r\n", $headers));

// Google Apps Script Secure Cloud Webhook
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
        'source'     => $service,
        'name'       => $name,
        'email'      => $email,
        'phone'      => $phone,
        'pickup'     => $pickup,
        'date'       => $date . (!empty($duration) ? ' (' . $duration . ')' : ''),
        'passengers' => $passengers,
        'vehicle'    => $vehicle,
        'notes'      => $notes,
        'page'       => $source,
        'timestamp'  => date('Y-m-d H:i:s')
    ];

    $ch = curl_init($googleWebhookUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($sheetPayload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_TIMEOUT, 3);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    @curl_exec($ch);
    @curl_close($ch);
}

// Response
if ($mailSent) {
    echo json_encode(["status" => "success", "message" => "Inquiry sent successfully"]);
} else {
    // Return partial/success so frontend can gracefully show confirmation
    echo json_encode(["status" => "success", "message" => "Inquiry processed", "fallback" => true]);
}
