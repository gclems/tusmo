import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import ReactDOMServer from 'react-dom/server';

import { PageLayout } from './layouts/page-layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

import '../css/app.css';
import '../css/shanty-ui/themes/default.css';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => (title ? `${title} - ${appName}` : appName),
        // resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
        resolve: (name) => {
            const pages = import.meta.glob('./pages/**/*.tsx', { eager: true });
            const page = pages[`./pages/${name}.tsx`];

            if (!page) throw new Error(`Page not found: ${name}`);

            page.default.layout ??= (page) => <PageLayout>{page}</PageLayout>;

            return page.default;
        },
        setup: ({ App, props }) => <App {...props} />,
    }),
);
