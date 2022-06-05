### Vertical Safety

Vertical Safety is a platform that allows companies and users alike to conduct regular inspections on Personal Protective Equipment (PPE), with a specialisation on fall protection. The inspection and maintenance of this equipment is critical to the life safety of workers who rely on the equipment to perform their jobs.

The app is designed to help all stakeholders meet their legal obligations per the Australian Standards, but moreover assist in the creation and maintenance of equipment registration and inspection records.

You can check out VS [here](https://vs-app.netlify.app/#/signin)

- username: rodsejas@gmail.com
- password: chicken

### Collaborators


- [Rod](https://github.com/rodsejas)
- [Dhaya](https://github.com/Dhaya94)

### Built With

- Node and Express
- Supabase (Postgres)
- React
- Chakra UI

### Dependencies

- Axios
- Chakra Theme and Icons
- Framer Motion
- Moment

**Project schema**

![Schema](https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/vs/readme/Schema.png?t=2022-05-31T13%3A22%3A03.557Z)

### Approach

The project was kicked-off with brainstorming the core features of the app, and developing the structure of the schema and the relationship (associations) between the various models.

The database was setup using supabase, the backend apis were setup in node, and express was used to manage the routing of the apis. React app was created and linked up to GET and POST data to the backend apis.

The core features involving CRUD ops for Equipment, Models, and Inspections were implemented first. Post which, user authentication (sign in and sign up) were added, followed by adding worked profile section.

Chakra UI was used to style the app to provide a clean, simple and professional look and feel to the app.

### **Features / User Guide**

- Users can [Sign In](https://vs-app.netlify.app/#/signin) from the home page, or create new account using the [sign up](https://vs-app.netlify.app/#/signup) page
- [Equipment](https://vs-app.netlify.app/#/equipments)
  - New equipment can be created with crucial data such as date of manufacture, serial number, date of first use, assigned a model type and assigned to a worker
  - The model type determines the Lifespan To and the Next inspection due date of each equipment.
  - Equipment data can be edited and the equipment record can be deleted.
  - Further the inspection records related to each equipment can be viewed
- [Models](https://vs-app.netlify.app/#/models)
  - New models can be created with the required data such as model number, manufacturer, standards, lifespan from manufacture and inspection frequency
  - Further model images and manuals can be added which will be useful for workers when they undergo training or undertake maintenance
  - Model data can be edited and the model record can be deleted
- [Inspections](https://vs-app.netlify.app/#/inspections)
  - An inspection can be created for each equipment and stores critical details related to an inspection such as inspection notes, date of inspection, status of inspection, images captured during inspection and the worker who conducted the inspection
  - If the inspection fails, the status of the equipment is set to Not suitable
  - Each inspection modifies the next inspection due date on equipment based on the inspection frequency data available on the model
- [Workers](https://vs-app.netlify.app/#/workers) - Workers page shows the list of the workers in the current organisation
- The Home page presents the next steps at a glance and talks briefly about the future updates in store

### Issues/Challenges

- Form validations are not enforced which leads to user attempting to submit an incomplete form which is rejected by the api, right now the mandatory fields are shown in the UI, but the ideal behaviour would be to prevent the submission and inform the user about the incompleteness of the data
- Achieving consistency across different screens proved challenging.

### Pages Preview

![Sign in](https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/vs/readme/vs1?t=2022-05-31T13%3A17%3A54.081Z)

![Equipment create form](https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/vs/readme/vs2?t=2022-05-31T13%3A18%3A02.756Z)

![Models overview](https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/vs/readme/vs3?t=2022-05-31T13%3A20%3A39.123Z)

![Inspections overview](https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/vs/readme/vs4?t=2022-05-31T13%3A21%3A02.726Z)

![Equipment show](https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/vs/readme/vs5?t=2022-05-31T13%3A21%3A25.861Z)

![Equipment list](https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/vs/readme/vs6?t=2022-05-31T13%3A21%3A37.715Z)

### Next Steps

- Support adding categories to equipment.
- Deletion of associated inspection records when equipment is deleted.
- Form validations.
- Consider refactoring ternary returning undefined
- Sign Up form to contain user info (name, address, photo, etc) and pass metadeta to users auth table.
  - Allow user to edit email, password, and other settings (set up user settings dashboard)
  - Create worker when user is created.
- Support creation of organisations
- Supporting file exports in standard formats (PDF, XLS).

On the UI front:

- Inline loading spinners to notify the user that their request is being processed.
- Pagination to split up tabulated content.
- Delete confirmation modals.
- Notification banners on successful actions or errors.
