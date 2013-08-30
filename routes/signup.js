/*
 * POST home page.
 */

exports.user = function(req, res){
	res.end(JSON.stringify(req.body));
};