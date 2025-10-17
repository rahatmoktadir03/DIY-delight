# WEB103 Project 4 - **Bolt Bucket**

Submitted by: **Rahat Moktadir**

About this web app: **Bolt Bucket is a custom car configuration web app that allows users to create, view, edit, and delete personalized car designs. Users can customize various features including color, roof type, and wheel options, with real-time price calculations based on their selections.**

Time spent: **5** hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->

- [x] **The web app uses React to display data from the API**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured custom_items table**
- [x] **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
- [x] **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT \* FROM custom_items;' to display your table contents.**
- [x] **The web app displays a title.**
- [x] **Website includes a visual interface that allows users to select customization options they would like to configure.**
- [x] **Each custom car has a detail page with its own unique URL.**
- [x] **Clicking on a car navigates to its corresponding detail page and displays all customization details from the `custom_items` table associated with that car.**

The following **optional** features are implemented:

- [x] An additional page shows all possible custom cars
- [x] Users can view all created cars in a grid gallery layout.
- [x] Real-time price calculation
- [x] Price updates dynamically as users select different customization options.
- [x] Edit functionality
- [x] Users can edit existing car configurations with pre-filled data.
- [x] Delete functionality with confirmation
- [x] Users can delete cars with a confirmation dialog to prevent accidental deletions.

The following **additional** features are implemented:

- [x] CRUD operations (Create, Read, Update, Delete) for custom cars
- [x] JSONB storage for flexible car feature configurations
- [x] Error handling and user feedback messages
- [x] Loading states for better UX
- [x] Styled buttons and form inputs with hover effects
- [x] Price formatting with thousands separators

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='walkthrough.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->

GIF created with LiceCap

## Notes

### Challenges Encountered:

- Fixed duplicate imports and initialization code in server.js that prevented the server from starting
- Resolved API endpoint mismatches between frontend (/api/items) and backend (/api/customcars)
- Resolved PostgreSQL connection issues by removing quotes from .env variables
- Configured SSL properly for Render.com PostgreSQL database

Copyright [2025] [Rahat Moktadir]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
