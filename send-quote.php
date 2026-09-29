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

// Sanitize fields
function clean($str) {
    return htmlspecialchars(trim($str ?? ''), ENT_QUOTES, 'UTF-8');
}

$name       = clean($data['name'] ?? $data['fullName'] ?? 'Traveler');
$email      = filter_var(trim($data['email'] ?? $data['emailAddress'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone      = clean($data['phone'] ?? $data['phoneWhatsApp'] ?? 'Not provided');
$pickup     = clean($data['pickup'] ?? $data['pickupLocation'] ?? 'Not specified');
$service    = clean($data['service'] ?? $data['serviceType'] ?? 'Private Driver Inquiry');
$date       = clean($data['date'] ?? $data['startDate'] ?? 'Flexible / Pending');
$duration   = clean($data['duration'] ?? $data['durationDays'] ?? 'Flexible');
$passengers = clean($data['passengers'] ?? 'Not specified');
$vehicle    = clean($data['vehicle'] ?? $data['vehicleClass'] ?? 'Recommended');
$notes      = clean($data['notes'] ?? $data['specialNotes'] ?? 'None');

if (empty($email)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Valid email address is required"]);
    exit;
}

// Target email
$to = 'hamzaelhajjam01@gmail.com';
$subject = "🚗 New Private Driver Booking Inquiry: " . $name . " (" . $service . ")";

// HTML Email Body
$htmlBody = '
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f7f5f0; margin: 0; padding: 30px 15px; color: #1a1a1a; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e0d8; border-top: 5px solid #C8A45C; border-radius: 4px; box-shadow: 0 4px 16px rgba(0,0,0,0.06); overflow: hidden; }
    .header { background: #111111; color: #ffffff; padding: 24px 30px; text-align: left; }
    .header h2 { margin: 0 0 4px; font-size: 20px; font-weight: 700; color: #C8A45C; letter-spacing: 0.05em; text-transform: uppercase; }
    .header p { margin: 0; font-size: 13px; color: #bbbbbb; }
    .content { padding: 30px; }
    .intro { font-size: 15px; line-height: 1.6; margin-bottom: 24px; color: #333333; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    th, td { padding: 12px 14px; text-align: left; font-size: 14px; border-bottom: 1px solid #f0ece3; }
    th { width: 35%; color: #666666; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.06em; background: #faf8f5; }
    td { color: #111111; font-weight: 500; }
    .notes-box { background: #faf8f5; border-left: 3px solid #C8A45C; padding: 16px; margin: 20px 0; font-size: 14px; line-height: 1.6; color: #444444; }
    .actions { text-align: center; margin: 30px 0 10px; }
    .btn-reply { display: inline-block; background: #111111; color: #ffffff !important; padding: 14px 28px; text-decoration: none; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; border-radius: 3px; }
    .btn-wa { display: inline-block; background: #25D366; color: #ffffff !important; padding: 14px 28px; text-decoration: none; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; border-radius: 3px; margin-left: 10px; }
    .footer { background: #faf8f5; border-top: 1px solid #f0ece3; padding: 16px 30px; text-align: center; font-size: 12px; color: #888888; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h2>Roam Morocco Tours</h2>
      <p>New Private Driver & Chauffeur Quote Request</p>
    </div>
    <div class="content">
      <p class="intro">Salam Hamza,<br>You have received a new private driver booking request from <strong>' . $name . '</strong> via roammorocco.tours.</p>
      
      <table>
        <tr><th>Customer Name</th><td>' . $name . '</td></tr>
        <tr><th>Email Address</th><td><a href="mailto:' . $email . '" style="color:#C8A45C; font-weight:700;">' . $email . '</a></td></tr>
        <tr><th>Phone / WhatsApp</th><td><a href="https://wa.me/' . preg_replace('/[^0-9]/', '', $phone) . '" style="color:#25D366; font-weight:700;">' . $phone . '</a></td></tr>
        <tr><th>Pickup Location</th><td>' . $pickup . '</td></tr>
        <tr><th>Route / Service</th><td>' . $service . '</td></tr>
        <tr><th>Travel Date</th><td>' . $date . '</td></tr>
        <tr><th>Duration</th><td>' . $duration . '</td></tr>
        <tr><th>Passengers</th><td>' . $passengers . '</td></tr>
        <tr><th>Vehicle Preference</th><td>' . $vehicle . '</td></tr>
      </table>

      <h4 style="margin:20px 0 8px; font-size:13px; text-transform:uppercase; letter-spacing:0.06em; color:#666;">Trip Notes & Special Requests:</h4>
      <div class="notes-box">' . nl2br($notes) . '</div>

      <div class="actions">
        <a href="mailto:' . $email . '?subject=Roam%20Morocco%20Tours%20-%20Private%20Driver%20Quote" class="btn-reply">✉️ Reply to ' . $name . '</a>
        <a href="https://wa.me/' . preg_replace('/[^0-9]/', '', $phone) . '" class="btn-wa">💬 Chat on WhatsApp</a>
      </div>
    </div>
    <div class="footer">
      This inquiry was submitted from <a href="https://roammorocco.tours/morocco-private-driver.html" style="color:#C8A45C;">roammorocco.tours</a> at ' . date('Y-m-d H:i:s T') . '
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
$headers[] = 'Reply-To: ' . $name . ' <' . $email . '>';
$headers[] = 'X-Mailer: PHP/' . phpversion();

$mailSent = @mail($to, $subject, $htmlBody, implode("\r\n", $headers));

if ($mailSent) {
    echo json_encode(["status" => "success", "message" => "Inquiry sent successfully"]);
} else {
    // If local sendmail returned false, report failure
    echo json_encode(["status" => "partial", "message" => "Request processed", "mail" => false]);
}
