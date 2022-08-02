/* global require, module */

var path = require('path');

module.exports = function(grunt) {
    'use strict';

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    var pkg = grunt.file.readJSON('package.json');

	var appConfig = {
		app: require('./bower.json').appPath || 'app',
		dist: 'dist'
	};

    var banner = '/*!\n' +
        ' * ====================================================\n' +
        ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
        ' * name <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
        ' * ====================================================\n' +
        ' */\n\n';

    var expose = '\nuse(\'expose-editor\');\n';

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: pkg,

	    yeoman: appConfig,

        clean: {
            last: [
	            '.tmp',
	            'dist/*.js',
	            'dist/*.css',
	            'dist/*.css.map',
                'dist/*.html',
                'dist/images/'
            ],
	        clstmp: ['.tmp']
        },

        // resolve dependence
        dependence: {
            options: {
                base: 'src',
                entrance: 'expose-editor'
            },
            merge: {
                files: [{
                    src: [
                        'src/**/*.js'
                    ],
                    dest: '.tmp/scripts/kityminder.editor.logic.js'
                }]
            }
        },

        // browser sync for dev
		browserSync: {
            bsFiles: {
                dist: 'dist/css/*.css',
                src: ['src/**', 'less/*.less']
            },
            options: {
                server: {
                    baseDir: './',
                    index: 'index.html',
                    watchTask: true
                }
            }
		},

        // concat
        concat: {
            closure: {
                options: {
                    banner: banner + '(function () {\n',
                    footer: expose + '})();'
                },
                files: {
                    'dist/editor.js': [
		                '.tmp/scripts/kityminder.editor.logic.js',
		                '.tmp/scripts/kityminder.app.annotated.js',
		                '.tmp/scripts/templates.annotated.js',
		                '.tmp/scripts/service/*.js',
		                '.tmp/scripts/filter/*.js',
                        '.tmp/scripts/dialog/**/*.js',
		                '.tmp/scripts/directive/**/*.js'
	                ]
                }
            }
        },

        uglify: {
            options: {
                banner: banner
            },
            minimize: {
                files: [{
	                src: 'dist/editor.js',
	                dest: 'dist/editor.min.js'
                }]
            }
        },

        less: {
            compile: {
                options: {
                    sourceMap: true,
	                sourceMapURL: 'kityminder.editor.css.map',
                    sourceMapFilename: 'dist/css/editor.css.map'
                },
                files: [{
                    src: ['less/editor.less','less/index.less',],
                    dest: 'dist/editor.css'
                },{
                    'dist/base.css': [
                        'bower_components/bootstrap/dist/css/bootstrap.css', 
                        'bower_components/codemirror/lib/codemirror.css',
                        'bower_components/hotbox/hotbox.css',
                        'bower_components/kityminder-core/dist/kityminder.core.css',
                        'bower_components/color-picker/dist/color-picker.css'
                    ],
                }]
            }
        },

	    cssmin: {
	        dist: {
	            files: {
	                'dist/editor.min.css': ['dist/editor.css', '*.css'],
	            }
	        }
	    },

	    ngtemplates: {
		    kityminderEditor: {
			    src: ['ui/directive/**/*.html', 'ui/dialog/**/*.html'],
			    dest: 'ui/templates.js',
			    options: {
				    htmlmin: {
					    collapseBooleanAttributes: true,
					    collapseWhitespace: true,
					    removeComments: true
				    }
			    }
		    }
	    },

	    // Automatically inject Bower components into the app
	    wiredep: {
		    dev: {
			    src: ['index.html'],
			    devDependencies: true
		    },
		    dist: {
			    src: ['dist/index.html']
		    }
	    },

	    // Copies remaining files to places other tasks can use
	    copy: {
            options: {
                processContentExclude: ['Gruntfile.js']
            },
		    dist: {
				files: [{
				    expand: true,
				    cwd: 'ui',
					src: 'images/*',
				    dest: 'dist'
			    },{
				    expand: true,
					src: ['*.js', '*.ico', '!Gruntfile.js'],
				    dest: 'dist'
			    },{
				    expand: true,
					src: 'bower_components/**',
				    dest: 'dist'
			    }]
		    },
	    },


	    // ng-annotate tries to make the code safe for minification automatically
	    // by using the Angular long form for dependency injection.
	    ngAnnotate: {
		    dist: {
			    files: [{
				    expand: true,
				    cwd: 'ui/',
				    src: '**/*.js',
				    ext: '.annotated.js',
				    extDot: 'last',
				    dest: '.tmp/scripts/'
			    }]
		    }
	    },
        processhtml: {
            dist:{
                files: {
                    'dist/index.html': 'index.html',
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            },
            dev: {
                /* files: {
                    'index.html': 'index.html'
                } */
            }
        }
    });

    // Build task(s).
	grunt.registerTask('build', ['clean:last',
		//'wiredep:dist',
        'ngtemplates', 'dependence', 'ngAnnotate', 'concat', 'uglify', 'less', 'cssmin', 'copy', 'clean:clstmp', 'processhtml', 'htmlmin']);

	grunt.registerTask('dev', ['clean:last',
        //'wiredep:dev',
        'ngtemplates', 'dependence', 'ngAnnotate', 'concat', 'uglify', 'less', 'cssmin', 'copy', 'clean:clstmp', 'browserSync', 'watch']);
};