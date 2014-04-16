var gulp = require('gulp'),
	jade = require('gulp-jade'),
	connect = require('gulp-connect'),
	plumber = require('gulp-plumber'),
	watch = require('gulp-watch'),
	less = require('gulp-less'),
	sass = require('gulp-sass'),
	clean = require('gulp-clean'),
	concat = require('gulp-concat'),
	prefix = require('gulp-autoprefixer'),
	pkg = require('./package.json'),
	config = require('./spinner-config.json'),
	processSrc = [],
	sources = {
		docs: "src/jade/index.jade",
		templates: "src/jade/**/*.jade",
		less: "src/less/**/*.less"
	},
	destinations = {
		build: "build/",
		overwatch: "out/**/*.*",
		css: "out/css/"
	},
	gatherSrc = function (sources, path, ext) {
		for (var source in sources ) {
			if (typeof(sources[source]) === 'object' && Object.keys(sources[source]).length > 0) {
				var newPath = (path === undefined) ? source + '/' :path + source + '/';
				gatherSrc(sources[source], newPath, ext);
			} else if (sources[source] === true) {
				processSrc.push('src/' + ext + '/spins/' + path + source + '.' + ext);
			}
		}
	};
/***DEV TASKS***/
gulp.task('dev', ["cleanup", "serve", "jade:build", "jade:watch", "less:build", "less:watch"]);
/*SERVER*/
gulp.task('serve', function(event) {
	connect.server({
		root: destinations.build,
		port: 1987,
		livereload: true
	});
	watch({glob: 'build/**/*.*'})
		.pipe(connect.reload());
});
/*BUILD JADE*/
gulp.task('jade:build', function(event) {
	return gulp.src('src/jade/index.jade')
		.pipe(plumber())
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest(destinations.build));
});
/*WATCH JADE*/
gulp.task('jade:watch', function(event) {
	gulp.watch('src/jade/index.jade', ["jade:build"]);
});
/*WATCH LESS*/
gulp.task('less:watch', function(event) {
	watch({glob: 'src/less/**/*.less'}, function(files) {
		return gulp.src('src/less/**/*.less')
			.pipe(plumber())
			.pipe(concat(pkg.name + '.less'))
			.pipe(less())
			.pipe(prefix(['last 3 versions', 'Blackberry 10', 'Android 3', 'Android 4']))
			.pipe(gulp.dest(destinations.build));
	});
});
/*WATCH SCSS*/
gulp.task('scss:watch', function(event) {
	watch({glob: 'src/scss/**/*.scss'}, function(files) {
		return gulp.src('src/scss/**/*.scss')
			.pipe(plumber())
			.pipe(concat(pkg.name + '.scss'))
			.pipe(sass())
			.pipe(prefix(['last 3 versions', 'Blackberry 10', 'Android 3', 'Android 4']))
			.pipe(gulp.dest(destinations.build));
	});
});
/***/
/*CLEANUP*/
gulp.task('cleanup', function(event) {
	return gulp.src(destinations.build)
		.pipe(clean());
});
gulp.task('release', function(event) {
	return gulp.src(["build/**/*.css"])
		.pipe(gulp.dest(''));
});
/*RELEASE BUILD*/
gulp.task('release:build', ["less:build", "release"]);
/*BUILD LESS*/
gulp.task('less:build', function(event) {
	processSrc = ['src/less/core.less'];
	gatherSrc(config.spins, undefined, 'less');
	return gulp.src(processSrc)
		.pipe(plumber())
		.pipe(concat(pkg.name + '.less'))
		.pipe(less())
		.pipe(prefix(['last 3 versions', 'Blackberry 10', 'Android 3', 'Android 4']))
		.pipe(gulp.dest(destinations.build))
		.pipe(concat(pkg.name + '.min.less'))
		.pipe(less({
			compress: true
		}))
		.pipe(prefix(['last 3 versions', 'Blackberry 10', 'Android 3', 'Android 4']))
		.pipe(gulp.dest(destinations.build));
});
gulp.task('scss:build', function(event) {
	processSrc = ['src/scss/core.scss'];
	gatherSrc(config.spins, undefined, 'scss');
	return gulp.src(processSrc)
		.pipe(plumber())
		.pipe(concat(pkg.name + '.scss'))
		.pipe(sass())
		.pipe(prefix(['last 3 versions', 'Blackberry 10', 'Android 3', 'Android 4']))
		.pipe(gulp.dest(destinations.build))
		.pipe(concat(pkg.name + '.min.scss'))
		.pipe(sass({
			style: "compressed"
		}))
		.pipe(prefix(['last 3 versions', 'Blackberry 10', 'Android 3', 'Android 4']))
		.pipe(gulp.dest(destinations.build));
});
/*DEFAULT TASK*/
gulp.task('default', ["cleanup", "less:build"]);