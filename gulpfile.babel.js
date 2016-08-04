import "babel-register";
import gulp from "gulp";
import del from "del";
import path from "path";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";

import babelify from "babelify";
import browserify from "browserify";
import watchify from "watchify";
import uglify from "gulp-uglify";

import lessCompile from "gulp-less";
import minifyCss from "gulp-clean-css";
import LessPluginAutoprefix from "less-plugin-autoprefix";

import sourcemaps from "gulp-sourcemaps";
import gzip from "gulp-gzip";

import notifier from "node-notifier";
import notify from "gulp-notify";

var autoprefix = new LessPluginAutoprefix({browsers: ['last 2 versions']});
var dirnameRegExp = new RegExp(__dirname + '/', 'g');

const setting = {
	js :{
		srcDir : 'src/js',
		distDir: 'dist/js',
		targets: [
			'background',
			'tab_script',
			'content_script'
		]
	},
	css: {
		srcDir: 'src/css',
		distDir: 'dist/css',
		targets: [
			'main'
		]
	}
};

// JS setting start

var getBrowserifyStream = (entries) => {
	var browserifyOption = {
		entries: [entries],
		transform: babelify.configure({ presets: ['es2015', 'react'] }),
		debug: true,
		cache: {},
		packageCache: {},
		fullPath: true
	};

	return browserify(browserifyOption);
};

var execBundle = (stream, distDir, filename, enableNotify = false) => {
	var _stream = stream.bundle()
		.on('error', function (e) {
			console.log(e.message.replace(dirnameRegExp, ''));
			console.log(e.codeFrame);
			notifier.notify({
				title : 'Error : ' + path.basename(e.filename) + ' ' + e.loc.line + ':' + e.loc.column,
				message : e.filename.replace(dirnameRegExp, ''),
				icon: 'node_modules/gulp-notify/assets/gulp-error.png'
			}, function (err) {
				console.log(err);
			});
			this.emit('end');
		})
		.pipe(source(filename))
		.pipe(gulp.dest(distDir));

	if(enableNotify){
		_stream
			.pipe(notify( filename + ' is compiled !'));
	}
	return _stream;
};

var startWatchify = () => {
	setting.js.targets.forEach((target) => {
		let filename = target + '.js';
		let entryPoint = [setting.js.srcDir, target, filename].join('/');
		let watchifyStream = watchify(getBrowserifyStream(entryPoint));

		let _execBundle = execBundle.bind(undefined, watchifyStream, setting.js.distDir, filename, true);
		watchifyStream.on('update', _execBundle);

		return _execBundle();
	});
};

gulp.task('watchJs', startWatchify);

gulp.task('cleanJs', (callback) => {
	return del([
		setting.js.distDir + '/**/*'
	], callback);
});

gulp.task('apply-prod-environment', () => {
    process.env.NODE_ENV = 'production';
});

gulp.task('buildJs', ['cleanJs', 'apply-prod-environment'], () => {
	setting.js.targets.forEach((target) => {
		let filename = target + '.js';
		let entryPoint = [setting.js.srcDir, target, filename].join('/');
		return getBrowserifyStream(entryPoint)
			.bundle()
			.pipe(source(filename))
			.pipe(buffer())
			.pipe(uglify())
			.pipe(gulp.dest(setting.js.distDir))
			.pipe(gzip())
			.pipe(gulp.dest(setting.js.distDir))
			.pipe(notify( filename + ' build is compiled !'));
	});
});

//js setting end

//css setting start
gulp.task('cleanCss', (callback) => {
	return del([
		setting.css.distDir + '/**/*'
	], callback);
});

gulp.task('less', function () {
	setting.css.targets.forEach((target) => {
		let filename = target + '.less';
		return gulp.src([setting.css.srcDir, target, filename].join('/'))
			.pipe(sourcemaps.init())
			.pipe(
				lessCompile({
					plugins: [autoprefix],
					paths: [setting.css.srcDir]
				})
				.on('error', (e) => {
					console.log(e.message.replace(dirnameRegExp, ''));
					console.log(e.extract.join('\n'));
					notifier.notify({
						title : 'Error : ' + path.basename(e.fileName) + ' ' + e.line + ':' + e.column,
						message : e.fileName.replace(dirnameRegExp, ''),
						icon: 'node_modules/gulp-notify/assets/gulp-error.png'
					}, function (err) {
						console.log(err);
					});
					this.emit('end');
				})
			)
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(setting.css.distDir))
			.pipe(notify( filename + ' is compiled !'));
			
	});
});

gulp.task('buildCss', ['cleanCss'], () => {
	setting.css.targets.forEach((target) => {
		let filename = target + '.less';
		return gulp.src([setting.css.srcDir, target, filename].join('/'))
			.pipe(sourcemaps.init())
			.pipe(
				lessCompile({
					plugins: [autoprefix],
					paths: [setting.css.srcDir]
				})
			)
			.pipe(minifyCss())
			.pipe(gulp.dest(setting.css.distDir))
			.pipe(gzip())
			.pipe(gulp.dest(setting.css.distDir))
			.pipe(notify( filename + ' build is compiled !'));
	});

});

gulp.task('default', ['cleanJs', 'watchJs', 'cleanCss', 'less'], () =>{
	gulp.watch([setting.css.srcDir + '/**/*.less'], ['less']);
});

gulp.task('build', ['buildJs', 'buildCss']);