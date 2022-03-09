
# Easy Forms [Web App] (Beta)

Form handling API for developers who do not want build a whole back-end system for the sake of submitting and storing simple forms from their apps. [Live Demo](https://easy-forms.netlify.app/).

## Details

[Easy Forms](https://easy-forms.netlify.app/) is a service that allowes **front-end developers** to direct/connect their forms to a private **API endpoint**, and **store** the data they collect in a Easy Forms database. From there they can easly **view and manage** that data from the administration panel that the service.

![AUTHENTICATION](https://drive.google.com/uc?export=view&id=1r_2S_DvMgXUdyw3ssjRatAqdLFQFeHvJ)

🎲 **NOTE:** The project is still in BETA stage, but it will be improved over time with plans to add many features, such as: Restrict Requests to Project's Domain Name, Overview Page w/Graph, Settings, Subscription, TOS & Privacy Policy Pages...more.

![FIGMA](https://drive.google.com/uc?export=view&id=15uoGYtzyDIs8Yze81V3V2DZIKWwIIHJS)

## Usage

### 1) Create Project:
step one of using the API is to create a project that will contain all forms related to it

![projects](https://drive.google.com/uc?export=view&id=1PSHdutCAtI_R_CSOgw-F-qUf2mjkU5C2)

### 2) Create Form:

Step two would be is to create a form, and get that form's API key
![PAGES](https://drive.google.com/uc?export=view&id=1sLNBx64BYe41WMWof8Z3dmlKfgBNLwX1)

### 3) Use API Key

You can then direct your form to post it's data to the given private API endpoint


```
<form action="https://easy-forms-api.herokuapp.com/<FORM_KEY>" method="post">

    <label for="first-name">First name:</label>
    <input type="text" id="first-name" name="first-name" value="John">

    <label for="last-name">Last name:</label>
    <input type="text" id="last-name" name="last-name" value="Doe">

    <input type="submit" value="Submit">

</form>
```

### 4) Manage Data:

View and manage your data from the provided dashboard
![PAGES](https://drive.google.com/uc?export=view&id=1Ax7hh6ep7gOKTd_eGdz1T3fg8pRm3SIg)

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run lint`

Launches the linting test runner mode.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run start`

Starts the production build from the `build` folder.

### `gulp watch`

Watch for SCSS file changes and update app styles on the go

### `gulp buildStyles`

Build app's CSS styles from SCSS files

## Other Projects

Check out my portfolio website [here](https://merouane-bali.netlify.app/).
