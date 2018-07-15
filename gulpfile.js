const gulp = require('gulp');
const connect = require('gulp-connect');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const order = require('gulp-order');

const pathTo = {
  root: './',
  dist: './dist',
  html: './src/index.html',
  css: './src/*.css',
  js: './src/*.js'
}

gulp.task('serve', () => {
  connect.server({
    port: 3000,
    root: pathTo.root,
    livereload: true
  });
});

gulp.task('html', () =>
  gulp.src(pathTo.html)
    .pipe(gulp.dest(pathTo.root))
    .pipe(connect.reload())
);

gulp.task('css', () =>
  gulp.src(pathTo.css)
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(pathTo.dist))
    .pipe(connect.reload())
);

gulp.task('js', () => 
  gulp.src(pathTo.js)
    .pipe(order([
      'src/constants.js',
      'src/view.js',
      'src/snake.js',
      'src/index.js'
    ]))
    .pipe(concat('app.js'))
    .pipe(gulp.dest(pathTo.dist))
    .pipe(connect.reload())
);

gulp.task('watch', () => {
  gulp.watch(pathTo.html, ['html'])
  gulp.watch(pathTo.js, ['js']);
  gulp.watch(pathTo.css, ['css']);
});

gulp.task('clean', () =>
  gulp.src(pathTo.dist, {read: false})
    .pipe(clean())
);

gulp.task('default', ['serve', 'watch']);
gulp.task('build', ['html', 'css', 'js']);
