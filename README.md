# Advanced CAPTCHA Creator

![Advanced CAPTCHA Creator](https://cdn.glitch.global/97aea4ce-e885-44cf-bf9e-8bfbe63343b6/banner.jpg?v=1729336716703)

## 🚀 Introduction

Welcome to the Advanced CAPTCHA Creator! This powerful and flexible CAPTCHA service is designed to enhance the security of your web applications by providing a robust challenge-response system to distinguish between human users and automated bots.

## ✨ Features

- **Multiple CAPTCHA Types**: Text, Math, Image, and Audio
- **Customizable Appearance**: Adjust colors, distortion levels, and noise
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Easy Integration**: Simple embed code for quick implementation
- **Accessibility**: Audio CAPTCHA option for visually impaired users

## 🛠 Setup

1. Clone this repository:
   ```
   git clone https://github.com/lordofsunshine/advanced-captcha-creator.git
   ```

2. For Audio CAPTCHA functionality:
   - Register at [https://voicerss.org/personel/](https://voicerss.org/personel/)
   - Verify your email
   - Obtain your API token
   - Insert your API token in:
     - `embed.js` (line 93)
     - `captcha.js` (line 97)

## 🔒 Security Features

Our Advanced CAPTCHA Creator is built with security in mind:

- **Case-Sensitive Validation**: Ensures precise user input matching
- **Dynamic CAPTCHA Generation**: New CAPTCHA for each attempt, preventing reuse
- **Server-Side Validation**: Protects against client-side manipulation
- **Rate Limiting**: Prevents brute-force attacks
- **IP Tracking**: Monitors and blocks suspicious activity

## 🔧 Customization

Tailor the CAPTCHA to your needs:

- Adjust text length and complexity
- Modify distortion and noise levels
- Choose from various image categories
- Set math problem difficulty

## 📚 Usage

Embed the CAPTCHA in your HTML:

```html
<div id="customCaptcha" data-config="your-encoded-config-here"></div>
<script src="embed.js"></script>
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [VoiceRSS](https://www.voicerss.org/) for providing the text-to-speech API used in our Audio CAPTCHA

---

Built with ❤️ by lordofsunshine
