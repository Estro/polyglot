module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            src: ["public/css", "public/js"]
        },
        jshint: {
            files: ['gruntfile.js', 'build/js/src/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        // JS concatenation
        concat: {
            options: {},
            dist: {
                src: ['build/js/lib/*.js', 'build/js/src/*.js'],
                dest: 'public/js/<%= pkg.name %>.js'
            }
        },
        // JS minification
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'public/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        copy: {
            dist {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: '<%= project.path.bower %>',
                    dest: '<%= project.path.dist %>/js/vendor',
                    src: [
                        'es5-shim/es5-shim.js',
                        'json3/lib/json3.js',
                        'modernizr/modernizr.js'
                    ]
                }, {
                    expand: true,
                    cwd: '<%= project.path.client %>',
                    dest: '<%= project.path.dist %>',
                    src: [
                        '../<%= project.path.bower %>/**/*',
                        'fonts/**/*'
                    ]
                }, {
                    expand: true,
                    cwd: '<%= project.path.client %>',
                    dest: '<%= project.path.dist %>',
                    src: [
                        '*.html'
                    ]
                }]
            }
        },
        compass: {
            dev: {
                options: {
                    config: 'config.rb'
                }
            },
            dist: {
                options: {
                    environment: 'production',
                    config: 'config.rb'
                }
            }
        },
        ngtemplates: {
            app: {
                src: ['build/partials/**.html', 'build/partials/**/*.html'],
                dest: 'public/js/templates.js'
            }
        },

        // Watch command
        watch: {
            files: ['<%= jshint.files %>', 'build/scss/*.scss', 'build/scss/defaults/*.scss', 'build/scss/elements/*.scss', 'build/scss/partials/*.scss'],
            tasks: ['dev']
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('dev', ['jshint', 'concat', 'compass:dev', 'ngtemplates']);
    grunt.registerTask('default', ['clean', 'jshint', 'concat', 'uglify', 'compass:dist']);

};