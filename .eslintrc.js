module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier'
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['react', '@typescript-eslint'],
    rules: {
        // カスタムルールをここに追加
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
