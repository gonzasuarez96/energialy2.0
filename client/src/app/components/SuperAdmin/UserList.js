// UserList.js
import React from 'react';
import { List, Datagrid, TextField, EmailField } from 'react-admin';

const UserList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="name" />
            <EmailField source="email" />
            {/* No agregamos la columna "id" */}
        </Datagrid>
    </List>
);

export default UserList;