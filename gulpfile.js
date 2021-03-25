const { 
  src, 
  dest, 
  watch, 
  parallel, 
  series,
  lastRun 
}                 = require('gulp'),
  sass            = require('gulp-sass'),
  babel           = require('gulp-babel'),
  sourcemaps      = require('gulp-sourcemaps'),
  browsersync     = require('browser-sync').create(),
  changed         = require('gulp-changed'),
  concat           = require('gulp-concat');
  // postCss         = require('gulp-postcss'),
  // autoprefixer    = require('gulp-autoprefixer');


const path = {
  html: 'src/*.html',
  css: 'src/css/*.+(css|scss)',
  cssLibrary: 'src/css/library/*.+(css|css.map)',
  js: 'src/js/*.js',
  jsLibrary: 'src/js/library/*',
  images: 'src/images/*',
  font: 'src/fonts/**/*'
}

function localServer(cb){
  browsersync.init({
    server: {
      baseDir: 'dist',
      index: "home.html"
    },
    port: 8080
  });
  cb();
}

function browserReload(cb){
  browsersync.reload();
  cb();
}

function handleHTML(){
  return src(path.html)
    .pipe(changed(path.html))
    .pipe(dest('dist'));
}

function handleStyle(){
  return src(path.css)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/css'));
}

function handleCssLibrary(){
  return src(path.cssLibrary, { since: lastRun(handleCssLibrary) })
    .pipe(concat('vendor.css'))
    .pipe(dest('dist/css'));
}

function handleImages(){
  return src(path.images, { since: lastRun(handleImages)})
    .pipe(changed(path.images))
    .pipe(dest('dist/images'))
}

function handleFont(){
  return src(path.font, { since: lastRun(handleFont)})
    .pipe(changed(path.font))
    .pipe(dest('dist/fonts'))
}

function handleJs(){
  return src(path.js)
    .pipe(sourcemaps.init())
    .pipe(babel({
      'presets': ['@babel/preset-env']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/js'))
}
function handleJsLibrary(){
  return src(path.jsLibrary, { since: lastRun(handleJsLibrary) })
    .pipe(concat('vendor.js'))
    .pipe(dest('dist/js'));
}

function watchFiles(){
  watch(
    [path.html, path.css, path.js], 
    series(parallel(handleHTML, handleStyle, handleJs,), browserReload)
  );
  watch([path.cssLibrary, path.jsLibrary], series(parallel(handleCssLibrary, handleJsLibrary), browserReload));
  watch([path.images], series(handleImages, browserReload));
  watch([path.font], series(handleFont, browserReload));
}

exports.serve = series(
  handleImages,
  handleFont,
  handleHTML,
  handleStyle,
  handleCssLibrary,
  handleJsLibrary,
  handleJs,
  localServer,
  watchFiles
);

function build(cb){
  cb();
}

exports.build = build;