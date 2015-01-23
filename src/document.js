/**
 * @fileoverview glam document class
 * 
 * @author Tony Parisi
 */

glam.DOM.document = {
		
	scenes : {},
	
	styles : [],

	animations : {},
	
	addScene : function(script, scene)
	{
		glam.DOM.document.scenes[script.id] = { parentElement : script.parentElement, scene : scene };
	},

	addStyle : function(declaration)
	{
		glam.DOM.document.styles.push(declaration);
	},
	
	addAnimation : function(id, animation)
	{
		glam.DOM.document.animations[id] = animation;
	},

	parseDocument : function()
	{
		var dp = new DOMParser;

		var i, len;
		
		var scripts = document.getElementsByTagName("script");
		var len = scripts.length;
		for (i = 0; i < len; i++)
		{
			if (scripts[i].type == "text/glam")
			{
				var scene = dp.parseFromString(scripts[i].textContent, "text/xml");
				glam.DOM.document.addScene(scripts[i], scene);
			}
		}
		
		var styles = document.head.getElementsByTagName("style");
		var len = styles.length;
		for (i = 0; i < len; i++)
		{
			{
				$.parsecss(styles[i].childNodes[0].data,
						function(css) {
								glam.DOM.document.addStyle(css);
							}
						);
			}
		}
	},
};
