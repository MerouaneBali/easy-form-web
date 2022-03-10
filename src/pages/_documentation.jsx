import React from "react";
import Code from "../components/Code";
import Tabs from "../components/Tabs";

function Documentation() {
  return (
    <div id="documentation">
      <h1>Introduction</h1>
      <p>
        Plug your Easy Forms API key in your code and recieve form submitions of
        any kind
      </p>

      <h1>Examples</h1>
      <p>
        Below you&apos;ll find some exmaples of linking your form to Easy Forms
        using your API key
      </p>
      <Tabs>
        <div label="HTML">
          <Code
            code={`<form
  action="https://www.easy-forms.com/<FORM_KEY>"
  method="post"
  target="_blank"
  onsubmit="this.reset();"
>

  <label for="first-name">First name:</label>
  <input type="text" id="first-name" name="first-name">

  <label for="last-name">Last name:</label>
  <input type="text" id="last-name" name="last-name">

  <input type="submit" value="Submit">

</form>`}
            language="html"
          />
        </div>

        <div label="Fetch">
          <Code
            code={`fetch("https://www.easy-forms.com/<FORM_KEY>", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: "John",
      lastName: "Doe",
      message: "Message goes in here...",
    }),
  })
  .then(response => {
    console.log('Success:', response.data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });`}
            language="javascript"
          />
        </div>
        <div label="AJAX">
          <Code
            code={`$.post("https://www.easy-forms.com/<FORM_KEY>",
    {
      firstName: "John",
      lastName: "Doe",
      message: "Message goes in here...",
    })
    .done(function(data, status) {
      console.log(data, status)
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown)
    });`}
            language="javascript"
          />
        </div>
        <div label="Axios">
          <Code
            code={`axios.post("https://www.easy-forms.com/<FORM_KEY>", {
      firstName: "John",
      lastName: "Doe",
      message: "Message goes in here...",
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });`}
            language="javascript"
          />
        </div>
      </Tabs>
    </div>
  );
}

export default Documentation;
