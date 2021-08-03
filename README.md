[![Contributors]][contributors-url]
[![Forks]][forks-url]
[![Stargazers]][stars-url]
[![Issues]][issues-url]
[![MIT License]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/Zennyth/CPEBot">
    <img src="https://cpe.mathis-figuet.com/img/icons/apple-touch-icon.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">MyGrades</h3>

  <p align="center">
    MyGrades is an online platform that notifies CPE's students when they received a new grade, they can also see their grades with a custom UI/UX design.
    <br />
    <a href="https://github.com/Zennyth/CPEBot"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://cpe.mathis-figuet.com/">View Demo</a>
    ·
    <a href="https://github.com/Zennyth/CPEBot/schemas">How it works</a>
    ·
    <a href="https://github.com/Zennyth/CPEBot/issues">Report Bug</a>
    ·
    <a href="https://github.com/Zennyth/CPEBot/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About MyGrades

Cpe's grades viewer doesn't provide services like notifications nor mobile friendly platform so I've decided to build one!

### Built With

This application uses :
* [BootstrapVue](https://bootstrap-vue.org/)
* [VueJS](https://vuejs.org/)
* [NodeJS](https://nodejs.org/en/)
* [MySQL](https://www.mysql.com/fr/)



<!-- GETTING STARTED -->
## Getting Started

This project contains two parts :
* /Web => Front-End
* /Api => Back-End

### Prerequisites

You just need ton install npm and mysql.
* npm
  ```sh
  npm install npm@latest -g
  ```

If you wish to use notifications get your api key for [PushOver](https://pushover.net/).
If you wish to use discord bots, get your token [here](https://discord.com/developers/applications)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Zennyth/CPEBot.git
   ```

#### Web
2. Install NPM packages
   ```sh
   cd Web
   npm install
   ```
3. Enter your URL in `/Web/helpers/axios.helper.js`
   ```JS
   baseURL:  'http://localhost:3000/api/'
   ```

#### Api
4. Install NPM packages
   ```sh
   cd Api
   npm install
   ```
5. Configure .env according to .env.example
   ```sh
   cp .env.example .env
   vim .env
   ```
   
<!-- ROADMAP -->
## Roadmap

See the [trello](https://trello.com/b/Zgu7Yjhz/mygrades) for a list of future features.



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Mathis Figuet (Zennyth)- mathis.figuet@orange.fr

Project Link: [https://github.com/Zennyth/CPEBot](https://github.com/your_username/repo_name)





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/Zennyth/CPEBot/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/Zennyth/CPEBot/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/Zennyth/CPEBot/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/Zennyth/CPEBot/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/Zennyth/CPEBot/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png