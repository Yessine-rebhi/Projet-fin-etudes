import React from 'react'
import { Admin, Resource } from 'react-admin'
import ResponsableList from './components/ResponsableList'
import ResponsableCreate from './components/ResponsableCreate'
import ResponsableEdit from './components/ResponsableEdit'
import dataProvider from './dataProvider';
import MyLoginPage  from '../src/components/AdminLogin/Login';




function App() {
  return (
    <Admin title="responsables" loginPage={MyLoginPage} dataProvider={dataProvider} >
      <Resource
        name='responsables'
        list={ResponsableList}
        create={ResponsableCreate}
        edit={ResponsableEdit}
      />
     
    </Admin>
  )
}

export default App
