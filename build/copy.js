module.exports = function (grunt) {
    const common = [
        // Top level (dist)
        ...(global.branch ? [] : [ // These will be ignored if copied to a sub-folder. So we only copy them to root to avoid confusion
            {
                expand: true,
                src: [
                    '404.html',
                    'robots.txt',
                    'sitemap.xml',
                ],
                dest: 'dist'
            },
            { expand: true, cwd: 'scripts', src: ['CNAME'], dest: 'dist' },
        ]),

        // This branch
        { expand: true, cwd:  './',                src: ['index.html'],          dest: global.dist },
        { expand: true, cwd: 'src/javascript/',    src: ['manifest.json'],       dest: global.dist },
        { expand: true, cwd: 'src/download/fonts', src: ['binary_symbols.woff'], dest: `${global.dist}/download/fonts/` },

        { expand: true, cwd: `${global.node_modules_paths.binary_style}/src/images/favicons`, src: ['favicon.ico'], dest: global.dist },

        // Serve pushwoosh SDKs
        { expand: true, cwd: 'src/javascript/_common/lib/pushwooshSDK/', src: ['**'], dest: global.dist },
    ];

    const config = {
        app: {
            files: [
                ...common,

                // app, static
                { expand: true, cwd: 'src/download/',                  src: ['**'],              dest: `${global.dist}/download/` },
                { expand: true, cwd: 'src/images/',                    src: ['**', '!app_2/**'], dest: `${global.dist}/images/` },
                { expand: true, cwd: 'src/javascript/_autogenerated/', src: ['*.js'],            dest: `${global.dist}/js/texts/` },

                // binary-style
                { expand: true, cwd: `${global.node_modules_paths.binary_style}/src/images/favicons`, src: ['**'], dest: `${global.dist}/images/favicons/` },
                { expand: true, cwd: `${global.node_modules_paths.binary_style}/src/images/logo`,     src: ['**'], dest: `${global.dist}/images/logo/` },
            ],
        },
        app_2: {
            files: [
                ...common,

                // app_2
                { expand: true, cwd: 'src/images/app_2',                     src: ['**'],   dest: `${global.dist_app_2}/images/` },
                { expand: true, cwd: 'src/javascript/_autogenerated/app_2/', src: ['*.js'], dest: `${global.dist_app_2}/js/texts/` },

                // ChartIQ dependencies
                { expand: true, cwd: `${global.node_modules_paths.smartcharts}/dist/`, src: ['chartiq.min.js'],   dest: `${global.dist_app_2}/js/` },
                { expand: true, cwd: `${global.node_modules_paths.smartcharts}/dist/`, src: ['smartcharts.css*'], dest: `${global.dist_app_2}/css/` },
            ],
        },
        get all() {
            return {
                files: [
                    ...this.app.files,
                    ...this.app_2.files,
                ],
            };
        },
    };

    return { [global.section]: config[global.section] };
};
