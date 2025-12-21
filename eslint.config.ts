import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// import ViteConfig from './vite.config';

export default tseslint.config(
    { ignores: ['dist'] },
    {
        files: ['resources/js/**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: { jsx: true, tsx: true },
                sourceType: 'module',
            },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            react,
            'unused-imports': unusedImports,
            import: importPlugin,
        },
        extends: [js.configs.recommended, ...tseslint.configs.recommended, react.configs.flat['recommended'], eslintPluginPrettierRecommended],
        settings: {
            // 'import/resolver': {
            //     vite: {
            //         viteConfig: ViteConfig,
            //     },
            // },
            react: {
                version: 'detect',
            },
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            // "@typescript-eslint/no-unused-var": [
            //   "error",
            //   { varsIgnorePattern: "^[A-Z_]" },
            // ],
            'react/no-unescaped-entities': 'off',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'error',
            'no-restricted-imports': ['error', 'yup'],
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'unused-imports/no-unused-imports': 'error',
            'react-refresh/only-export-components': 'off',
            'import/order': [
                'warn',
                {
                    'newlines-between': 'always',
                    groups: ['type', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'unknown', 'object'],
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                    pathGroups: [
                        {
                            pattern: 'react',
                            group: 'external',
                            position: 'before',
                        },
                        {
                            pattern: '@/**',
                            group: 'internal',
                            position: 'before',
                        },
                        {
                            pattern: '*.css',
                            group: 'object',
                            position: 'after',
                            patternOptions: {
                                matchBase: true,
                            },
                        },
                    ],
                    pathGroupsExcludedImportTypes: [],
                    warnOnUnassignedImports: true,
                },
            ],
        },
    },
);
