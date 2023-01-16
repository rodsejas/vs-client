<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/vs/readme/logo_blue.png" alt="Logo" width="60" height="100">
  </a>

  <h3 align="center">Vertical Safety</h3>

  <p align="center">
    A powerful cloud-based platform to manage your assets and equipment efficiently.
    <br />
    <a href="https://vs-app.netlify.app">View Live Demo</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
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
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Vertical Safety is a platform that allows companies and users to conduct regular inspections on Personal Protective Equipment (PPE), with a specialisation on fall protection. The inspection and maintenance of this equipment is critical to the life safety of workers who rely on the equipment to perform their jobs.

This application is designed to assist in the creation and maintenance of equipment registration and inspection records, aiding users in meeting their legal obligations per the Australian Standards (AS/NZS 1891).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- [![React][react.js]][react-url]
- [![Chakra UI][chakra]][chakra-url]
- [![Express.js][express]][express-url]
- [![Supabase][supabase]][supabase]

- Postgres
- Axios
- React Router
- Moment.js

<!-- PROJECT PLANNING -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Approach

The project was kicked-off with brainstorming the core features of the app, developing user stories and basic wireframes. The final step in the planning process was developing the schema tables and associations between them.

### Schema

![Schema](https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/vs/readme/Schema.png?t=2022-05-31T13%3A22%3A03.557Z)

<!-- USAGE EXAMPLES -->

## Usage

- Users can [Sign In](https://vs-app.netlify.app/#/signin) from the home page, or create new account using the [sign up](https://vs-app.netlify.app/#/signup) page
  ![Sign in](https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/vs/readme/vs1?t=2022-05-31T13%3A17%3A54.081Z)

- [Equipment](https://vs-app.netlify.app/#/equipments)
  - New equipment can be created with data such as date of manufacture, serial number, date of first use, assigned model type and worker assignment.
  - The model type determines the _Lifespan To_ and the _Next Inspection_ due date of each equipment.
  - Equipment data can be edited and the equipment record can be archived.
  - Inspection records for each equipment is viewable in a table.

![Equipment create form](https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/vs/readme/vs2?t=2022-05-31T13%3A18%3A02.756Z)

![Equipment list](https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/vs/readme/vs6?t=2022-05-31T13%3A21%3A37.715Z)

![Equipment show](https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/vs/readme/vs5?t=2022-05-31T13%3A21%3A25.861Z)

- [Models](https://vs-app.netlify.app/#/models)
  - New models can be created with the required data such as model number, manufacturer, standards, lifespan from manufacture and inspection frequency.
  - Further model images and manuals can be added which will be useful for workers when they undergo training or undertake maintenance.
  - Model data can be edited and the model record can be deleted.

![Models overview](https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/vs/readme/vs3?t=2022-05-31T13%3A20%3A39.123Z)

- [Inspections](https://vs-app.netlify.app/#/inspections)
  - An inspection can be created for each equipment and stores critical details related to an inspection such as inspection notes, date of inspection, status of inspection, images captured during inspection and the worker who conducted the inspection.
  - If the inspection fails, the status of the equipment is set to _Not Suitable_.
  - Each inspection modifies the next inspection due date on equipment based on the inspection frequency data available on the model.

![Inspections overview](https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/vs/readme/vs4?t=2022-05-31T13%3A21%3A02.726Z)

- [Workers](https://vs-app.netlify.app/#/workers) - Workers page shows the list of the workers in the current organisation.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [ ] Add support for category assignment to equipment.
- [ ] Add user metadata capture on sign up.
- [ ] Add support for row-level security in database.
- [ ] Add support for emailed weekly summary report.
- [ ] File export support to PDF and XLS.

See the [open issues](https://github.com/rodsejas/vs-client/issues) for a full list of proposed features and known issues.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Rod S. - [LinkedIn](https://www.linkedin.com/in/rodsejas/)

Dhaya S. - [Github](https://github.com/Dhaya94)

Project Link: [https://github.com/rodsejas/vs-client](https://github.com/rodsejas/vs-client)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/rodsejas/
[product-screenshot]: images/screenshot.png
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[postgresql]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[supabase]: https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white
[chakra]: https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white
[chakra-url]: https://chakra-ui.com/
[express]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[express-url]: https://expressjs.com/
