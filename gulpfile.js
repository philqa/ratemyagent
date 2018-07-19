'use strict';

var paths = {
    src: 'src',
    base: 'base',
    dist: 'dist',
    tmp: 'build',
    uiTests: 'tests/ui',
    uiTestsOutput: 'build/tests/ui',
    serve: 'build/serve',
    typings: './typings/index.d.ts'
};
var path = require('path');
var gulp = require('gulp');
var argv = require('yargs').argv;

var protractor = require('gulp-protractor');
var ts = require('gulp-typescript');

// Downloads the selenium webdriver
gulp.task('webdriver-update', protractor.webdriver_update);

var tsProject = ts.createProject('./tsconfig.json');

gulp.task('compile', function() {
    gulp.src([paths.typings, path.join(paths.uiTests, '/**/*.ts')])
        .pipe(tsProject())
        .pipe(gulp.dest(paths.uiTestsOutput));
});

gulp.task('webdriver-standalone', protractor.webdriver_standalone);

function runProtractor(done) {
    gulp.src([paths.typings, path.join(paths.uiTests, '/**/*.ts')])
        .pipe(tsProject())
        .pipe(gulp.dest(paths.uiTestsOutput)) //protractor needs files on disk, cannot get them from stream
        .pipe(protractor.protractor({
            configFile: 'protractor.conf.'+argv.env+'.js',
        }))
        .on('error', function (err) {
            // exit gulp if tests failed
            throw err;
        })
        .on('end', function () {
            done();
        });
}

gulp.task('protractor', ['protractor:src']);
gulp.task('protractor:src', ['webdriver-update'], runProtractor);
gulp.task('protractor:dist', ['webdriver-update'], runProtractor);
