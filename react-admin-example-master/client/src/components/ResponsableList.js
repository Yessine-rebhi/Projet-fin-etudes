import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  EmailField ,

} from 'react-admin'

const ResponsableList = (props) => {
  return (
    <List {...props}>
      <Datagrid  sx={{
                backgroundColor: "red",
                "& .RaDatagrid-headerCell": {
                    backgroundColor: "MistyRose",
                },
            }}>
        <TextField source='username' />
        <EmailField source='email' />
        <TextField source='password' />
        <TextField source='adress' />
        <TextField source='tel' />
        <TextField source='domaine' />
        <EditButton basePath='/responsables' />
        <DeleteButton basePath='/responsables' />

      </Datagrid>
    </List>
  )
}

export default ResponsableList
