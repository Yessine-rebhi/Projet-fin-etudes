import React from "react";
import { Create, SimpleForm, TextInput , EmailField ,UrlField } from "react-admin";

const ResponsableCreate = (props) => {
  return (
    <Create title="Create a Responsable" {...props}>
      <SimpleForm>
      <TextInput source='username' />
      <TextInput source='email' />
        <TextInput source='password' />
        <TextInput source='repeat_password' />
        <TextInput source='adress' />
        <TextInput source='tel' />
        <TextInput source='domaine' />
        <TextInput source='papier' />
        <TextInput source='etat' />
      </SimpleForm>
    </Create>
  );
};

export default ResponsableCreate;
