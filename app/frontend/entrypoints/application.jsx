import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import axios from 'axios';

const csrfToken = document.querySelector("meta[name=csrf-token]").content;
axios.defaults.headers.common["X-CSRF-Token"] = csrfToken;

createInertiaApp({
    resolve: name => import(`../pages/${name}.jsx`),
    setup({ el, App, props }) {
        const container = document.getElementById(el.id);
        const root = createRoot(container);
        root.render(<App {...props} />);
    },
});