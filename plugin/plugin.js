const	path = require("path");

var	db,
	prefs,
	server;

exports.init = function(miaou){
	db = miaou.db;
	prefs = miaou.lib("prefs");
	server = miaou.lib("server");
}

exports.registerRoutes = map=>{
	var	views = path.resolve(__dirname, "views");
	console.log('views:', views);
	map("get", "/sample-view", function(req, res, next){
		db.on()
		.then(function(){
			return prefs.get.call(this, req.user.id);
		})
		.then(function(userPrefs){
			var	isMobile = server.mobile(req),
				theme = prefs.theme(userPrefs, req.query.theme, isMobile);
			res.render(path.resolve(views, 'sample.pug'), {theme});
		})
		.finally(db.off);
	});
};
