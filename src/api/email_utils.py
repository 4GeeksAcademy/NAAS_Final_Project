import smtplib
from smtplib import SMTPException
from flask import render_template
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

import secrets


def send_password_reset_email(recipient, firstname):
    server = None  # Initialize the server variable outside the try block
    try:
        SMTP_SERVER = os.environ.get('SMTP_SERVER')
        SMTP_PORT = os.environ.get('SMTP_PORT')
        SMTP_USERNAME = os.environ.get('SMTP_USERNAME')
        SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD')

        # SMTP server configuration
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USERNAME, SMTP_PASSWORD)

        # Create the email message
        message = MIMEMultipart('alternative')
        message["Subject"] = "Instrucciones para cambiar tu contraseña en Snapify"
        message["From"] = SMTP_USERNAME
        message["To"] = recipient

        # Render HTML Template
        html_content = render_template("email_template.html", firstname=firstname)

        html_part = MIMEText(html_content, 'html')

        # Attach the HTML content
        message.attach(html_part)

        # Send the email
        server.sendmail(SMTP_USERNAME, recipient, message.as_string())
        print("Email sent successfully!")
        return "Email sent successfully!"
    
    except SMTPException as e:
        print(f"Error sending email: {e}")
        return f"Error sending email: {e}"
    except Exception as e:
        print(f"An error occurred: {e}")
        return f"An error occurred: {e}"
    finally:
        if server:
            server.quit()