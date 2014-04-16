var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	less = require('gulp-less'),
	sass = require('gulp-sass'),
	clean = require('gulp-clean'),
	concat = require('gulp-concat'),
	prefix = require('gulp-autoprefixer'),
	pkg = require('./package.json'),
	config = require('./spinner-config.json'),
	processSpins = [],
	destinations = {
		build: "build/"
	},
	gatherSrc = function (spins, path, ext) {
		for (var spin in spins ) {
			if (typeof(spins[spin]) === 'object' && Object.keys(spins[spin]).length > 0) {
				var newPath = (path === undefined) ? spin + '/' :path + spin + '/';
				gatherSrc(spins[spin], newPath, ext);
			} else if (spins[spin] === true) {
				processSpins.push('src/' + ext + '/spins/' + path + spin + '.' + ext);
			}
		}
	};
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
	processSpins = ['src/less/core.less'];
	gatherSrc(config.spins, undefined, 'less');
	return gulp.src(processSpins)
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
	processSpins = ['src/scss/core.scss'];
	gatherSrc(config.spins, undefined, 'scss');
	console.log(processSpins);
	return gulp.src(processSpins)
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