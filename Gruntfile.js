(function() {
    "use strict";

    var LIVERELOAD_PORT = 35729;
    module.exports = function(grunt) {
        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            clean: {
                options: {
                    force: true
                },
                files: ['dist/*', '!dist/index_template.html'],
                contents: ['dist/*', '!dist/index_template.html'],
            },
            htmlhint: {
                templates: {
                    options: {
                        'attr-lower-case': true,
                        'attr-value-not-empty': false,
                        'tag-pair': true,
                        'tag-self-close': true,
                        'tagname-lowercase': true,
                        'id-class-value': true,
                        'id-class-unique': true,
                        'src-not-empty': true,
                        'img-alt-required': true
                    },
                    src: ['*.html', 'api/*.html', 'dist/index_template.html']
                }
            },
            jshint: {
                options: {
                    force: true,
                    //     // '-W069': false,
                    //     // '-W004': false,
                    //     // ignores: ['app.js']
                    //     // reporterOutput: './jshint.txt'
                },
                all: ['*.js', 'api/*.js', 'session/*.js'],
                gruntfile: ['Gruntfile.js']
            },
            csslint: {
                strict: {
                    options: {
                        "qualified-headings": false
                    },
                    src: ['css/custom.css', 'css/api-console.css']
                },
                laxed: {
                    options: {
                        // "zero-units": false
                        csslintrc: "lintrules.json"
                    },
                    src: ['css/*.css']
                }
            },
            htmlmin: {
                // Task
                index: { // Target
                    options: { // Target options
                        removeComments: true,
                        collapseWhitespace: true
                    },
                    files: { // Dictionary of files
                        'dist/index.html': 'dist/index.html', // 'destination': 'source'
                    }
                },
                dev: { // Another target
                    options: { // Target options
                        removeComments: true,
                        collapseWhitespace: true
                    },
                    files: [{
                        expand: true,
                        cwd: '.',
                        src: ['api/*.html', '*.html', '!index*.html'],
                        dest: 'dist'
                    }]
                }
            },
            uglify: {
                development: {
                    files: [{
                        expand: true,
                        cwd: '.',
                        src: ['js/*.js'],
                        dest: 'dist/',
                        ext: ".min.js",
                        extDot: "last"
                    }]
                },
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
            },
            cssmin: {
                minify: {
                    expand: true,
                    cwd: 'css',
                    src: ["*.css"],
                    dest: 'dist/css',
                    ext: '.min.css',
                    extDot: 'last'
                },
                concat: {
                    files: {
                        'dist/css/combined.min.css': [
                            'dist/css/jquery.jsonview.min.css',
                            'dist/css/font-awesome.min.css',
                            'dist/css/bootstrap.min.css',
                            'dist/css/api-console.min.css'
                        ]
                    }
                }
            },
            includeSource: {
                options: {
                    // Task-specific options go here.
                    templates: {
                        html: {
                            js: '<script src="{filePath}" ></script>',
                            css: '<link rel="stylesheet" type="text/css" href="{filePath}" />',
                        },
                    }
                },
                your_target: {
                    // Target-specific file lists and/or options go here.
                    files: {
                        'dist/index.html': 'dist/index_template.html'
                    }
                },
            },
            copy: {
                main: {
                    files: [
                        // includes files within path
                        {
                            expand: true,
                            cwd: '.',
                            src: ['*.js', 'manifest.json', '!Gruntfile.js'],
                            dest: 'dist/',
                            filter: 'isFile'
                        },
                        // flattens results to a single level
                        {
                            expand: true,
                            cwd: '.',
                            src: ['api/*.js', 'session/*.js', 'fonts/*', 'images/**/*'],
                            dest: 'dist',
                            filter: 'isFile'
                        },
                    ],
                },
            },
            watch: {
                options: {
                    dateFormat: function(time) {
                        grunt.log.writeln('The watch finished in ' + time + 'ms at ' + (new Date()).toString());
                        grunt.log.writeln('Waiting for more changes...');
                    },
                },
                gruntfile: {
                    files: 'Gruntfile.js',
                    tasks: ['notify:watch_gruntfile', 'jshint:gruntfile'],
                    options: {
                        spawn: false,
                        reload: true
                    },
                },
                html: {
                    files: ['*.html', 'api/*.html', 'dist/index_template.html'],
                    tasks: ['notify:watch_html', 'htmlhint'],
                    options: {
                        spawn: false,
                    },
                },
                css: {
                    files: ['css/custom.css', 'css/api-console.css'],
                    tasks: ['notify:watch_css', 'csslint:strict'],
                    options: {
                        spawn: false,
                    },
                },
                js: {
                    files: ['*.js', 'api/*.js', 'session/*.js'],
                    tasks: ['notify:watch_js', 'jshint:all'],
                    options: {
                        spawn: false,
                    },
                },
                all: {
                    options: {
                        spawn: false,
                        livereload: LIVERELOAD_PORT,
                    },
                    files: ['*.js', '!Gruntfile.js', 'api/*.js', 'session/*.js', '**/*.css', '**/*.html'],
                    tasks: ['notify:watch_all', 'htmlhint', 'csslint:strict', 'jshint:all']
                }
            },
            /**
             * Creates a standalone server.
             */
            connect: {
                server: {
                    options: {
                        // keepalive: true,
                        livereload: LIVERELOAD_PORT,
                        hostname: '*',
                        base: '.'
                    }
                }
            },
            // This is optional!
            notify_hooks: {
                options: {
                    enabled: true,
                    max_jshint_notifications: 3, // maximum number of notifications from jshint output
                    title: "Hubic API Console", // defaults to the name in package.json, or will use project directory's name
                    success: true, // whether successful grunt executions should be notified automatically
                    duration: 0.5 // the duration of notification in seconds, for `notify-send only
                }
            },
            notify: {
                clean: {
                    options: {
                        message: 'dist folder cleaned successfully...', //required
                    }
                },
                watch_gruntfile: {
                    options: {
                        message: 'Watching Gruntfile', //required
                    }
                },
                watch_html: {
                    options: {
                        message: 'Watching HTML files', //required
                    }
                },
                watch_css: {
                    options: {
                        message: 'Watching CSS files', //required
                    }
                },
                watch_js: {
                    options: {
                        message: 'Watching JS files', //required
                    }
                },
                watch_all: {
                    options: {
                        message: 'Watching All files', //required
                    }
                },
                server: {
                    options: {
                        message: 'Server is ready!'
                    }
                },
                copy: {
                    options: {
                        message: "Copied Files Successfully...!"
                    }
                },
                htmlmin: {
                    options: {
                        message: "HTML Minification Completed!"
                    }
                },
                uglify: {
                    options: {
                        message: "Uglify Completed!"
                    }
                },
                cssmin_minify: {
                    options: {
                        message: "CSS minify Completed!"
                    }
                },
                concat: {
                    options: {
                        message: "Concatenating JS files!",
                    }
                },
                includeSource: {
                    options: {
                        message: "Included source links in index.html!"
                    }
                },
                default: {
                    options: {
                        message: "Build Task Completed!"
                    }
                }
            },
            concat: {
                options: {
                    stripBanners: true,
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                        '<%= grunt.template.today("yyyy-mm-dd") %> */',
                },
                jq_ang: {
                    src: [
                        'dist/js/jquery-3.2.1.min.js',
                        'dist/js/angular.min.js'
                    ],
                    dest: 'dist/js/jq_ang.js',
                },
                vendor: {
                    src: [
                        'dist/js/*.min.js',
                        '!dist/js/angular.min.js',
                        '!dist/js/jquery-3.2.1.min.js',
                        '!dist/js/jsonview.min.js',
                        '!dist/js/prettypath.min.js'
                    ],
                    dest: 'dist/js/vendor.js',
                },
                app: {
                    src: [
                        'dist/ng-hubic.js',
                        'dist/app.js',
                        'dist/api/*.js',
                        'dist/session/*.js',
                        'dist/js/jsonview.min.js',
                        'dist/js/prettypath.min.js'
                    ],
                    dest: 'dist/js/app_logic.js',
                }
            },
            // Remove unused CSS across multiple files
            uncss: {
                dist: {
                    files: {
                        'dist/css/tidy.css': ['dist/**/*.html']
                    }
                }
            }
        });

        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-htmlhint');
        grunt.loadNpmTasks('grunt-contrib-csslint');
        grunt.loadNpmTasks('grunt-contrib-htmlmin');
        grunt.loadNpmTasks('grunt-contrib-cssmin');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-include-source');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-connect');
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-uncss');
        grunt.loadNpmTasks('grunt-notify');

        grunt.registerTask('clear', ['clean', 'notify:clean']);
        grunt.registerTask('create', ['copy', 'notify:copy']);
        grunt.registerTask('serve', ['connect:server', 'notify:server', 'watch:all']);
        grunt.registerTask('default', [
            'clear',
            'uglify', 'notify:uglify',
            'cssmin:minify', 'notify:cssmin_minify',
            'copy', 'notify:copy',
            'htmlmin:dev', 'notify:htmlmin',
            'concat', 'notify:concat',
            'includeSource', 'notify:includeSource',
            'htmlmin:index', 'notify:default'
        ]);
    };

})();
