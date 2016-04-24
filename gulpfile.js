'use strict';

const gulp = require('gulp'),
  babel = require('gulp-babel'),
  sass = require('gulp-sass'),
  prefixer = require('gulp-autoprefixer');
  
const opts = {
  autoPrefixer: {
    browsers: ['last 2 versions'],
    cascade: false
  },
  babel: {
    presets: ['es2015']
  }
};

const paths = {
  sass: './public/src/styles/**/*.scss',
  scripts: './public/src/scripts/**/*.js'
};
  
gulp.task('sass:build', () => 
  gulp.src(paths.sass)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(prefixer(opts.autoPrefixer))
    .pipe(gulp.dest('./public/dist/styles'))
);

gulp.task('javascript:build', () =>
  gulp.src(paths.scripts)
    .pipe(babel(opts.babel))
    .pipe(gulp.dest('./public/dist/scripts'))
);

gulp.task('default', ['sass:build', 'javascript:build']);

gulp.task('watch', () => {
  gulp.watch(paths.sass, ['sass:build']);
  gulp.watch(paths.scripts, ['javascript:build']);
});