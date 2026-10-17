import os
import socket
import ftplib

server = os.environ.get('FTP_SERVER', '')
user = os.environ.get('FTP_USERNAME', '')
passwd = os.environ.get('FTP_PASSWORD', '')

live_ip = '82.197.80.225'

try:
    resolved_ip = socket.gethostbyname(server)
    print(f"FTP_SERVER resolved IP matches live web IP {live_ip}?: {resolved_ip == live_ip}")
    print(f"FTP_SERVER IP octets: {[int(x) for x in resolved_ip.split('.')]}")
except Exception as e:
    print(f"DNS error resolving FTP_SERVER: {e}")

targets = [server]
if resolved_ip != live_ip:
    targets.append(live_ip)

for target_host in targets:
    print(f"\n==========================================")
    print(f"Testing FTP connection to: {target_host}")
    print(f"==========================================")
    ftp_inst = None
    try:
        ftp_inst = ftplib.FTP_TLS(target_host, timeout=20)
        ftp_inst.login(user, passwd)
        ftp_inst.prot_p()
        print(f"SUCCESS: Connected with FTP_TLS to {target_host}")
    except Exception as e1:
        print(f"FTP_TLS failed on {target_host}: {e1}, trying plain FTP...")
        try:
            ftp_inst = ftplib.FTP(target_host, timeout=20)
            ftp_inst.login(user, passwd)
            print(f"SUCCESS: Connected with plain FTP to {target_host}")
        except Exception as e2:
            print(f"Plain FTP failed on {target_host}: {e2}")

    if ftp_inst:
        print(f"PWD: {ftp_inst.pwd()}")
        print("Root directory listing:")
        ftp_inst.dir()

        candidates = [
            '/public_html',
            '/domains/roammorocco.tours/public_html',
            'public_html',
            'domains/roammorocco.tours/public_html'
        ]
        for cand in candidates:
            try:
                ftp_inst.cwd(cand)
                print(f"\nListing for {cand} (PWD: {ftp_inst.pwd()}):")
                lines = []
                ftp_inst.retrlines('LIST', lines.append)
                for l in lines[:15]:
                    print("  ", l)
                if len(lines) > 15:
                    print(f"   ... ({len(lines)} total items)")
            except Exception as err:
                print(f"Cannot CWD to {cand}: {err}")

        ftp_inst.quit()
