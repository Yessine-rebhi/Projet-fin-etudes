import React from 'react'
import { Edit, SimpleForm, TextInput, EmailField ,UrlField  } from 'react-admin'
import { BooleanInput } from 'react-admin';

const ResponsableEdit = (props) => {
  return (
    <Edit title='Edit Responsable' {...props}>
      <SimpleForm>
        <EmailField source='email' />
        <TextInput source='password' />
        <TextInput source='adress' />
        <TextInput source='tel' />
        <TextInput source='domaine' />
        <UrlField disabled source='papier' />
        <BooleanInput label="actif" source="etat" />

      </SimpleForm>
    </Edit>
  )
}

export default ResponsableEdit;
