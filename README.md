# 🔐 TOTP QR Code Generator

A web-based Time-based One-Time Password (TOTP) QR code generator that creates scannable QR codes for two-factor authentication setup.

## 📋 Overview

This is a client-side web application that generates QR codes for TOTP authentication. It allows users to input their TOTP secret keys and create QR codes that can be scanned by authenticator apps like Google Authenticator, Authy, or Microsoft Authenticator.

## ✨ Features

- **📱 QR Code Generation**: Creates scannable QR codes from TOTP secrets
- **✅ Base32 Validation**: Validates TOTP secret format (Base32 encoding)
- **🏷️ Customizable Labels**: Set custom account names and issuer information
- **⌨️ Manual Entry Support**: Displays the secret key for manual entry in authenticator apps
- **🔗 URI Display**: Shows the complete otpauth:// URI for debugging or manual use
- **📱 Responsive Design**: Modern, responsive UI with animated elements
- **🔒 Client-Side Only**: No data is sent to any server - all processing happens in the browser
- **📋 Copy Functionality**: Click any code element to copy to clipboard

## 🚀 Usage

1. **🌐 Open the Application**: Open `index.html` in a web browser
2. **🔑 Enter TOTP Secret**: Input your Base32-encoded TOTP secret key
3. **👤 Set Account Details** (optional):
   - Account Name: Usually your email or username
   - Issuer: The service or application name
4. **⚡ Generate QR Code**: Click the "Generate QR Code" button
5. **📱 Scan with Authenticator**: Use your authenticator app to scan the generated QR code

## 📝 Input Requirements

- **🔑 TOTP Secret**: Required - Must be a valid Base32 string (characters A-Z, 2-7)
- **👤 Account Name**: Optional - Defaults to "user@example.com"
- **🏢 Issuer**: Optional - Defaults to "MyApp"

## ⚙️ Technical Details

- **📦 QR Code Library**: Uses qrcode-generator library (v1.4.4)
- **🔗 URI Format**: Generates standard `otpauth://totp/` URIs
- **💻 Client-Side**: Pure HTML/CSS/JavaScript - no backend required
- **🌐 Browser Compatibility**: Works in all modern browsers

## 🔐 Security Note

This application runs entirely in your browser and does not transmit any data to external servers. Your TOTP secrets remain private and are only used to generate the QR code locally.

## 📁 Files

- `index.html` - Complete web application (HTML, CSS, and JavaScript)
- `README.md` - This documentation
- `LICENSE` - License information

## 🏁 Getting Started

Simply download the files and open `index.html` in any modern web browser. No installation or setup required.
