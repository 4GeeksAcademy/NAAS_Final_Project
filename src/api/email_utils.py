import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import secrets

SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587
SMTP_USERNAME = 'snapify.adm.mail@gmail.com'
SMTP_PASSWORD = 'xylp xcej aekn gwxz'

def send_password_reset_email(user_email, reset_link):
    sender_email = 'snapify.adm.mail@gmail.com'
    receiver_email = user_email

    subject = 'Password Reset'
    body = f'Click the following link to reset your password: {reset_link}'

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = subject

    msg.attach(MIMEText(body, 'plain'))

    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        server.sendmail(sender_email, receiver_email, msg.as_string())

def generate_reset_link():
    return secrets.token_urlsafe(32)
