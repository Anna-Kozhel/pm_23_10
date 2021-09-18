function simpleTask()
{
    console.log('This is a test task!');
}
exports.default = simpleTask

const { scr, dest, watch, series, src } = require("gulp");
const concat = require("gulp-concat");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");

function task_html()
{
    return scr ("app/*.html")
    .pipe (dest("dist"));
}
exports.html = task_html

function task_sass()
{
    return src ("app/sass/*.sass")
    .pipe(concat('styles.sass'))
    .pipe(sass())
    .pipe(autoprefixer({
        browsers:['last 2 version'],
        cascade:false
    }))
    .pipe(cssnano())
    .pipe(rename({suffix:'.min'}))
    .pipe(dest("dist/css"));
}
exports.sass = task_sass

function task_scripts()
{
    return src("app/js/*.js")
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(dest(dist/js));
}
exports.scripts = task_scripts

function task_imgs()
{
    return src("app/img/*.+(jpg|jpeg|png|gif)")
    .pipe(imagemin({
        progressive:true,
        svgoPlugins:[{removeViewBox:false}],
        interlaced:true
    }))
    .pipe(dest("dist/images"));
}
exports.imgs = task_imgs

function task_watch()
{
    watch("app/*.html",task_html);
    watch("app/js/*.js",task_scripts);
    watch("app/sass/*.sass",task_sass);
    watch("app/img/*.+(jpg|jpeg|png|gif)",task_imgs);
}
exports.watch = task_watch
exports.dist = series(task_html, task_sass, task_scripts, task_imgs, task_watch)