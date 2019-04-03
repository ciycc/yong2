function swallowError(error) {
	console.log(error.toString());
	this.emit('END');
}
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	compass = require('gulp-compass'),
	uglify = require('gulp-uglify'),
	removeEmptyLines = require('gulp-remove-empty-lines'),
	cleanCss = require('gulp-clean-css'),
	livereload = require('gulp-livereload');

gulp.task('complie-sass',function(){
	return  gulp.src('./src/sass/*.scss',{since:gulp.lastRun('complie-sass')})
			//.pipe(sass({outputStyle:'compressed',precision:6,sourceComents:true}))
			.pipe(sass({outputStyle:'compact',precision:6,sourceComents:false,indentType:'tab',indentWidth:1}))
			.pipe(removeEmptyLines())
			//.pipe(sass({compass:true}))
			.on('error', swallowError)
			.pipe(gulp.dest('../resource/css'));
});
gulp.task('world', function(){
	return console.log('My World');
});
gulp.task('watch', function(){
	//livereload.listen();
	//gulp.watch('./src/sass/*.scss',['complie-sass']);
	gulp.watch('./src/sass/*.scss',gulp.series('complie-sass'));
});
gulp.task('default',gulp.series('complie-sass', 'watch'));