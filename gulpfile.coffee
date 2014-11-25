gulp = require('gulp')
coffee = require('gulp-coffee')
changed = require('gulp-changed')
gutil = require('gulp-util')

SOURCE = './src/**/*.coffee'
DESTINATION = './lib/'

gulp.task 'coffee', ->
  gulp.src(SOURCE)
    .pipe(changed(DESTINATION))
    .pipe(coffee(bare: true)
      .on('error', gutil.log))
    .pipe(gulp.dest(DESTINATION))

gulp.task 'watch', ->
  gulp.watch(SOURCE, ['coffee'])

gulp.task('default', ['coffee'])