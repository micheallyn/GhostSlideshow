var app = require('ghost-app'),
    hbs = require('express-hbs'),
    Promise = require('bluebird'),
    _   = require('lodash'),
    path = require("path"),
    appRoot = path.resolve(__dirname, '../../../'),
    errors = require(path.join(appRoot,'core/server/errors')),
    config,
    api,    
    slideTemplate = _.template('<li><div class="<%= itemClass%>"><%= caption %><img src="<%= src %>" alt="<%= alt %>" /></div></li> '),
    controlTemplate = _.template('<ul class="controls"><li class="prev"><span>Prev</span></li><li class="pause"><span>Pause</span></li><li class="next"><span>Next</span></li></ul>'),
    paginationTemplate = _.template('<ul class="pagination"><%=items%></ul>'),
    paginationItemTemplate = _.template('<li><%= index %></li>'),
    slideshowTemplate = _.template('<div class="<%= classes %>"><%= control %><ul class="sequence-canvas"><%= html %></ul><%= pagination %></div>');

slideshow = app.extend({
    install: function () {},
    uninstall: function () {},
    activate: function () {
        api = this.ghost.api;
        
        this.ghost.filters.register('ghost_head', function (html) {
          return _.union(html, ['<link rel="stylesheet" type="text/css" href="/assets/slideshow/css/slideshow.css" />']);
        });
        
        this.ghost.filters.register('ghost_foot', function (html) {
          return _.union(html, ['<script type="text/javascript" src="/assets/slideshow/js/jquery.sequence-min.js"></script>','<script type="text/javascript" src="/assets/slideshow/js/slideshow-options.js"></script>']);
        });

    },
    deactivate: function () {}
});

// Get image from specified page post
slideshow.getImages = function (slug) {
    return api.posts.read({'slug':slug}).then(function (result) {
        if (result && _.isArray(result.posts) && result.posts.length > 0){
            var post = result.posts[0];
            if (post) {
                // /!\[[^\]]+\]\(([^\)]+)\)/g
                var foundImage = post.markdown.match(/!\[.*?\]\(([^\)]+)\)/g);
                
                if (foundImage && _.isArray(foundImage) && foundImage.length > 0) {
                    var images = _.map(foundImage, function (img) {
                        return {
                            src: img.replace(/!\[.*?\]\(/g, "").replace(/\)/g, ""),
                            alt: img.replace(/!\[/g, "").replace(/\]\(([^\)]+)\)/g, "")
                        };
                    });
                    return images;
                }
            }
        }
        return false;
    }).catch(function(err) {
        return false;
    });
}

// Generate slideshow html
slideshow.getSlideshow = function (options) {
    options = options || {};
    options.hash = options.hash || {};
    var slug = options.hash && options.hash.slug ? options.hash.slug : '';
    var showDesc = options.hash && options.hash.showDesc ? options.hash.showDesc : '1';
    var showControl = options.hash && options.hash.showControl ? options.hash.showControl : '1';
    var showPagination = options.hash && options.hash.showPagination ? options.hash.showPagination : '1';
    var classes = options.hash && options.hash.classes ? options.hash.classes : '';
    
    if (_.isEmpty(slug)) return new hbs.handlebars.SafeString("Notice: No post specified!");
    
    return slideshow.getImages(slug).then(function(images){
        if (_.isArray(images) && images.length > 0){
            var count = 0, pagination = [];
            var htmli = _.map(images, function (image) {
                count = count + 1;
                pagination.push(paginationItemTemplate({index: count}));
                
                return slideTemplate({
                    itemClass: 'slide',
                    src: image.src,
                    alt: _.escape(image.alt),
                    caption: showDesc != '1' || _.isEmpty(image.alt) ? '' : '<div class="info">' + _.escape(image.alt) + '</div>'
                });
            }).join("");
            
            return new hbs.handlebars.SafeString(
                slideshowTemplate({
                    classes: 'w3-slideshow ' + classes,
                    control: showControl == '1' ? controlTemplate() : '',
                    pagination: showPagination == '1' ? paginationTemplate({items: pagination.join("")}) : '',
                    html: htmli
                })
            );
        }
        else return new hbs.handlebars.SafeString("Notice: No post with slug = \"" + slug + "\" found! Or no image in specified post with slug = \"" + slug + "\"!");
    }).catch(function(err) {
        return new hbs.handlebars.SafeString("Notice: Undefined error!");
    });
}

// Register an async handlebars helper
function registerAsyncHelper(hbs, name, fn) {
    hbs.registerAsyncHelper(name, function (options, cb) {
        Promise.resolve(fn.call(this, options)).then(function (result) {
            cb(result);
        }).catch(function (err) {
            errors.logAndThrowError(err, 'registerAsyncThemeHelper: ' + name);
        });
    });
}

// Register an async handlebars helper for themes
function registerAsyncThemeHelper(name, fn) {
    registerAsyncHelper(hbs, name, fn);
}

// Register helper {{slideshow}}
registerAsyncThemeHelper('slideshow', slideshow.getSlideshow);

// Export to use
module.exports = slideshow;
module.exports.registerAsyncThemeHelper = registerAsyncThemeHelper;