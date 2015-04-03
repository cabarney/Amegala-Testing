/// <binding ProjectOpened='watch' />

var gulp = require("gulp"),
    less = require("gulp-less"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    del = require("del"),
    fs = require("fs");

eval("var project = " + fs.readFileSync("./project.json"));

var paths = {
    bower: "./bower_components/",
    assets: "./Assets/",
    lib: "./" + project.webroot + "/lib/",
    css: "./" + project.webroot + "/css/"
};

gulp.task("default", ["copy", "bootstrap-js", "less"]);

gulp.task("clean", function (cb) {
    del([paths.lib, paths.css], cb);
});

gulp.task("copy", ["clean"], function () {
    var bower = {
        "jquery": "jquery/dist/jquery*.{js,map}",
    };

    for (var destinationDir in bower) {
        console.log(paths.bower + bower[destinationDir]);
        gulp.src(paths.bower + bower[destinationDir])
			.pipe(gulp.dest(paths.lib + destinationDir));
    }
});

gulp.task("less", function () {
    gulp.src([paths.assets + "less/bootstrap.less", paths.assets + "less/theme.less"])
    .pipe(less({ optimization: true, compress: false }))
    .on("error", swallowError)
    .pipe(gulp.dest(paths.css));
});

gulp.task("bootstrap-js", function () {
    var scripts = [
        'transition.js',
        'alert.js',
        'button.js',
        'carousel.js',
        'collapse.js',
        'dropdown.js',
        'modal.js',
        'tooltip.js',
        'popover.js',
        'scrollspy.js',
        'tab.js',
        'affix.js'
    ];
    gulp.src(scripts.map(function (s) { return paths.bower + "bootstrap/js/" + s; }))
    .pipe(concat("bootstrap.min.js"))
    .pipe(uglify({ outSourceMap: true }))
    .pipe(gulp.dest(paths.lib + "bootstrap"));
});

gulp.task("watch", ["less", "scripts"], function () {
    //gulp.watch(path + "less/*.less", ["less"]);
    //gulp.watch(path + "js/*.js", ["scripts"]);
});

//#region Helpers
function swallowError(error) {
    var msg = error.message.replace(process.cwd(), "");
    console.log(msg);
    this.emit('end');
}
//#endregion Helpers