// CustomLayout.js
import React from 'react';
import { Layout } from 'react-admin';
import MyAppBar from './MyAppBar';

const CustomLayout = (props) => <Layout {...props} appBar={MyAppBar} />;

export default CustomLayout;